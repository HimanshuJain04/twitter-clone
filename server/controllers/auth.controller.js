import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { mailSender } from "../utils/mailSender.js";



// HELPER FUNCTIONS----------------------->>

const generateRandomOtp = () => {
    // Generate a random number between 10000 and 99999
    const otp = Math.floor(Math.random() * 90000) + 10000;
    return otp.toString();
}

const sendMail = async (email) => {
    try {

        const otp = generateRandomOtp();

        const createdOtp = await Otp.create(
            {
                email,
                otp,
                expiresIn: new Date() + 5 * 60 * 1000 // 5 minutes
            }
        );

        const subject = "Verify your Email"

        // send otp
        const mailRes = await mailSender(email, subject, otp);

        if (!mailRes) {
            return false;
        }

        return true;

    } catch (error) {

        console.log("Error when send mail: ", error);
        return false;

    }
}

const generateRefreshAndAccessToken = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        return null;
    }

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
}



// CONTROLLERS-------------------------------->>

export const signup = async (req, res) => {
    try {

        //  fetched data from body
        const {
            email,
            userName,
            fullName,
            password,
        } = req.body;

        // validation
        if (!email || !password || !userName || !fullName) {
            return res.status(401).json(
                {
                    success: false,
                    data: null,
                    mesage: "All fields are required"
                }
            )
        }

        // check user is exist or not with email or username
        const existedUser = await User.findOne(
            {
                $or: [{ email }, { userName }]
            }
        );

        // user exist with isVerified as false
        if (existedUser && !existedUser?.isVerified) {
            return res.status(301).json(
                {
                    success: false,
                    data: email,
                    mesage: "User is already exist with email or , Please verify your email",
                }
            )
        }

        // user exist with isVerified as true
        if (existedUser && existedUser?.isVerified) {
            return res.status(401).json(
                {
                    success: false,
                    data: null,
                    mesage: "User is already exist with email or username"
                }
            )
        }

        // hashed the password
        const hashedPass = await bcrypt.hash(password, 10);

        // GenerateRandomOtp and send otp through email
        const mailResult = await sendMail(email);

        if (!mailResult) {
            return res.status(500).json(
                {
                    success: false,
                    data: null,
                    mesage: "Mail failed"
                }
            )
        }

        console.log("mailResult: ", mailResult);

        const createdUser = await User.create(
            {
                email,
                userName,
                fullName,
                password: hashedPass
            }
        );

        if (!createdUser) {
            return res.status(501).json(
                {
                    success: false,
                    data: null,
                    mesage: "Server failed to register the user,try again later",
                }
            )
        }

        return res.status(201).json(
            {
                success: true,
                data: null,
                mesage: "User registed successfully"
            }
        )

    } catch (error) {
        return res.status(501).json(
            {
                success: false,
                data: null,
                mesage: "Server failed to register the user,try again later",
                error: error.message
            }
        )
    }
}


export const verifyOtp = async (req, res) => {
    try {

        const { otp, email } = req.body;

        // check user is exist or not with email
        const existedUser = await User.findOne({ email });

        // user not exist 
        if (!existedUser) {
            return res.status(404).json(
                {
                    success: false,
                    data: null,
                    mesage: "User not exist with this email, Please signup first",
                }
            )
        }

        // find the latest otp
        const latestOtp = await Otp.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);

        // verify the otp
        if (!latestOtp) {
            return res.status(404).json(
                {
                    success: false,
                    data: null,
                    mesage: "Otp is not found",
                }
            )
        }

        // verify the otp
        if (otp !== latestOtp[0].otp) {
            return res.status(400).json(
                {
                    success: false,
                    data: null,
                    mesage: "Otp is not correct",
                }
            )
        }

        // et isVerified as true
        existedUser.isVerified = true;

        // save the changes in db
        await existedUser.save();


        return res.status(201).json(
            {
                success: true,
                data: null,
                mesage: "Your email has been verified,Please login",
            }
        );

    } catch (error) {
        return res.status(501).json(
            {
                success: false,
                data: null,
                mesage: "Server failed to verify otp ,try again later",
                error: error.message
            }
        )
    }
}


export const login = async (req, res) => {
    try {

        const {
            emailOrUsername,
            password
        } = req.body;

        // validation the fields
        if (!emailOrUsername || !password) {
            return res.status(404).json(
                {
                    success: false,
                    data: null,
                    mesage: "All fields are required",
                }
            )
        }

        // check user is exist or not
        const existedUser = await User.findOne(
            {
                $or: [{ email: emailOrUsername }, { userName: emailOrUsername }]
            }
        );

        // if not
        if (!existedUser) {
            return res.status(404).json(
                {
                    success: false,
                    data: null,
                    mesage: "User not registered with us, please signup first",
                }
            )
        }

        // check user is verified or not
        if (existedUser && !existedUser.isVerified) {
            return res.status(401).json(
                {
                    success: false,
                    data: null,
                    mesage: "User is not verified,Please verify your email",
                }
            )
        }

        // verify password
        const comparedPass = await bcrypt.compare(password, existedUser.password);

        // if not
        if (!comparedPass) {
            return res.status(409).json(
                {
                    success: false,
                    data: null,
                    mesage: "Password is incorrect",
                }
            )
        }

        // create token
        const { refreshToken, accessToken } = await
            generateRefreshAndAccessToken(existedUser._id);


        const loggedInUser = await User
            .findById(existedUser._id)
            .select("-password -refreshToken");


        // send cookies
        const options = {
            httpOnly: true,
            secure: true,
            expiresIn: new Date() + 24 * 60 * 20 * 1000 //24 hours
        };

        // send response
        res
            .status(200)
            .cookie("TwitterAccessToken", accessToken, options)
            .cookie("TwitterRefreshToken", refreshToken, options)
            .json(
                {
                    success: true,
                    data: { loggedInUser, accessToken, refreshToken },
                    mesage: "User logged in successfully",
                }
            );

    } catch (error) {
        return res.status(501).json(
            {
                success: false,
                data: null,
                mesage: "Server failed to login the user ,try again later",
                error: error.message
            }
        )
    }
}


export const logout = async (req, res) => {
    try {

        const userId = req.user.id;

        return res.status(201).json(
            {
                success: true,
                data: null,
                mesage: "Server failed ,try again later",
            }
        )

    } catch (error) {
        return res.status(501).json(
            {
                success: false,
                data: null,
                mesage: "Server failed to ,try again later",
                error: error.message
            }
        )
    }
}


export const forgotPassword = async (req, res) => {
    try {

        return res.status(201).json(
            {
                success: true,
                data: null,
                mesage: "Server failed ,try again later",
            }
        )

    } catch (error) {
        return res.status(501).json(
            {
                success: false,
                data: null,
                mesage: "Server failed to ,try again later",
                error: error.message
            }
        )
    }
}





