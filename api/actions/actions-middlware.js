// add middlewares here related to actions
// add middlewares here related to projects
const Action = require('./actions-model');
const Project = require('../projects/projects-model');

function validateActionId(req, res, next) {
    // DO YOUR MAGIC
    Action.get(req.params.id)
      .then(action => {
        if(action == null){
          res.status(404).json({ message: 'action not found' });
          return;
        }
        req.action = action;
  
        next();
      })
      .catch(error => next(error));
  }

  function validateAction(req, res, next) {
      let {description, notes, completed, project_id} = req.body;
        if(typeof description !== 'string' || description.trim() === ''){
            res.status(400).json({ message: 'missing required description field'});
            return;
        }
        if(typeof notes !== 'string' || notes.trim() === ''){
            res.status(400).json({ message: 'missing required notes field'});
            return;
        }
        
        req.action = {description: description.trim(), notes: notes.trim(), completed: completed, project_id: project_id};

        next();
  }

  function validateProjectId(req, res, next) {
      Project.get()
        .then(projects => {
            const checkedProject = projects.filter(project => project.id === req.body.project_id);
            if(checkedProject.length === 1){
                return checkedProject;
            } else {
                res.status(404).json({ message: 'project not found'});
                return;
            }
        })
        next();
  }

  module.exports = {
      validateActionId,
      validateAction,
      validateProjectId
  }