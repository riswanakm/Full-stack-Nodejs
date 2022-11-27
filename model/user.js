const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstname: {
        type: String, required: true, default: " "
    },
    lastname: { type: String, default: " " },
    dob: {
        type: String, required: true, default: " "
    },
    userid: {
        type: String, required: true, default: "new_user"
    },
    user_name: {
        type: String, required: true, default: " "
    },
    user_type: {
        type: String, required: true, default: " "
    },
    password: {
        type: String,
    },
    house_number: { type: Number, default: 0 },
    street_name: { type: String, default: " " },
    city: { type: String, default: " " },
    province: { type: String, default: " " },
    postal_code: { type: String, default: " " },
    make: { type: String, default: " " },
    model: { type: String, default: " " },
    year: { type: String, default: " " },
    plate_number: { type: String, default: " " },
    liscence_number: { type: String, default: "11111" },
    image: { type: String, default: " " },
    image1: { type: String, default: " " },
    test_type: { type: String, default: null },
    comment: { type: String },
    isPassed: { type: Boolean, default: null }
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    });

})

// UserSchema.pre('save', function(next){
//     const user = this;
//     bcrypt.hash(user.liscence_number,10,(error,hash)=>{
//         user.liscence_number = hash
//         next()
//     });
// })

const user = mongoose.model('User', UserSchema, 'users');

module.exports = user;