const appointment = require('../model/appointment');

const creatAppointment = (req, res) => {

  const appointment_date = req.body.appointment_date;
  const time_slot = req.body.time_slot;

  appointment.findOne({ appointment_date: appointment_date, time_slot: time_slot }, function (error, resAppointment) {
    if (resAppointment != null) {
      console.log(resAppointment);
      req.flash('validationErrors', "This Appointment Date and time slot is already saved!")
      return res.redirect("/appointment")
    } else {
      appointment.create(req.body, (error, appointment) => {

        if (error) {
          const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

          req.flash('validationErrors', validationErrors)
          req.flash('data', req.body)
          return res.redirect("/appointment")
        }
        else {
          req.flash('appointment_successmessage', "Appointment is saved successfully!")
          return res.redirect("/appointment")
        }

      });

    }
  });

}



const goAppointment = (req, res) => {
  res.render('appointment', {
    validationErrors: req.flash('validationErrors'),
    appointment_successmessage: req.flash('appointment_successmessage')
  })
}

module.exports = {
  creatAppointment, goAppointment
}