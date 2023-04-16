const { ObjectId } = require('mongodb');

class Users {
  constructor(db) {
    this.db = db;
  }

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
  
  

}

module.exports = Users;
