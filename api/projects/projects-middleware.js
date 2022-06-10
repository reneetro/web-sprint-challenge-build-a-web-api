// add middlewares here related to projects
const Project = require('./projects-model');

function validateProjectId(req, res, next) {
    // DO YOUR MAGIC
    Project.get(req.params.id)
      .then(project => {
        if(project == null){
          res.status(404).json({ message: 'project not found' });
          return;
        }
        req.project = project;
  
        next();
      })
      .catch(error => next(error));
  }

  function validatePost(req, res, next) {
      let {name, description, completed} = req.body;
        if(typeof name !== 'string' || name.trim() === ''){
            res.status(400).json({ message: 'missing required name field'});
            return;
        }
        if(typeof description !== 'string' || description.trim() === ''){
            res.status(400).json({ message: 'missing required description field'});
            return;
        }
        if(typeof completed !== 'boolean'){
            res.status(400).json({ message: 'missing required completed field'});
        }

        req.project = {name: name.trim(), description: description.trim(), completed: completed};

        next();
  }

  module.exports = {
      validateProjectId,
      validatePost
  }