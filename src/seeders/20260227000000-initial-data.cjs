'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert tiendas (stores)
    await queryInterface.bulkInsert('tiendas', [
      {
        id: 1,
        estado: 1,
        nombre: 'Market Centro',
        descripcion: 'Tienda principal del centro',
        telefono: '3001234567',
        direccion: 'Calle 10 #5-20',
        direccion_anexo: 'Local 1',
        direccion_barrio: 'Centro',
        calificacion: 4.5,
        calificacion_cantidad: 120,
        impuestos: 1,
        dias_trabajados: '1111100'
      },
      {
        id: 2,
        estado: 1,
        nombre: 'Market Norte',
        descripcion: 'Sucursal zona norte',
        telefono: '3009876543',
        direccion: 'Carrera 15 #100-50',
        direccion_anexo: 'Local 3',
        direccion_barrio: 'Norte',
        calificacion: 4.2,
        calificacion_cantidad: 80,
        impuestos: 1,
        dias_trabajados: '1111110'
      },
      {
        id: 3,
        estado: 1,
        nombre: 'Market Sur',
        descripcion: 'Sucursal zona sur',
        telefono: '3014567890',
        direccion: 'Avenida 30 #20-15',
        direccion_anexo: 'Local 2',
        direccion_barrio: 'Sur',
        calificacion: 4.0,
        calificacion_cantidad: 60,
        impuestos: 1,
        dias_trabajados: '1111100'
      }
    ], {});

    // Insert productos (products)
    await queryInterface.bulkInsert('productos', [
      {
        id: 1,
        estado: 1,
        kit: 0,
        barcode: '7701001001',
        nombre: 'Arroz 1kg',
        presentacion: 'Bolsa',
        descripcion: 'Arroz blanco premium',
        foto: 'arroz.jpg',
        peso: 1.00
      },
      {
        id: 2,
        estado: 1,
        kit: 0,
        barcode: '7701001002',
        nombre: 'Leche 1L',
        presentacion: 'Caja',
        descripcion: 'Leche entera',
        foto: 'leche.jpg',
        peso: 1.00
      },
      {
        id: 3,
        estado: 1,
        kit: 0,
        barcode: '7701001003',
        nombre: 'Aceite 900ml',
        presentacion: 'Botella',
        descripcion: 'Aceite vegetal',
        foto: 'aceite.jpg',
        peso: 0.90
      },
      {
        id: 4,
        estado: 1,
        kit: 0,
        barcode: '7701001004',
        nombre: 'Pan Tajado',
        presentacion: 'Paquete',
        descripcion: 'Pan integral',
        foto: 'pan.jpg',
        peso: 0.50
      },
      {
        id: 5,
        estado: 1,
        kit: 0,
        barcode: '7701001005',
        nombre: 'Huevos x12',
        presentacion: 'Cubeta',
        descripcion: 'Huevos AA',
        foto: 'huevos.jpg',
        peso: 0.70
      }
    ], {});

    // Insert categorias (categories)
    await queryInterface.bulkInsert('categorias', [
      {
        id: 1,
        nombre: 'Granos',
        adultos: 0
      },
      {
        id: 2,
        nombre: 'Lácteos',
        adultos: 0
      },
      {
        id: 3,
        nombre: 'Panadería',
        adultos: 0
      },
      {
        id: 4,
        nombre: 'Abarrotes',
        adultos: 0
      }
    ], {});

    // Insert productos_categorias (product-category relationships)
    await queryInterface.bulkInsert('productos_categorias', [
      {
        id: 1,
        id_categoria: 1,
        id_producto: 1
      },
      {
        id: 2,
        id_categoria: 2,
        id_producto: 2
      },
      {
        id: 3,
        id_categoria: 4,
        id_producto: 3
      },
      {
        id: 4,
        id_categoria: 3,
        id_producto: 4
      },
      {
        id: 5,
        id_categoria: 4,
        id_producto: 5
      }
    ], {});

    // Insert productos_stocks (product stock in stores)
    await queryInterface.bulkInsert('productos_stocks', [
      {
        id: 1,
        cantidad: 100,
        id_tienda: 1,
        id_producto: 1,
        fecha_ingreso: new Date()
      },
      {
        id: 2,
        cantidad: 50,
        id_tienda: 1,
        id_producto: 2,
        fecha_ingreso: new Date()
      },
      {
        id: 3,
        cantidad: 80,
        id_tienda: 2,
        id_producto: 1,
        fecha_ingreso: new Date()
      },
      {
        id: 4,
        cantidad: 60,
        id_tienda: 2,
        id_producto: 3,
        fecha_ingreso: new Date()
      },
      {
        id: 5,
        cantidad: 40,
        id_tienda: 3,
        id_producto: 4,
        fecha_ingreso: new Date()
      },
      {
        id: 6,
        cantidad: 30,
        id_tienda: 3,
        id_producto: 5,
        fecha_ingreso: new Date()
      }
    ], {});

    // Insert promociones (promotions)
    await queryInterface.bulkInsert('promociones', [
      {
        id: 1,
        estado: 1,
        nombre: 'Promo Arroz 10%',
        imagen: 'promo1.jpg',
        porcentaje: 10,
        dias_semana: '{1,1,1,1,1,0,0}'
      },
      {
        id: 2,
        estado: 1,
        nombre: 'Promo Fin de Semana',
        imagen: 'promo2.jpg',
        porcentaje: 15,
        dias_semana: '{0,0,0,0,0,1,1}'
      }
    ], {});

    // Insert tiendas_promociones (store-promotion relationships)
    await queryInterface.bulkInsert('tiendas_promociones', [
      {
        id: 1,
        estado: 1,
        inicio: new Date(new Date().setDate(new Date().getDate() - 5)),
        fin: new Date(new Date().setDate(new Date().getDate() + 5)),
        id_tienda: 1,
        id_promocion: 1
      },
      {
        id: 2,
        estado: 1,
        inicio: new Date(new Date().setDate(new Date().getDate() - 2)),
        fin: new Date(new Date().setDate(new Date().getDate() + 2)),
        id_tienda: 2,
        id_promocion: 2
      }
    ], {});

    // Insert pedidos (orders)
    await queryInterface.bulkInsert('pedidos', [
      {
        id: 1,
        instrucciones: 'Entregar en portería',
        entrega_fecha: new Date(),
        valor_productos: 50000,
        valor_envio: 5000,
        valor_descuento: 0,
        valor_cupon: 0,
        impuestos: 1,
        valor_impuestos: 9500,
        valor_final: 64500,
        calificacion: 5,
        id_tienda: 1,
        direccion: 'Calle 1 #2-3',
        valor_comision: 2000,
        id_usuario: 1
      },
      {
        id: 2,
        instrucciones: 'Sin instrucciones',
        entrega_fecha: new Date(),
        valor_productos: 30000,
        valor_envio: 5000,
        valor_descuento: 0,
        valor_cupon: 0,
        impuestos: 1,
        valor_impuestos: 5700,
        valor_final: 40700,
        calificacion: 4,
        id_tienda: 2,
        direccion: 'Carrera 10 #20-30',
        valor_comision: 1500,
        id_usuario: 2
      }
    ], {});

    // Insert pedidos_productos (order products)
    await queryInterface.bulkInsert('pedidos_productos', [
      {
        id: 1,
        cantidad: 5,
        valor_unitario: 5000,
        valor_unitario_promocion: 4500,
        total_teorico: 25000,
        total_final: 22500,
        id_promocion: null,
        id_producto: 1,
        id_pedido: 1
      },
      {
        id: 2,
        cantidad: 3,
        valor_unitario: 3000,
        valor_unitario_promocion: 3000,
        total_teorico: 9000,
        total_final: 9000,
        id_promocion: null,
        id_producto: 2,
        id_pedido: 1
      },
      {
        id: 3,
        cantidad: 2,
        valor_unitario: 7000,
        valor_unitario_promocion: 6500,
        total_teorico: 14000,
        total_final: 13000,
        id_promocion: null,
        id_producto: 3,
        id_pedido: 2
      },
      {
        id: 4,
        cantidad: 6,
        valor_unitario: 5000,
        valor_unitario_promocion: 4500,
        total_teorico: 30000,
        total_final: 27000,
        id_promocion: null,
        id_producto: 1,
        id_pedido: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove data in reverse order to respect foreign key constraints
    await queryInterface.bulkDelete('pedidos_productos', {}, {});
    await queryInterface.bulkDelete('pedidos', {}, {});
    await queryInterface.bulkDelete('tiendas_promociones', {}, {});
    await queryInterface.bulkDelete('promociones', {}, {});
    await queryInterface.bulkDelete('productos_stocks', {}, {});
    await queryInterface.bulkDelete('productos_categorias', {}, {});
    await queryInterface.bulkDelete('categorias', {}, {});
    await queryInterface.bulkDelete('productos', {}, {});
    await queryInterface.bulkDelete('tiendas', {}, {});
  }
};
