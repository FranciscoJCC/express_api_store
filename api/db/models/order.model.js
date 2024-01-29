const { Model, DataTypes, Sequelize} = require('sequelize');

//relaciones
const { CUSTOMER_TABLE } = require('./customer.model');

//Tabla
const ORDER_TABLE = 'orders';

//Schema bdd
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  statusOrder: {
    field: 'status_order',
    allowNull: false,
    type: DataTypes.ENUM(['paid','open','in progress','pending','cancelled']),
    defaultValue: 'open'
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
}

//Clase
class Order extends Model {
  static associate(models){
    //relaciones
    this.belongsTo(models.Customer, {
      as: 'customer',
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}


module.exports = { ORDER_TABLE, OrderSchema, Order };
