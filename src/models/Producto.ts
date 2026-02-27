import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Producto = sequelize.define(
  'Producto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    estado: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    kit: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    barcode: {
      type: DataTypes.STRING(30),
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    presentacion: {
      type: DataTypes.STRING(25),
    },
    descripcion: {
      type: DataTypes.STRING(500),
    },
    foto: {
      type: DataTypes.STRING(120),
    },
    peso: {
      type: DataTypes.DECIMAL(6, 2),
    },
  },
  {
    tableName: 'productos',
    timestamps: false,
  }
);

export default Producto;
