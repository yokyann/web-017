const { ObjectId } = require('mongodb');

class Users {
  constructor(db) {
    this.db = db;
  }

  // Create a new user
  async create(lastName, firstName, login, password) {
    console.log("in function create", lastName, firstName, login, password)
    const exists = await this.db.collection('Users').findOne({ login });
    console.log("exists", exists)

    if (exists) {
      console.log("already exists")
      res.status(401).send("Login already exists");
    }
    else{
    const result = await this.db.collection('Users').insertOne({
      lastName,
      firstName,
      login,
      password,
    });
    return result;}
  }

  // Login a new user
  async login(login, password, res) {
    console.log("in function create", login, password)
  
    const user = await this.db.collection('Users').findOne({ login, password });
    if (user) {
      console.log("user found")
      return user;
    }
    else{
      res.status(401).send("Invalid login or password");
    }
    return user;
  }
  
  // Delete a user
  // async deleteOne(login) {
  
  // update a user login 
  // async updateOne(login, new_login) {

  // update a user password
  // async updateOne(login, new_password) {


  

}

module.exports = Users;
