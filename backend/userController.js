import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./UserSchema.js";
export const register = async (req, res) => {
    try {
        const {username, email, password, dateOfBirth} = req.body;
        if(!username || !email || !password || !dateOfBirth){
            return res.status(401).json({message: "Please fill in all fields.", success : false});
        }
        const existingUser = await User.findOne({email});
        const existingUser2 = await User.findOne({username});
        if(existingUser){
            return res.status(401).json({message: "Username already taken. Try something different", success : false});
        }
        if(existingUser2){
            return res.status(401).json({message: "Email already taken. Try something different", success : false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, dateOfBirth });
        return res.status(201).json({message:"User Registered Successfully", success:true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success : false});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({message: "Please fill in all fields.", success : false});
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid Email or Password", success : false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Email or Password", success : false});
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'});
        
        user = {
            user_id: user._id,
            fullName: user.username,
            email : user.email,
            roll_number : user.roll_number,
            dateOfBirth : user.dateOfBirth
        }

        return res.cookie('token', token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
            message: `Welcome Back ${user.username}`,
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success : false});
    }
}

export const logOut = async (req, res) => {
    try {
        return res.cookie('token',"",{maxAge:0}).json({
            message:"Logged Out Successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success : false});
    }
}