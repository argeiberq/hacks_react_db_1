const { Router } = require("express");

const {getAllTasks,
    getTask,
    createTask,
    deleteTasks, 
    updateTasks} = require('../controllers/tasks.controllers')
const router = Router();

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);

router.delete('/tasks/:id', deleteTasks);

router.put('/tasks/:id', updateTasks);

module.exports = router;