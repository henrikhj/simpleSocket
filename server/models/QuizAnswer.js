/**
 * User: Fathead
 * Date: 11-02-2015
 * Time: 11:37
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	userId:	{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	quizId: {type: mongoose.Schema.Types.ObjectId, ref: 'QuizEvent'},
	correct:Boolean,
	answerIndex:Number,
	first:{type:Boolean, default: false },
	time:Number,
	answerTime:{type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizAnswer', eventSchema );
