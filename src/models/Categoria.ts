import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Categoria = sequelize.define(
  'Categoria',
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    adultos: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
  },
  {
    tableName: 'categorias',
    timestamps: false,
  }
);

export default Categoria;
