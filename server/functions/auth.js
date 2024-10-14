const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const keyForJwt = 'votreCléSecrète';
const cryptMdp = (mdp) => {

    let mdpcrypt = '';
    const hashSHA256 = crypto.createHash('sha256');
    hashSHA256.update(mdp);
    mdpcrypt = hashSHA256.digest('hex');

    return mdpcrypt;
}


function generateToken(payload) {
    const secretKey = keyForJwt;
    const token = jwt.sign(payload, secretKey);
    return token;
}

function verifyToken(token) {
    const secretKey = keyForJwt;
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}

function verifyTokenMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
        req.user = decoded;
        next();
    } else {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { generateToken, verifyTokenMiddleware, cryptMdp };