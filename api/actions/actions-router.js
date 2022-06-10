// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model');

const { validateActionId, validateAction, validateProjectId } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => { 
            res.status(200).json(actions);
        })
        .catch(err =>  next(err));
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
})

router.post('/', validateProjectId, validateAction, (req, res, next) => {
    Action.insert(req.action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => next(err));
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction);
        })
        .catch(err => next(err));
})

router.delete('/:id', validateActionId, (req, res, next) => {
    const toBeDeleted = req.action;
    Action.remove(req.params.id)
        .then(result => {
            res.status(200).json(toBeDeleted)
        })
        .catch(err => next(err));
})


module.exports = router;

