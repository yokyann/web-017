const { ObjectId } = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db;
    }

    // Create a new message
    async create(message, author_login) {
        console.log("trudfbndvjsk", message, author_login)
        const result = await this.db.collection('Messages').insertOne({
            message,
            comments: [],
            author_login,
            liked_by: [],
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
    async deleteMessage(id) {
        console.log("in function deleteMessage IN MESSAGES", id)
        const result = await this.db.collection('Messages').deleteOne({ _id: new ObjectId(id) });
        return result;
    }

    // Like a message
    async addLike(login, id) {
        console.log("in function like IN MESSAGES", login, id);
        const message = await this.db.collection("Messages").findOne({ _id: new ObjectId(id) });
        if (!message) {
            return "Message not found";
        }
        let existLike = message.liked_by.includes(login);
        if (existLike) {
            return message;
        }
        await this.db.collection("Messages").updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: { liked_by: login } }
        );
        const updatedMessage = await this.db.collection("Messages").findOne({ _id: new ObjectId(id) });
        return updatedMessage;

    }

    // Comment a message
    // async commentMessage(login, message, comments, author_login)

    // Remove a like 
    async deleteLike(login, id) {
        console.log("in function removeLike IN MESSAGES", login, id)
        const message = await this.db.collection("Messages").findOne({ _id: new ObjectId(id) });
        if (!message) {
          return "Message not found";
        }
        let existLike = message.liked_by.includes(login);
        if (!existLike) { // si le user n'a pas liké le message
          return message;
        } else {
          await this.db.collection('Messages').updateOne(
            { _id: new ObjectId(id) },
            { $pull: { liked_by: login } }
          );
          const updatedMessage = await this.db.collection("Messages").findOne({ _id: new ObjectId(id) });
          return updatedMessage;
        }
      }
      
    // Remove a comment
    // async removeComment(login, message, comments, author_login)

}

module.exports = Messages;
