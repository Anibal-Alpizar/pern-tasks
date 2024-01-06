import { pool } from '../db.js'

export const getAllTasks = async (req, res, next) => {
    const result = await pool.query('SELECT * FROM task')
    return res.json(result.rows)
}

export const getTask = (req, res) => res.send('getting an task')

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
            return res.status(400).json('Task already exists')
        }
        next(error) // pass error to error handler
    }
}

export const updateTask = (req, res) => res.send('updating a task')

export const deleteTask = (req, res) => res.send('deleting a task')