const jwt = require("jsonwebtoken");
const db = require("../../models")

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(500).send("Invalid Token")
    }
    try {
        token = token.split(" ")[1];
        if(token === "null" || !token){
            return res.status(500).send("Access Denied")
        }
        let verifiedUser = jwt.verify(token, process.env.JWT_KEY)
        if(!verifiedUser){
            return res.status(500).send("Unathorized request")
        }
        req.user = verifiedUser;
        console.log("ini apa?",req.user);
        next();
    } catch (error) {
        return res.status(500).send("Invalid Token")
    }
}

module.exports = {verifyToken}