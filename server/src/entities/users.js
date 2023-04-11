class Users {
  constructor(db) {
    this.db = db;
  }

  create(lastname, firstname,login, password) {
    return new Promise( async (resolve, reject) => {
		console.log(" dans create : ,",lastname, firstname,login, password )
		this.db.db('birdy').collection('User').insertOne({
			lastname, firstname, login, password
		})
		.then((res) => {
			console.log("dans create :",res)
			resolve(res)
		})
		.catch((err) => console.log(err))
	});
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

  async exists(login) {
    return new Promise((resolve, reject) => {
      if (false) {
        //erreur
        reject();
      } else {
        resolve(true);
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
