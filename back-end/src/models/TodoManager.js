class TodoManager {
  static table = 'todo';

  findAll() {
    return this.connection.query(`select *from ${TodoManager.table}`);
  }
}

module.exports = TodoManager;
