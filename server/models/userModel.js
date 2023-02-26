import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({

    fname: {
        type: String,
        required: [true, "Please enter your first name"],
        min: 4,
        max:50
    },
    lname: {
        type: String,
        required: ["Please enter your last name"],
        min: 4,
        max:50
    },
    email: {
        type: String,
        required: [true,"Please enter your email"],
        trim: true,
        unique:true
    },
    mobile: {
        type: String,
        required: [true,"Please enter mobile number"],
        min: 6,
        max:15
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        min: 8
    },
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/dl99x/image/upload/v1665520140/avatar_cugq40_osziik.png"
    },

},{
    timestamps : true
})

 
const Users = mongoose.model("Users", userSchema);
export default Users;