const pool = require('../db')

const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM usuario')
        console.log(allTasks)
        res.json(allTasks.rows);
    }catch (error) {
        next(error);
    }


}

const getTask = async (req, res, next) => {
    const {id} = req.params

    const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({
        message: 'usuario no existe'
    })
    console.log(result)
    res.json(result.rows[0]);
}

const createTask = async (req, res, next) => {
    const {_name, age, email} = req.body
    
    try {
    const result = await pool.query('INSERT INTO usuario (_name, age, email) VALUES ($1, $2, $3) RETURNING *',
        [_name, age, email]
    );

    res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteTasks = async (req, res, next) => {
    const {id} = req.params
    const result = await pool.query('DELETE FROM usuario WHERE id = $1',[id])
    if (result.rowCount === 0) return res.status(404).json({
        message: "no se elimino un usuario"
    })
    return res.sendStatus(204)   
}
const updateTasks = async (req, res, next) => {
    const {id} = req.params;
    const {_name, age, email} = req.body;
    const result = await pool.query(
        'UPDATE usuario SET _name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *',
        [_name, age, email, id])
        if (result.rows.length === 0) return res.status(404).json({
            message: 'usuario no existe'
        })
    console.log(result)
    return res.json(result.rows[0])

}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTasks,
    updateTasks
}