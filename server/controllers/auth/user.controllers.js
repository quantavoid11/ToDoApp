import crypto from 'node:crypto'
import { ApiError } from '../../utils/ApiError.js';
import asyncHandler from 'express-async-handler';
import User from '../../models/auth/user.models.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/mail.js';
import { emailVerificationMailgenContent } from '../../utils/mail.js';
import { TOKEN_EXPIRY_TIME } from '../../constants.js';


const generateAccessAndRefeshTokens = async (userId) => {
    try {
        const user = User.findById(userId);
        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                username: user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        )
        const refreshToken = jwt.sign(
            {
                _id: user._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        )
        user.refreshToken = refreshToken;
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating the access token"
        )
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
        throw new ApiError(409, "User with email or username already exists", []);
    };

    const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest("hex");

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        isEmailVerified: false
    });

    const unHashedToken = crypto.randomBytes(15).toString("hex");
    const hashedToken = crypto
        .createHash('sha256')
        .update(password)
        .digest("hex");
    const expiryToken = Date.now() + TOKEN_EXPIRY_TIME;

    user.emailVerificationToken = hashedToken;
    user.emailExpiryToken = expiryToken;
    await sendEmail({
        email: email,
        subject: "Please verify your email.",
        mailgenContent: emailVerificationMailgenContent(
            username,
            `${req.protocol}://${req.get(
                "host"
            )}/api/v1/users/verify-email/${unHashedToken}`
        ),
    })


    const createdUser = await User.findById((await user)._id).select(
        "-password -emailVerificationToken -emailExpiryToken"
    );

    if (!createdUser) {
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest("hex");

    const isPasswordValid = (hashedPassword === user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefeshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );

});

export { registerUser, loginUser };