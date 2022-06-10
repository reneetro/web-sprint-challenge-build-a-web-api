// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');
const { validateProjectId, validatePost } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => { 
            res.status(200).json(projects);
        })
        .catch(err =>  next(err));
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
})

router.post('/', validatePost, (req, res, next)=> {
    Project.insert(req.project)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => next(err));
})

router.put('/:id', validateProjectId, validatePost, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(err => next(err));
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    const toBeDeleted = req.project;
    Project.remove(req.params.id)
        .then(result => {
            res.status(200).json(toBeDeleted)
        })
        .catch(err => next(err));
})
module.exports = router;