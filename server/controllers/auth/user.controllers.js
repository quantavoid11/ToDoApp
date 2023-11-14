import crypto from 'node:crypto'
import { ApiError } from '../../utils/ApiError.js';
import asyncHandler from 'express-async-handler';
import User from '../../models/auth/user.models.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/mail.js';
import {emailVerificationMailgenContent} from '../../utils/mail.js';
import { TOKEN_EXPIRY_TIME } from '../../constants.js';


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists =await  User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        throw new ApiError(409, "User with email or username already exists", []);
    };

    const hashedPassword=crypto
        .createHash('sha256')
        .update(password)
        .digest("hex");

    const user=User.create({
        username,
        email,
        password:hashedPassword,
        isEmailVerified:false
    });

    const unHashedToken=crypto.randomBytes(15).toString("hex");
    const hashedToken=crypto
        .createHash('sha256')
        .update(password)
        .digest("hex");
    const expiryToken=Date.now()+TOKEN_EXPIRY_TIME;

    user.emailVerificationToken=hashedToken;
    user.emailExpiryToken=expiryToken;
    await sendEmail({
        email:email,
        subject:"Please verify your email.",
        mailgenContent: emailVerificationMailgenContent(
            username,
            `${req.protocol}://${req.get(
              "host"
            )}/api/v1/users/verify-email/${unHashedToken}`
          ),
    })


    const createdUser=await User.findById((await user)._id).select(
        "-password -emailVerificationToken -emailExpiryToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "Users registered successfully and verification email has been sent on your email."
      )
    ); 

});

export {registerUser};