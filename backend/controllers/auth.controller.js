import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../generateTokenAndSetCookie.js";

export const signup = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(404).send({ error: "Please fill all fields" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return response.status(404).send({ error: "You already have an account" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ email, password: hashedPassword });
        generateTokenAndSetCookie(newUser._id, response)
        response.status(201).send(newUser);
    } catch (error) {
        console.log(`Error in signup controller:${error.message}`);
        response.status(404).send({ error: "Internal Server Error" })
    }
};

export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(404).send({ error: "Please fill all fields" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send({ error: "You already have an account" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return response.status(404).send({ error: "Wrong password" })
        }

        // const newUser = await User.create({ email, password: hashedPassword });
        generateTokenAndSetCookie(user._id, response)
        response.status(201).send(user);
    } catch (error) {
        console.log(`Error in login controller:${error.message}`);
        response.status(404).send({ error: "Internal Server Error" })
    }
};
export const logout = async (request, response) => {
    try {
        response.cookie("jwt", "");
        response.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        console.log(`Error in logout controller:${error.message}`);
        response.status(404).send({ error: "Internal Server Error" })
    }
};