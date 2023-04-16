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
      return null;
    }
    const result = await this.db.collection('Users').insertOne({
      lastName,
      firstName,
      login,
      password,
    });
    return result;
  }
  
  

  get(userid) {
    return new Promise((resolve, reject) => {
      const user = {
        login: "pikachu",
        password: "1234",
        lastname: "chu",
        firstname: "pika",
      }; // À remplacer par une requête bd

      if (false) {
        //erreur
        reject();
      } else {
        if (userid == 1) {
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  }

  

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      let userid = 1; // À remplacer par une requête bd
      if (false) {
        //erreur
        reject();
      } else {
        resolve(userid);
      }
    });
  }
}

module.exports = Users;
