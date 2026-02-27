import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Tienda = sequelize.define(
  'Tienda',
  {
    id: {
      type: DataTypes.SMALLINT,
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
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    direccion: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    direccion_anexo: {
      type: DataTypes.STRING(40),
    },
    direccion_barrio: {
      type: DataTypes.STRING(25),
    },
    calificacion: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    calificacion_cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    impuestos: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    dias_trabajados: {
      type: DataTypes.STRING(21),
    },
  },
  {
    tableName: 'tiendas',
    timestamps: false,
  }
);

export default Tienda;
