module.exports = (req, res, next) =>{
    if(req.session.userId){
        console.log("Not Need Authentication");
        return res.redirect('/') 
    }
    next()
}