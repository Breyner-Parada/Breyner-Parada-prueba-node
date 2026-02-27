-- Script para crear las tablas necesarias para el funcionamiento del sistema de tiendas, productos, promociones y pedidos

-- tabla de tiendas para almacenar la información de cada tienda disponible en el sistema
CREATE TABLE IF NOT EXISTS tiendas (
  id SMALLSERIAL PRIMARY KEY,
  estado SMALLINT NOT NULL DEFAULT 1,
  nombre VARCHAR(30) NOT NULL,
  descripcion VARCHAR(500),
  telefono VARCHAR(20),
  direccion VARCHAR(120) NOT NULL,
  direccion_anexo VARCHAR(40),
  direccion_barrio VARCHAR(25),
  calificacion DECIMAL(3, 2) DEFAULT 0,
  calificacion_cantidad INTEGER DEFAULT 0,
  impuestos SMALLINT NOT NULL,
  dias_trabajados VARCHAR(21),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabla de categorías para almacenar las diferentes categorías de productos disponibles en el sistema
CREATE TABLE IF NOT EXISTS categorias (
  id SMALLSERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  adultos SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabla de productos para almacenar la información de cada producto disponible en el sistema
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  estado SMALLINT NOT NULL DEFAULT 1,
  kit SMALLINT DEFAULT 0,
  barcode VARCHAR(30),
  nombre VARCHAR(60) NOT NULL,
  presentacion VARCHAR(25),
  descripcion VARCHAR(500),
  foto VARCHAR(120),
  peso DECIMAL(6, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabla de productos_categorias para almacenar la relación entre productos y categorías
CREATE TABLE IF NOT EXISTS productos_categorias (
  id SERIAL PRIMARY KEY,
  id_categoria SMALLINT NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  id_producto INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(id_categoria, id_producto)
);

-- tabla de productos_stocks para almacenar la cantidad disponible de cada producto en cada tienda
CREATE TABLE IF NOT EXISTS productos_stocks (
  id SERIAL PRIMARY KEY,
  cantidad DECIMAL(8, 3) NOT NULL,
  id_tienda SMALLINT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  id_producto INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(id_tienda, id_producto)
);

-- tabla de promociones para almacenar la información de cada promoción disponible en el sistema
CREATE TABLE IF NOT EXISTS promociones (
  id SERIAL PRIMARY KEY,
  estado SMALLINT NOT NULL DEFAULT 1,
  nombre VARCHAR(40) NOT NULL,
  imagen VARCHAR(120),
  porcentaje SMALLINT NOT NULL,
  dias_semana VARCHAR(21),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabla de tiendas_promociones para almacenar las promociones asociadas a cada tienda
CREATE TABLE IF NOT EXISTS tiendas_promociones (
  id SERIAL PRIMARY KEY,
  estado SMALLINT NOT NULL DEFAULT 1,
  inicio TIMESTAMP NOT NULL,
  fin TIMESTAMP NOT NULL,
  tienda SMALLINT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  id_promocion INTEGER NOT NULL REFERENCES promociones(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tienda, id_promocion)
);

-- tabla de pedidos para almacenar la información de cada pedido realizado por los usuarios
CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  instrucciones VARCHAR(500),
  entrega_fecha TIMESTAMP,
  valor_productos DECIMAL(12, 3) NOT NULL,
  valor_envio DECIMAL(10, 3) DEFAULT 0,
  valor_descuento DECIMAL(12, 3) DEFAULT 0,
  valor_cupon DECIMAL(11, 3) DEFAULT 0,
  impuestos SMALLINT,
  valor_impuestos DECIMAL(11, 3) DEFAULT 0,
  valor_final DECIMAL(12, 3) NOT NULL,
  calificacion DECIMAL(3, 2),
  id_tienda SMALLINT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  direccion VARCHAR(160) NOT NULL,
  valor_comision DECIMAL(11, 3),
  id_usuario INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos_productos para almacenar los productos asociados a cada pedido
CREATE TABLE IF NOT EXISTS pedidos_productos (
  id SERIAL PRIMARY KEY,
  cantidad DECIMAL(9, 3) NOT NULL,
  valor_unitario DECIMAL(11, 3) NOT NULL,
  valor_unitario_promocion DECIMAL(11, 3),
  total_teorico DECIMAL(12, 3) NOT NULL,
  total_final DECIMAL(12, 3) NOT NULL,
  id_promocion INTEGER REFERENCES promociones(id) ON DELETE SET NULL,
  id_producto INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  id_pedido INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tiendas_estado ON tiendas(estado);
CREATE INDEX IF NOT EXISTS idx_productos_estado ON productos(estado);
CREATE INDEX IF NOT EXISTS idx_productos_stocks_tienda ON productos_stocks(id_tienda);
CREATE INDEX IF NOT EXISTS idx_productos_stocks_producto ON productos_stocks(id_producto);
CREATE INDEX IF NOT EXISTS idx_pedidos_tienda ON pedidos(id_tienda);
CREATE INDEX IF NOT EXISTS idx_pedidos_usuario ON pedidos(id_usuario);
CREATE INDEX IF NOT EXISTS idx_pedidos_productos_pedido ON pedidos_productos(id_pedido);
CREATE INDEX IF NOT EXISTS idx_pedidos_productos_producto ON pedidos_productos(id_producto);
CREATE INDEX IF NOT EXISTS idx_tiendas_promociones_tienda ON tiendas_promociones(tienda);
CREATE INDEX IF NOT EXISTS idx_productos_categorias_producto ON productos_categorias(id_producto);
CREATE INDEX IF NOT EXISTS idx_productos_categorias_categoria ON productos_categorias(id_categoria);

-- Popular la base de datos con datos de ejemplo para tiendas

INSERT INTO tiendas
    (id, estado, nombre, descripcion, telefono, direccion, direccion_anexo, direccion_barrio, calificacion, calificacion_cantidad, impuestos, dias_trabajados)
VALUES
    (1, 1, 'Market Centro', 'Tienda principal del centro', '3001234567', 'Calle 10 #5-20', 'Local 1', 'Centro', 4.5, 120, 1, '1111100'),
    (2, 1, 'Market Norte', 'Sucursal zona norte', '3009876543', 'Carrera 15 #100-50', 'Local 3', 'Norte', 4.2, 80, 1, '1111110'),
    (3, 1, 'Market Sur', 'Sucursal zona sur', '3014567890', 'Avenida 30 #20-15', 'Local 2', 'Sur', 4.0, 60, 1, '1111100');

INSERT INTO productos
    (id, estado, kit, barcode, nombre, presentacion, descripcion, foto, peso)
VALUES
    (1, 1, 0, '7701001001', 'Arroz 1kg', 'Bolsa', 'Arroz blanco premium', 'arroz.jpg', 1.00),
    (2, 1, 0, '7701001002', 'Leche 1L', 'Caja', 'Leche entera', 'leche.jpg', 1.00),
    (3, 1, 0, '7701001003', 'Aceite 900ml', 'Botella', 'Aceite vegetal', 'aceite.jpg', 0.90),
    (4, 1, 0, '7701001004', 'Pan Tajado', 'Paquete', 'Pan integral', 'pan.jpg', 0.50),
    (5, 1, 0, '7701001005', 'Huevos x12', 'Cubeta', 'Huevos AA', 'huevos.jpg', 0.70);

INSERT INTO productos_stocks
    (id, cantidad, id_tienda, id_producto, fecha_ingreso)
VALUES
    (1, 100, 1, 1, CURRENT_DATE),
    (2, 50, 1, 2, CURRENT_DATE),
    (3, 80, 2, 1, CURRENT_DATE),
    (4, 60, 2, 3, CURRENT_DATE),
    (5, 40, 3, 4, CURRENT_DATE),
    (6, 30, 3, 5, CURRENT_DATE);

INSERT INTO categorias
    (id, nombre, adultos)
VALUES
    (1, 'Granos', 0),
    (2, 'Lácteos', 0),
    (3, 'Panadería', 0),
    (4, 'Abarrotes', 0);

INSERT INTO productos_categorias
    (id, id_categoria, id_producto)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 4, 3),
    (4, 3, 4),
    (5, 4, 5);


INSERT INTO pedidos
    (id, instrucciones, entrega_fecha, valor_productos, valor_envio, valor_descuento, valor_cupon, impuestos, valor_impuestos, valor_final, calificacion, id_tienda, direccion, valor_comision, id_user, created_at)
VALUES
    (1, 'Entregar en portería', CURRENT_DATE, 50000, 5000, 0, 0, 1, 9500, 64500, 5, 1, 'Calle 1 #2-3', 2000, 1, NOW()),
    (2, 'Sin instrucciones', CURRENT_DATE, 30000, 5000, 0, 0, 1, 5700, 40700, 4, 2, 'Carrera 10 #20-30', 1500, 2, NOW());


INSERT INTO pedidos_productos
    (id, cantidad, valor_unitario, valor_unitario_promocion, total_teorico, total_final, id_promocion, id_producto, id_pedido)
VALUES
    (1, 5, 5000, 4500, 25000, 22500, NULL, 1, 1),
    (2, 3, 3000, 3000, 9000, 9000, NULL, 2, 1),
    (3, 2, 7000, 6500, 14000, 13000, NULL, 3, 2),
    (4, 6, 5000, 4500, 30000, 27000, NULL, 1, 2);

INSERT INTO promociones
    (id, estado, nombre, imagen, porcentaje, dias_semana)
VALUES
    (1, 1, 'Promo Arroz 10%', 'promo1.jpg', 10, ARRAY
[1,1,1,1,1,0,0]),
(2, 1, 'Promo Fin de Semana', 'promo2.jpg', 15, ARRAY[0,0,0,0,0,1,1]);


INSERT INTO tiendas_promociones
    (id, estado, inicio, fin, id_tienda, id_promocion)
VALUES
    (1, 1, CURRENT_DATE - INTERVAL
'5 days', CURRENT_DATE + INTERVAL '5 days', 1, 1),
(2, 1, CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '2 days', 2, 2);