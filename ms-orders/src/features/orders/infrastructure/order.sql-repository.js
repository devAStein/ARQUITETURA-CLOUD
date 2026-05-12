const sql = require("mssql");
const { getSqlPool } = require("../../../config/database");

const sqlOrderRepository = {
  requiresManualValidation: false,

  async findAll() {
    const result = await getSqlPool().request().query("SELECT * FROM Orders ORDER BY id DESC");
    return result.recordset;
  },

  async findById(orderId) {
    const result = await getSqlPool()
      .request()
      .input("id", sql.Int, orderId)
      .query("SELECT * FROM Orders WHERE id = @id");

    return result.recordset[0];
  },

  async create(orderData) {
    const result = await getSqlPool()
      .request()
      .input("customerName", sql.NVarChar, orderData.customerName)
      .input("destination", sql.NVarChar, orderData.destination)
      .input("status", sql.NVarChar, orderData.status)
      .query(`
        INSERT INTO Orders (customerName, destination, status)
        OUTPUT INSERTED.*
        VALUES (@customerName, @destination, @status)
      `);

    return result.recordset[0];
  },

  async updateById(orderId, orderData) {
    const result = await getSqlPool()
      .request()
      .input("id", sql.Int, orderId)
      .input("customerName", sql.NVarChar, orderData.customerName)
      .input("destination", sql.NVarChar, orderData.destination)
      .input("status", sql.NVarChar, orderData.status)
      .query(`
        UPDATE Orders
        SET customerName = @customerName, destination = @destination, status = @status
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    return result.recordset[0];
  },

  async deleteById(orderId) {
    const result = await getSqlPool()
      .request()
      .input("id", sql.Int, orderId)
      .query("DELETE FROM Orders WHERE id = @id");

    return result.rowsAffected[0] !== 0;
  }
};

module.exports = { sqlOrderRepository };
