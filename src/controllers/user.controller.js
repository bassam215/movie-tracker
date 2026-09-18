const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const updateUserController = async (req, res) => {

    // Make sure the user can only update his own account
    if (req.user.id !== req.params.id) {
        return res.status(401).json({
            status: httpStatusText.ERROR,
            message: "Unauthorized"
        });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: errors.array()
        });
    }

    let updateData = {};

    if (req.body.username) {
        updateData.username = req.body.username;
    }

    if (req.body.email) {
        updateData.email = req.body.email;
    }

    // Hash password only if user wants to change it
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);

        updateData.password = await bcrypt.hash(req.body.password,salt);
    }
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: updateData
        },
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    // User not found
    if (!updatedUser) {
        return res.status(404).json({
            status: httpStatusText.ERROR,
            message: "User not found"
        });
    }

    // Success response
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "User updated successfully",
        data: {
            user: updatedUser
        }
    });
};

exports.updateUserController = updateUserController;