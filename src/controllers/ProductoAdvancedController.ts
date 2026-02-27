import { Request, Response } from "express";
import sequelize from "../config/database.js";
import Producto from "../models/Producto.js";
import ProductoStock from "../models/ProductoStock.js";
import Tienda from "../models/Tienda.js";
import PedidoProducto from "../models/PedidoProducto.js";
import Categoria from "../models/Categoria.js";
import Promocion from "../models/Promocion.js";
import TiendaPromocion from "../models/TiendaPromocion.js";
import { QueryTypes } from "sequelize";

export const getProductosConStock = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll({
      attributes: ["id", "nombre", "presentacion"],
      include: [
        {
          model: ProductoStock,
          as: "stocks",
          attributes: ["cantidad", "id_tienda"],
          include: [
            {
              model: Tienda,
              as: "tienda",
              attributes: ["id", "nombre"],
            },
          ],
        },
      ],
    });

    // Filtrar productos que tienen stock en al menos una tienda
    const productosConStock = productos.filter((producto) => {
      const productoData: any = producto.get({ plain: true });
      return productoData.stocks && productoData.stocks.length > 0;
    });

    // Fomatear respuesta según requisitos
    const data = productosConStock.map((producto) => {
      const productoData: any = producto.get({ plain: true });
      return {
        idProducto: productoData.id,
        nombre: productoData.nombre,
        presentacion: productoData.presentacion,
        tiendas: productoData.stocks.map((stock: any) => ({
          idTienda: stock.tienda.id,
          nombre: stock.tienda.nombre,
          stock: parseFloat(stock.cantidad),
        })),
      };
    });

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching productos con stock",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getProductosMasVendidos = async (req: Request, res: Response) => {
  try {
    const topVendidos = await sequelize.query(
      `SELECT 
        p.id,
        p.nombre,
        p.presentacion,
        SUM(CAST(pp.cantidad AS NUMERIC)) as cantidad_vendida
      FROM productos p
      JOIN pedidos_productos pp ON p.id = pp.id_producto
      GROUP BY p.id, p.nombre, p.presentacion
      ORDER BY cantidad_vendida DESC
      LIMIT 10`,
      {
        type: QueryTypes.SELECT,
      },
    );

    const data = topVendidos.map((producto: any) => ({
      idProducto: producto.id,
      nombre: producto.nombre,
      presentacion: producto.presentacion,
      unidadesVendidas: parseFloat(producto.cantidad_vendida),
    }));

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching top vendidos",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getCategoriasConProductos = async (
  req: Request,
  res: Response,
) => {
  try {
    const categoriasConProductos = await sequelize.query(
      `SELECT 
        c.id,
        c.nombre,
        COUNT(pc.id_producto) as cantidad_productos
      FROM categorias c
      LEFT JOIN productos_categorias pc ON c.id = pc.id_categoria
      GROUP BY c.id, c.nombre
      HAVING COUNT(pc.id_producto) > 0
      ORDER BY cantidad_productos DESC`,
      {
        type: QueryTypes.SELECT,
      },
    );

    const data = categoriasConProductos.map((categoria: any) => ({
      idCategoria: categoria.id,
      nombre: categoria.nombre,
      cantProductos: parseInt(categoria.cantidad_productos),
    }));

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching categorias con productos",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getPromocionesPorDia = async (req: Request, res: Response) => {
  try {
    const { dia } = req.query;

    if (!dia || isNaN(Number(dia))) {
      res.status(400).json({
        status: "error",
        message:
          "Day parameter is required and must be a number (1-7 for Monday-Sunday)",
      });
      return;
    }

    // Convertir el día a un índice (1=Monday, 2=Tuesday, ..., 7=Sunday)
    const dayIndex = Number(dia);

    if (dayIndex < 1 || dayIndex > 7) {
      res.status(400).json({
        status: "error",
        message: "Day must be between 1-7 (1=Monday, 2=Tuesday, ..., 7=Sunday)",
      });
      return;
    }

    const promociones = await Promocion.findAll({
      attributes: ["id", "nombre", "porcentaje", "dias_semana"],
    });

    const promocionesDelDia = promociones.filter((promo) => {
      const promoData: any = promo.get({ plain: true });
      const dias = promoData.dias_semana;

      console.log(
        `Promoción ${promoData.nombre} aplica en días: ${dias} - Buscando día índice: ${dayIndex}`,
      );
      console.log(typeof dias, Array.isArray(dias));

      const diasArray = dias.split(",").map((d: string) => parseInt(d.trim()));
      console.log(`Días como array: ${diasArray}`);

      // El array de días se interpreta como: [Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo]
      // dayIndex 1=Monday (position 0), 2=Tuesday (position 1), ..., 7=Sunday (position 6)
      const posicionEnArray = dayIndex - 1;

      const aplicaEnDia =
        Array.isArray(diasArray) && diasArray[posicionEnArray] === 1;

      return aplicaEnDia;
    });

    // Para cada promoción del día, obtener las tiendas donde está activa
    const ahora = new Date();
    const promocionesConTiendas = await Promise.all(
      promocionesDelDia.map(async (promo) => {
        const promoData: any = promo.get({ plain: true });
        const tiendaPromociones = await TiendaPromocion.findAll({
          where: {
            id_promocion: promoData.id,
          },
          attributes: ["id", "id_tienda", "inicio", "fin", "estado"],
        });

        // Filtrar tiendas donde la promoción está activa (estado=1) y dentro del rango de fechas
        const tiendasActivas = await Promise.all(
          tiendaPromociones
            .filter((tp) => {
              const tpData: any = tp.get({ plain: true });
              const inicio = new Date(tpData.inicio);
              const fin = new Date(tpData.fin);
              return inicio <= ahora && ahora <= fin;
            })
            .map(async (tp) => {
              const tpData: any = tp.get({ plain: true });
              const tiendaInfo = await Tienda.findByPk(tpData.id_tienda, {
                attributes: ["id", "nombre"],
              });
              return tiendaInfo
                ? (tiendaInfo.get({ plain: true }) as any).nombre
                : null;
            }),
        );

        // Filtrar nombres de tiendas no nulos
        const nombresTiendas = tiendasActivas.filter(
          (nombre) => nombre !== null,
        ) as string[];

        return {
          idPromocion: promoData.id,
          nombre: promoData.nombre,
          tiendas: nombresTiendas,
        };
      }),
    );

    res.json({
      status: "success",
      data: promocionesConTiendas,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching promociones por día",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
