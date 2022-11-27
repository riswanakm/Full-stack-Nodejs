const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema ({
    appointment_date : {
        type: String, required: true
    },
    time_slot : {
        type: String, required: true
    },
    available : {
        type : Boolean, default : true
    },
   user_id : { type:String, required: true, default: 0}

})

const appointment = mongoose.model('Appointment',appointmentSchema, 'appointments');

module.exports = appointment;