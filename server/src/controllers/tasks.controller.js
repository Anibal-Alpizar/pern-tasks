import { pool } from '../db.js'

export const getAllTasks = async (req, res, next) => {
    const result = await pool.query('SELECT * FROM task')
    return res.json(result.rows)
}

export const getTask = async (req, res) => {
    const taskId = +(req.params.id)
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [taskId])

    if (result.rowCount === 0) {
        return res.status(404).json({ message: `Task ${taskId} not found` })
    }
    return res.json(rows[0])
}

export const createTask = async (req, res, next) => {
    const { title, description } = (req.body)
    try {
        // throw new Error('force error') // for testing error handling
        const result = await pool.query(
            'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
            [title, description],
        )
        res.json(result.rows[0])
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json('Task already exists')
        }
        next(error) // pass error to error handler
    }
}

export const updateTask = async (req, res) => {
    const { title, description } = req.body
    const taskId = +(req.params.id)
    const result = await pool.query(
        'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
        [title, description, taskId],
    )
    if (result.rowCount === 0) {
        return res.status(404).json({ message: `Task ${taskId} not found` })
    }
    return res.json(result.rows[0])
}

export const deleteTask = async (req, res) => {
    const taskId = +(req.params.id)
    const result = await pool.query('DELETE FROM task WHERE id = $1', [taskId])
    if (result.rowCount === 0) {
        return res.status(404).json({ message: `Task ${taskId} not found` })
    }
    return res.sendStatus(204)
}