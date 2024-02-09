import Otp from "../models/otp.model";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import mailSender from "../models/mailSender.model";

const generateRandomOtp = () => {
    // Generate a random number between 10000 and 99999
    const otp = Math.floor(Math.random() * 90000) + 10000;
    return otp.toString();
}

const sendMail = async (email) => {
    try {

        const otp = generateRandomOtp();

        const createdOtp = Otp.create(
            {
                email,
                otp,
                expiresIn: new Date() + 5 * 60 * 1000 // 5 minutes
            }
        );

        subject = "Verify Email"

        const mailRes = await mailSender(email, subject, otp);

        console.log("mail: ", mailRes)

    } catch (error) {

    }
}

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

        if (existedUser) {
            return res.status(401).json(
                {
                    success: false,
                    mesage: "User is already exist with email or username"
                }
            )
        }

        // hashed the password
        const hashedPass = await bcrypt.hash(password, 10);

        // generateRandomOtp

        const otp = generateRandomOtp();

        // send email

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
                    mesage: "Server failed to register the user,try again later",
                }
            )
        }

        return res.status(201).json(
            {
                success: true,
                mesage: "User registed successfully"
            }
        )

    } catch (error) {
        return res.status(501).json(
            {
                success: false,
                mesage: "Server failed to register the user,try again later",
                error: error.message
            }
        )
    }
}


export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}


export const resetPassword = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const forgotPassword = async (req, res) => {
    try {

    } catch (error) {

    }
}


export const createOtp = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const verifyOtp = async (req, res) => {
    try {

    } catch (error) {

    }
}