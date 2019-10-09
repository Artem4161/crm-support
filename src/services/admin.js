const Admin = require('../models/admin.js');
const Role = require('../models/role.js');

class AdminService {
  async find(query) {
    Logger.mongodb('Find admin', query);
    const admin = await Admin.findOne(query).exec();
    return admin;
  }

  async role({ id }) {
    Logger.mongodb('Find role', { id });
    const role = await Role.findOne({ _id: id }).exec();
    return role;
  }

  async save(query) {
    Logger.mongodb('Save admin', query);
    const admin = await new Admin(query).save();
      return admin;
    // try {
      
    // } catch (error) {
    //   throw Error(error)
    //   console.log('error.name', error.name);
    // }
  }
}

module.exports = new AdminService();
