const user = require('../model/user');

const goExaminer = async (req, res) => {
    const g2userlist = await user.find({ isPassed: null, test_type: 'G2' });
    console.log("g2userlist", g2userlist);
    const guserlist = await user.find({ isPassed: null, test_type: 'G' });
    console.log("guserlist", guserlist);
    res.render('examiner', {
        g2userlist,
        guserlist,
        validationErrors: req.flash('validationErrors'),
        appointment_successmessage: req.flash('examiner_successmessage')
    })
}

module.exports = {
    goExaminer
}