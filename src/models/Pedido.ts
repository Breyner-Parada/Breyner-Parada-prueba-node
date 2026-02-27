import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Pedido = sequelize.define(
  'Pedido',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    instrucciones: {
      type: DataTypes.STRING(500),
    },
    entrega_fecha: {
      type: DataTypes.DATE,
    },
    valor_productos: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
    },
    valor_envio: {
      type: DataTypes.DECIMAL(10, 3),
      defaultValue: 0,
    },
    valor_descuento: {
      type: DataTypes.DECIMAL(12, 3),
      defaultValue: 0,
    },
    valor_cupon: {
      type: DataTypes.DECIMAL(11, 3),
      defaultValue: 0,
    },
    impuestos: {
      type: DataTypes.SMALLINT,
    },
    valor_impuestos: {
      type: DataTypes.DECIMAL(11, 3),
      defaultValue: 0,
    },
    valor_final: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.DECIMAL(3, 2),
    },
    id_tienda: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'tiendas',
        key: 'id',
      },
    },
    direccion: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    valor_comision: {
      type: DataTypes.DECIMAL(11, 3),
    },
    id_usuario: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'pedidos',
    timestamps: false,
  }
);

export default Pedido;
