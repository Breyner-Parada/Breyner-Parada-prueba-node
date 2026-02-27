import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const PedidoProducto = sequelize.define(
  'PedidoProducto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL(9, 3),
      allowNull: false,
    },
    valor_unitario: {
      type: DataTypes.DECIMAL(11, 3),
      allowNull: false,
    },
    valor_unitario_promocion: {
      type: DataTypes.DECIMAL(11, 3),
    },
    total_teorico: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
    },
    total_final: {
      type: DataTypes.DECIMAL(12, 3),
      allowNull: false,
    },
    id_promocion: {
      type: DataTypes.INTEGER,
      references: {
        model: 'promociones',
        key: 'id',
      },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id',
      },
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedidos',
        key: 'id',
      },
    },
  },
  {
    tableName: 'pedidos_productos',
    timestamps: false,
  }
);

export default PedidoProducto;
