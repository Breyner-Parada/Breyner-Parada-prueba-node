import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const TiendaPromocion = sequelize.define(
  'TiendaPromocion',
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
    inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fin: {
      type: DataTypes.DATE,
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
    id_promocion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'promociones',
        key: 'id',
      },
    },
  },
  {
    tableName: 'tiendas_promociones',
    timestamps: false,
  }
);

export default TiendaPromocion;
