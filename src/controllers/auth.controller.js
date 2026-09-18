const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const userRegisterController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({
            status: httpStatusText.ERROR,
            message: errors.array()
        });
    }
    const { username, email, password } = req.body; 
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: "User already exists"
        });
    } 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
     
     await newUser.save();  

      const userData = newUser.toObject();
      delete userData.password;
     const token = null;

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "user registered successfully",
        data: { user: userData },
        token : token
        
    });
    
}
const userLoginController = async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: httpStatusText.ERROR,
                message: errors.array()
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: httpStatusText.ERROR,
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: httpStatusText.ERROR,
                message: "Invalid email or password"
            });
        }
        const userData = user.toObject();
        delete userData.password;
        const token = jwt.sign({ id : user._id , username :user.username }, process.env.JWT_SECRET);

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "user logged in successfully",
            data: { user: userData },
            token: token
        });
  
};

module.exports = { userRegisterController, userLoginController };