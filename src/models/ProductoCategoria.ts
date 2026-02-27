import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const ProductoCategoria = sequelize.define(
  'ProductoCategoria',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_categoria: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'categorias',
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
  },
  {
    tableName: 'productos_categorias',
    timestamps: false,
  }
);

export default ProductoCategoria;
