const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://riswana123:riswana123@cluster0.bmpsj.mongodb.net/drivtest?retryWrites=true&w=majority");
mongoose.connection.on("connected",function(){
    console.log("Application is connected to the database");
})
