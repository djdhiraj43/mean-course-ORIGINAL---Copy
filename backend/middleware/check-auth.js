const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    const token = req.headers.authorization.split(" ")[1]; //token has a word Bearer before the token by convention hence we are splitting it to extract the token
    jwt.verify(token, "vhsfkfhdjh346834743urv3rvrgdvfjhs");
    next();
    } catch (error) {
        res.status(401).json({message: "Auth failed!"});
    }
}