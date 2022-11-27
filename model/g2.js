const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const g2Schema = new Schema ({
    firstname : {
        type: String, required: true
    },
    lastname : String,
    dob :  {
        type: String, required: true
    },
    userid : {
        type: String, required: true
    },
    house_number : String,
    street_number : String,
    city : String,
    province : String,
    postal_code : String,
    make : String,
    model : String,
    year : String,
    plate_number : String,
    liscence_number : String

})

const g2 = mongoose.model('G2',g2Schema, 'g2s');

module.exports = g2;