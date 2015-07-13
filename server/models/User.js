/**
 * User: Fathead
 * Date: 12-02-2015
 * Time: 16:11
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	fbUserId:String,
	tv2UserId:String,
	name:String,
	email:String,
	wallet:Number,
	loggedIn:{type: Date },
	fbFriends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	profileImage: String,
	boughtItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'ShopItem'}],
	acceptedTerms: {type: Boolean , default:false},
	createdOn:{type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
