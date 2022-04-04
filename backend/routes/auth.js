const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const express = require('express');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetchData = require('../middleware/fetchData');

router.get('/', (request, response) => {
    object = {
        name: "john",
        surname: "doe",
        age: 18
    }
    response.json(object)
})

// Route for create new user //
router.post('/data', [
    body('name', 'Enter valid name!').isLength({ min: 3 }),
    body('email', 'Enter valid email!').isEmail(),
    body('password', 'Password is less than 6 char').isLength({ min: 6 }),
], async(request, response) => {

    // show error message if input null //
    const data = {
        user: {
            id: User.id
        }
    }
    const JWT_SECRET = 'sujit';
    const errors = validationResult(request);
    const jwtData = jwt.sign(data, JWT_SECRET);
    console.log("Token: " + jwtData)

    var salt = await bcryptjs.genSalt(10);
    const password = await bcryptjs.hash(request.body.password, salt);

    if (!errors.isEmpty()) {
        console.log("empty?" + !errors.isEmpty());
        return response.status(400).json({ errors: errors.array() });
    }

    // show error message if email is already exist //
    let email = await User.findOne({ email: request.body.email });
    if (email) {
        return response.status(400).json({ errors: "email already exist" });
    }

    User.create({
        name: request.body.name,
        email: request.body.email,
        password: password,
    }).then(user => response.json(user));
})

// Route for authenticate user //
router.post('/login', [
    body('email', 'Enter valid email!').isEmail(),
    body('password', 'Password is less than 6 char').isLength({ min: 6 }),
], async(request, response) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions //
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    // get value of email and password from request using destructuring //
    const { email, password } = request.body;

    try {
        // check user is exist or not through email //
        let user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ error: "email is not exist" });
        }

        // compare password using bcrypt //
        const comparePassword = await bcryptjs.compare(password, user.password);
        if (!comparePassword) {
            return response.status(400).json({ error: "Please enter valid password" });
        }

        // send users token //
        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SECRET = 'sujit';
        const jwtData = jwt.sign(data, JWT_SECRET);
        response.json({ jwtData });

    } catch (error) {
        console.log(error.message);
        response.status(500).send("Some Error occures");
    }

})

// route for get  particular users record  after login //

router.post('/getRecord', fetchData, async(request, response) => {
    try {
        let userId = request.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        response.send({ user });
    } catch (error) {
        console.log(error.message);
        response.status(500).send("Some Error occures");
    }
})

module.exports = router