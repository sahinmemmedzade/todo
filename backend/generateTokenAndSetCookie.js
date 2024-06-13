import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (id, response) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    response.cookie("jwt", token);
}