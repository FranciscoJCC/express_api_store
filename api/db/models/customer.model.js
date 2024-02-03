const { Model, DataTypes, Sequelize } = require('sequelize');

//Tablas con relacion
const { USER_TABLE } = require('./user.model');

//Table name
const CUSTOMER_TABLE = 'customers';


//Schema bdd
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  userId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Customer extends Model {
  static associate(models){
    //relaciones, tiene un user, pero la relacion se carga a customer
    this.belongsTo(models.User, { as: 'user' });
    //Un cliente puede tener muchas ordenes
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }
