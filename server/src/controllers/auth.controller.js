import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import { createAccessToken } from '../libs/jwt.js'

export const signin = async (req, res) => res.send('signin')

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword])
        const token = await createAccessToken({ id: result.rows[0].id })
        return res.status(201).json({ token })
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'User already exists' })
        }
    }
}

export const logout = async (req, res) => res.send('logout')

export const profile = async (req, res) => res.send('profile')