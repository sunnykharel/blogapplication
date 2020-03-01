const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subscriptionSchema = new Schema({
    email: {type: String, unique: true },
}, {
    timestamps: true,
});
const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;