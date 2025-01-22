const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

//? secure the password with the bcrypt 
userSchema.pre('save', async function (next) {
    const isPasswordMatch = this;

    if (!isPasswordMatch.isModified('password')) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(isPasswordMatch.password, saltRound);
        isPasswordMatch.password = hash_password;
    } catch (error) {
        next(error);

    }
});

// compare the password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


//? JSON web token
userSchema.methods.generateToken = async function (token) {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// define the models or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;