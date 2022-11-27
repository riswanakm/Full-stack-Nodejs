const user = require('../model/user');
const bcrypt = require('bcrypt');
const path = require('path');
const appointment = require('../model/appointment');


const g2Page = async (req, res) => {
  const userDetails = await user.findOne({ _id: req.session.userId });
  appointment.find({ available: true }, function (error, result) {
    if (error) return next([err])

    if (result) {
      res.render("g2", {
        appointments: result,
        user: userDetails,
        length: result.length,
        successmessage: ''
      })
    }
  })
}

const gPage = (req, res) => {
  user.findOne({ '_id': req.session.userId }, function (err, user) {
    if (err) return handleError(err);

    if (user) {
      console.log(user);
      res.render("g", {user});

    } else {
      res.render("g", { message: " " });
    }
  });
  
}



const findUser = (req, res) => {

  // user.findOne({ 'userid': req.body.userid }, function (err, user) {
  //   if (err) return handleError(err);

  //   if (user) {

  //     res.render("g", {

  //       firstname: user.firstname,
  //       lastname: user.lastname,
  //       dob: user.dob,
  //       userid: user.userid,
  //       house_number: user.house_number,
  //       street_name: user.street_name,
  //       city: user.city,
  //       province: user.province,
  //       postal_code: user.postal_code,
  //       make: user.make,
  //       model: user.model,
  //       year: user.year,
  //       plate_number: user.plate_number,
  //       liscence_number: user.liscence_number,
  //       isEmpty: false
  //     });
  //   } else {
  //     res.render("g2", { message: "No User Found" });
  //   }

  // });

  
}

const proessLogin = (req, res) => {
  const username = req.body.user_name;
  const password = req.body.password;

  user.findOne({ user_name: username }, function (error, resuser) {
    if (resuser) {
      bcrypt.compare(password, resuser.password, (error, same) => {

        if (same) {
          console.log(resuser._id);
          req.session.userId = resuser._id;
          req.session.user_type = resuser.user_type;
          res.redirect('/')
        } else {

          res.redirect('/signup')
        }
      })
    } else {
      res.redirect('/signup');
    }
  })
}


const index = async function (req, res) {
  const users = await user.find({});
  res.render("dashboard", { userlist: users });
}

const update = async function (req, res) {
  req.body.comment = null;
  req.body.isPassed = null;
  await user.findByIdAndUpdate({ '_id': req.session.userId }, req.body);
  res.redirect('/')
}

const getAllUserData = async function (req, res) {
  const users = await user.find({});
  res.render("dashboard", { userlist: users });
}

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

const saveUser = async function (req, res) {

  await user.create({

    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dob: req.body.dob,
    userid: req.body.userid,
    house_number: req.body.house_number,
    street_name: req.body.street_name,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    plate_number: req.body.plate_number,
    liscence_number: req.body.liscence_number,
  });
  res.redirect('/');
}

const signupUser = (req, res) => {
  const username = req.body.user_name;
  user.findOne({ user_name: username }, function (error, resuser) {
    if (resuser) {
      res.redirect('/')
    } else {
      user.create(req.body, (error, user) => {
        if (error) {
          console.log(error);
          return res.redirect("/singup")
        }
        res.redirect('/login')
      })
    }
  })
}

const bookAppointment = async (req, res) => {

  const filter = { '_id': req.body.appointment_id };
  const update = { available: false, user_id: req.session.userId };

  const boooking = await appointment.findOneAndUpdate(filter, update);

  // update the test type as G2 in user
  const userDetails = await user.findOneAndUpdate({ _id: req.session.userId }, { test_type: "G2" }, {new: true});

  req.flash('successmessage', "The appointment is booked successfully!")
  appointment.find({ available: true }, function (error, result) {
    if (error) return next([err])

    if (result) {
      return res.render("g2", {
        user: userDetails,
        appointments: result,
        length: result.length,
        successmessage: req.flash('successmessage')
      })

    }
  })
}

const signup = (req, res) => {
  res.render("signup");
}

const login = (req, res) => {
  res.render('login')
}

const getCandidates = async (req, res) => {
  const users = await user.find({ isPassed: { $ne: null } });

  res.render("candidates", { userlist: users });
}

const getCandidate = async (req, res) => {
  const userDetails = await user.findById(req.query.id);

  res.render("candidate", { user: userDetails, successmessage: req.flash('successmessage') });
}

const updateResult = async (req, res) => {
  await user.findByIdAndUpdate({ '_id': req.body.userId }, 
  {
    comment: req.body.comment,
    isPassed: req.body.result
  });
  res.redirect('/examiner')
}

module.exports = {
  findUser, index, update, getAllUserData, logout, saveUser, signupUser, proessLogin, login, g2Page, gPage, signup, bookAppointment, getCandidates, getCandidate, updateResult
}