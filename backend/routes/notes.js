const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { validationResult, body } = require('express-validator');

// ROUTE 1: Fetchallnotes route
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})

// ROUTE 2: Add New Notes
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Title length should be min 3 character'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const { title, description, tag } = req.body;

    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save();
        res.json(saveNotes);
    }
    catch (error) {
        res.status(500).send(error.errmsg);
    }
})

//ROUTE 3: updateNote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create new object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the node to be update
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("not found"); }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        res.status(500).send(error.errmsg);
    }

})

// ROUTE 4 : delete an existing note
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("not found"); }

        //allow user to delete
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "note has been deleted" });
    } catch (error) {
        res.status(500).send(error.errmsg);
    }
    //find the node to be delete and delete

})

module.exports = router;