const { ObjectId } = require('mongodb');

class Users {
  constructor(db) {
    this.db = db;
  }

  // Create a new user
  async create(lastName, firstName, login, password, req, res) {
    console.log("in function create", lastName, firstName, login, password);
    const exists = await this.db.collection("Users").findOne({ login });
    console.log("exists", exists);
  
    if (exists) {
      console.log("already exists");
      return res.status(401).send("Login already exists");
    } else {
      const result = await this.db.collection("Users").insertOne({
        lastName,
        firstName,
        login,
        password,
        friends: [],
        blocked_users: [],
      });
      if (result) {
        req.session.user = { lastName, firstName, login }; // create a new session for the user
        return res.send("User created successfully");
      } else {
        return res.send("Failed to create user");
      }
    }
  }
  
  
  
  
  

  // Login a new user
  async login(login, password, req, res) {
    console.log("in function login", login, password)
  
    const user = await this.db.collection('Users').findOne({ login, password });
    if (user) {
      console.log("user found")
      req.session.user = user; // create a new session for the user
      return user;
    }
    else{
      res.status(401).send("Invalid login or password");
    }
    return user;
  }
  
// Delete a user
async deleteUser(login) {
  console.log("in function deleteUser", login);
  const exists = await this.db.collection("Users").findOne({ login });
  if (exists) {
    const result = await this.db.collection("Users").deleteOne({ login });
    return result;
  } else {
    return { error: "User not found" };
  }
}

  
  // update a user login 
  // async updateOne(login, new_login) {

  // update a user password
  // async updateOne(login, new_password) {
  
}

module.exports = Users;
