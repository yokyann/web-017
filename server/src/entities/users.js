const { ObjectId } = require("mongodb");
class Users {
  constructor(db) {
    this.db = db;
  }

  // Create a new user
  async create(
    lastName,
    firstName,
    login,
    password,
  ) {
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
        blocked_users: [],
        followers: [],
        followings: [],
      });
      if (result) {
        return result;
      } else {
        return res.send("Failed to create user");
      }
    }
  }

  // Login a new user
  async login(login, password) {
    const user = await this.db.collection('Users').findOne({ login, password });
    if (user) {
      return user;
    } else {
      throw new Error('Invalid login or password');
    }
  }
  


  // Delete a user
  async deleteUser(login) {
    console.log("in function deleteUser", login);
    const exists = await this.db.collection("Users").findOne({ login });
    if (exists) {
      const result = await this.db.collection("Users").deleteOne({ login });
      return result;
    }
  }

// Get all users
  async getAllUsers() {
    const result = await this.db.collection("Users").find().toArray();
    return result;
  }

  // Follow a user
  async followUser(login, loginToFollow) {
    console.log("in function followUser", login, loginToFollow);
    await this.db.collection("Users").updateOne(
      { login },
      { $addToSet: { followings: loginToFollow } }
    );
    const thisuser = await this.db.collection("Users").findOne({ login });
    return thisuser;
  }

  // Unfollow a user
  async unfollowUser(login, loginToUnfollow) {
    console.log("in function unfollowUser", login, loginToUnfollow);
    await this.db.collection("Users").updateOne(
      { login },
      { $pull: { followings: loginToUnfollow } }
    );
    const thisuser = await this.db.collection("Users").findOne({ login });
    return thisuser;
  }

  // update a user login
  // async updateOne(login, new_login) {

  // update a user password
  // async updateOne(login, new_password) {
}

module.exports = Users;
