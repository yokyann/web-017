const { ObjectId } = require('mongodb');

class Friends {
  constructor(db) {
    this.db = db;
  }

  // Following another user
  // async followOne(login, friend_login) {

  // Unfollowing another user
  // async unfollowOne(login, friend_login) {

  // Get all friends of one user 
  // async getOne(login) {
  
  // Get all friends of all users ?

}

module.exports = Friends;
