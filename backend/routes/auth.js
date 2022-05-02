const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const express = require('express');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetchData = require('../middleware/fetchData');
const multer = require('multer');
const path = require("path");


router.get('/', (request, response) => {
    object = {
        name: "john",
        surname: "doe",
        age: 18
    }
    response.json(object)
})

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (request, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
});
// Route for create new user //
router.post('/data', upload.single('file'), [
    body('name', 'name must be more than 3 character!').isLength({ min: 3 }),
    body('name', 'Too long Username ! please enter valid Username!').isLength({ max: 15 }),
    body('email', 'Enter valid email!').isEmail(),
    body('email', 'Enter valid email!').isLength({ min: 5 }),
    body('email', 'Too long email ! please enter valid email!').isLength({ max: 30 }),
    body('password', 'Password must be more than 6 character').isLength({ min: 6 }),
    body('password', 'Too long password ! please enter valid password!').isLength({ max: 20 }),
], async(request, response) => {

    // 1. show error message if input null //
    const data = {
        user: {
            id: User.id
        }
    }
    const JWT_SECRET = 'sujit';
    const errors = validationResult(request);
    const token = jwt.sign(data, JWT_SECRET);
    console.log("Token: " + token)

    var salt = await bcryptjs.genSalt(10);
    const password = await bcryptjs.hash(request.body.password, salt);

    if (!errors.isEmpty()) {
        console.log("empty?" + !errors.isEmpty());
        return response.status(400).json({ error: errors.array() });
    }

    // show error message if email is already exist //
    let email = await User.findOne({ email: request.body.email });
    if (email) {
        return response.status(400).json({ error: "email is already exist" });
    }


    // upload.single('file')
    User.create({
        name: request.body.name,
        email: request.body.email,
        password: password,
        avatar: `http://localhost:5000/profile/${request.file.filename}`
    });


    let status = true;
    let avatar_url = `http://localhost:5000/profile/${request.file.filename}`
    response.json({ status, token, avatar_url });
})

// 2. Route for authenticate user //
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
        // let image = await User.findOne({ avatar })
        console.log(user);


        // compare password using bcrypt //
        const comparePassword = await bcryptjs.compare(password, user.password);
        if (!comparePassword) {
            return response.status(400).json({ error: "password is not matched" });
        }

        // send users token //
        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SECRET = 'sujit';
        const token = jwt.sign(data, JWT_SECRET);
        let status = true;
        response.json({ status, token, user });

    } catch (error) {
        console.log(error.message);
        response.status(500).send("Some Error occures");
    }

})

// 3. route for get  particular users record  after login //

router.post('/getRecord', fetchData, async(request, response) => {
    try {
        let userId = request.user.id;
        console.log(userId);
        // without password all data //
        const user = await User.findById(userId).select("-password");
        // with password all data //
        // const user = await User.findById(userId); //
        response.send({ user });
    } catch (error) {
        console.log(error.message);
        response.status(500).send("Some Error occures");
    }
})

module.exports = router