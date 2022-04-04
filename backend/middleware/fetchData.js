const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sujit';

const fetchData = (request, response, next) => {
    // get all detail of usee from secret token through id //
    const token = request.header('token');
    if (!token) {
        response.status(401).send({ error: "invalid token" });
    }

    try {
        //compare token from header and actual
        const data = jwt.verify(token, JWT_SECRET);
        request.user = data.user;
        next();
    } catch (error) {
        response.status(401).send({ error: "token not match" });
    }
}

module.exports = fetchData;