const express = require('express');
const router = express.Router();
const fetchData = require('../middleware/fetchData');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/', (request, response) => {
    object = {
        name: "this is notes object",
        status: true
    }
    response.json(object)
})

// Route for get all notes for particular user //
router.get('/list', fetchData, async(request, response) => {
    const allNotes = await Notes.find({ user: request.user.id })
    response.json(allNotes);
})

// Route for add new note //
router.post('/addnote', fetchData, [
    body('title', 'Enter valid title!').isLength({ min: 3 }),
], async(request, response) => {
    try {
        const { title, description, tag } = request.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: request.user.id
        })
        const savedNote = await note.save()
        response.json(savedNote)

    } catch (error) {
        console.error(error.message);
        response.status(500).send("Internal Server Error");
    }
})

//Route for Update exist note //
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

// Route for delete note //
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

module.exports = router