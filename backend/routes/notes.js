const express = require('express');
const router = express.Router();
const fetchData = require('../middleware/fetchData');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const multer = require("multer");
const path = require("path");
// 1
db.expertise.insert({ clientImage: "https://www.softxsolution.com/assets/img/team/team-1.png", totalClients: 30, description: "Happy Clients" })

// 2
db.expertise.insert({ clientImage: "https://www.softxsolution.com/assets/img/team/team-1.png", totalClients: 38, description: "Projects" })

// 3
db.expertise.insert({ clientImage: "https://www.softxsolution.com/assets/img/team/team-1.png", totalClients: 1463, description: "7/24 Support" })

// 4
db.expertise.insert({ clientImage: "https://www.softxsolution.com/assets/img/team/team-1.png", totalClients: 2, description: "Hard Workers" })
router.get('/', (request, response) => {
    object = {
        name: "this is notes object",
        status: true
    }
    response.json(object)
})

// 1.  Route for get all notes for particular user //
router.get('/list', fetchData, async(request, response) => {
    const allNotes = await Notes.find({ user: request.user.id })
    response.json(allNotes);
})

// 2. Route for add new note //
router.post('/addnote', fetchData, [
    body('title', 'Title must be more than 3 characters').isLength({ min: 2 }),
    body('description', 'Description must be more than 3 characters').isLength({ min: 2 }),
    body('tag', 'tag must be more than 3 characters').isLength({ min: 2 }),
], async(request, response) => {
    try {
        const { title, description, tag } = request.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            console.log("40000")
            return response.status(404).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: request.user.id
        })
        const savedNote = await note.save()
        console.log(request.user.id);
        response.json(savedNote)

    } catch (error) {
        console.error(error.message);
        response.status(500).send("Internal Server Error");
    }
})

// 3. Route for Update exist note //
router.put('/updateNote/:id', [], fetchData, async(request, response) => {
    const { title, description, tag } = request.body;
    try {

        // Finds the validation errors in this request and wraps them in an object with handy functions //
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // create new note //
        let newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // find existing note and update it //
        let note = await Notes.findById(request.params.id);
        if (!note) { return response.status(404).send({ message: "Note Not Found" }) }

        if (note.user.toString() !== request.user.id) {
            return response.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(request.params.id, { $set: newNote }, { new: true })
        response.json({ note });

    } catch (error) {
        console.log(error.message);
        response.status(500).send("Internal server error");
    }
})

// 4.  Route for delete note //
router.delete('/deleteNote/:id', [], fetchData, async(request, response) => {
    try {

        // find note by id
        let note = await Notes.findById(request.params.id);
        if (!note) { return response.status(404).send({ message: "note not found" }) }

        if (note.user.toString() !== request.user.id) {
            return response.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(request.params.id)
        response.json({ "deleted": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error);
        return response.status(500).send("internal server error")
    }
})

// 5. Upload image
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})
router.post("/upload", upload.single('file'), (req, res) => {
    console.log("FILENAME::::" + req.file.filename);
    res.json({
        success: 1,
        name: req.file.filename,
        profile_url: `http://localhost:5000/profile/${req.file.filename}`,
    })
})

module.exports = router