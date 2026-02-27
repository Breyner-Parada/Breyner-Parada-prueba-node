import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Promocion = sequelize.define(
  'Promocion',
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
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(120),
    },
    porcentaje: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    dias_semana: {
      type: DataTypes.STRING(21),
    },
  },
  {
    tableName: 'promociones',
    timestamps: false,
  }
);

export default Promocion;
