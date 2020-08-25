'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Session.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    facility_id: {
      type: DataTypes.INTEGER
    },
    facility_role: {
      type: DataTypes.STRING
    },
    expires_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Session',
    timestamps: false
  });
  return Session;
};
