const User = require('../model/user')
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user ) =>{
        console.log("Examiner Authentication middleware called")
        if(error || !user )
        {
            return res.redirect('/');
            
        }else if(user.user_type == 'examiner')
        {
            next()
        }else if (user.user_type != 'examiner')
        {
            return res.redirect('/');
        }
    })
}