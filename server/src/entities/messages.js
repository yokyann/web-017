const { ObjectId } = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db;
    }


    // Create a new message
    async create(message, author_login) {
        console.log("trudfbndvjsk",message,author_login)
        const result = await this.db.collection('Messages').insertOne({
          message,
          comments : [],
          author_login,
          liked_by : [],
          date_creation: new Date()
        });
        return result;
      }


    // Get all messages
    async getAllMessages() {
        const messages = await this.db.collection('Messages').find().toArray();
        return messages;
    }

    // Get a user's messages
    async getUserMessages(login) {
        console.log("in function getUserMessages IN MESSAGES", login)
        const messages = await this.db.collection('Messages').find({ author_login: login }).toArray();
        return messages;
    }

    // Update a user's messages
    // async updateMessage(login, message, new_message, comments, likes, author_login) 

    // Delete a user's messages
    // async deleteMessage(id) 

    // Like a message
    // async like(login, message, likes, author_login) 

    // Comment a message
    // async commentMessage(login, message, comments, author_login)

    // Remove a like 
    // async removeLike(login, message, likes, author_login)

    // Remove a comment
    // async removeComment(login, message, comments, author_login)

}

module.exports = Messages;
