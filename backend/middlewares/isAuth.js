const { log } = require('console');
const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {

    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    const verifyTokern = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded
        }


    })
    if (verifyTokern) {
        req.user = verifyTokern.id;
        next();
    }
    else {
        const err = new Error("Tokern expired, login again")
        next(err)
    }

}

module.exports = isAuth