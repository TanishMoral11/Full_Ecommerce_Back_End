const moongoose = require("'mongoose" );
const { default: mongoose } = require("mongoose");

/**
 * name
 * userID
 * password
 * email
 * userType 
 */

const userSchema = new mongoose.Schema({
    name :{
    type : String,
    required : true
    },
    userID:{
        type :String,
        unique :true,
        required : true
    },
    password :{
        type : String ,
        required : true
    },
    email :{
        type : String ,
        unique : true ,
        lowercase : true ,
        required : [ "Please provide an Email address"] ,
        // match :[ /^\S+@\S+\.\S+$/ , 'Please use a valid Email Address'],
        minLength : 10
        
    },
    userType : {
        type: String,
        required: true,
        default : "CUSTOMER",
        enum: ["ADMIN","EMPLOYEE"]
    }

}, {timestamps:true, versionKey:false})
//timestamps means wo sath sath time bhi note karega , ki kab kisne login kiya h 
//versiokey means wo by default ek version provide karata h sabhi data ya information ko so hum nahi chate ki abhi wo store ho so humne wo false kardiya h 

/**
 * hum ab iss step me data ko modules me convert kar rahe h , 
 * 
 */
module.exports = mongoose.model("User", userSchema);