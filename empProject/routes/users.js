var mongoose = require('mongoose');

var plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/employee',function(){
    console.log("connecting to database...")
});

var userSchema = mongoose.Schema({
  username:{
      type: String,
      required: true
  },
  age:{
    type: Number,
    required: true
  },
  address:{
     type: String,
     required: true
  },
  mobile: {
      type:Number,
      required: true
  },
  email: {
      type: String,
      required: true
  },
});

userSchema.plugin(plm);

var User = mongoose.model("user", userSchema);

module.exports = User;