const { ObjectId } = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db;
    }

    // Create a new user
    async create(message, comments, likes, author_login) {
        console.log("in function create", message, comments, likes, author_login)

        const result = await this.db.collection('Messages').insertOne({
            message,
            comments,
            likes,
            author_login
        });
        return result;
    }


    // Get all messages
    async getAllMessages() {
        const messages = await this.db.collection('Messages').find().toArray();
        return messages;
    }

    // Get a user's messages
    async getOne(login) {
        const messages = await this.db.collection('Messages').find({ author_login: login }).toArray();
        return messages;
    }

    // Update a user's messages
    // async updateOne(login, message, new_message, comments, likes, author_login) 

    // Delete a user's messages
    // async deleteOne(id) 

    // Like a message
    // async likeOne(login, message, likes, author_login) 

    // Comment a message
    // async commentOne(login, message, comments, author_login)


}

module.exports = Messages;
