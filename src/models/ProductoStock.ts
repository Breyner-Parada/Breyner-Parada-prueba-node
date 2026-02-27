import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const ProductoStock = sequelize.define(
  'ProductoStock',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.DECIMAL(8, 3),
      allowNull: false,
    },
    id_tienda: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'tiendas',
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
    fecha_ingreso: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'productos_stocks',
    timestamps: false,
  }
);

export default ProductoStock;
