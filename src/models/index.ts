import Tienda from "./Tienda.js";
import Categoria from "./Categoria.js";
import Producto from "./Producto.js";
import ProductoCategoria from "./ProductoCategoria.js";
import ProductoStock from "./ProductoStock.js";
import Promocion from "./Promocion.js";
import TiendaPromocion from "./TiendaPromocion.js";
import Pedido from "./Pedido.js";
import PedidoProducto from "./PedidoProducto.js";

// ============ ASOCIACIONES ============

// Tienda -> Promociones (many-to-many through TiendaPromocion)
Tienda.belongsToMany(Promocion, {
  through: TiendaPromocion,
  foreignKey: "tienda",
  otherKey: "id_promocion",
  as: "promociones",
});

Promocion.belongsToMany(Tienda, {
  through: TiendaPromocion,
  foreignKey: "id_promocion",
  otherKey: "tienda",
  as: "tiendas",
});

// Tienda -> Pedidos
Tienda.hasMany(Pedido, {
  foreignKey: "id_tienda",
  as: "pedidos",
});

Pedido.belongsTo(Tienda, {
  foreignKey: "id_tienda",
  as: "tienda",
});

// Tienda -> ProductoStock
Tienda.hasMany(ProductoStock, {
  foreignKey: "id_tienda",
  as: "stocks",
});

ProductoStock.belongsTo(Tienda, {
  foreignKey: "id_tienda",
  as: "tienda",
});

// Producto -> Categorias (many-to-many through ProductoCategoria)
Producto.belongsToMany(Categoria, {
  through: ProductoCategoria,
  foreignKey: "id_producto",
  otherKey: "id_categoria",
  as: "categorias",
});

Categoria.belongsToMany(Producto, {
  through: ProductoCategoria,
  foreignKey: "id_categoria",
  otherKey: "id_producto",
  as: "productos",
});

// Producto -> ProductoStock
Producto.hasMany(ProductoStock, {
  foreignKey: "id_producto",
  as: "stocks",
});

ProductoStock.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});

// Producto -> PedidoProducto
Producto.hasMany(PedidoProducto, {
  foreignKey: "id_producto",
  as: "pedidos_productos",
});

PedidoProducto.belongsTo(Producto, {
  foreignKey: "id_producto",
  as: "producto",
});

// Pedido -> PedidoProducto
Pedido.hasMany(PedidoProducto, {
  foreignKey: "id_pedido",
  as: "productos",
});

PedidoProducto.belongsTo(Pedido, {
  foreignKey: "id_pedido",
  as: "pedido",
});

// Promocion -> PedidoProducto
Promocion.hasMany(PedidoProducto, {
  foreignKey: "id_promocion",
  as: "pedidos_productos",
});

PedidoProducto.belongsTo(Promocion, {
  foreignKey: "id_promocion",
  as: "promocion",
});

export {
  Tienda,
  Categoria,
  Producto,
  ProductoCategoria,
  ProductoStock,
  Promocion,
  TiendaPromocion,
  Pedido,
  PedidoProducto,
};

export default {
  Tienda,
  Categoria,
  Producto,
  ProductoCategoria,
  ProductoStock,
  Promocion,
  TiendaPromocion,
  Pedido,
  PedidoProducto,
};
