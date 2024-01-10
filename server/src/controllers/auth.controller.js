import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import { createAccessToken } from '../libs/jwt.js'
import md5 from 'md5'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' })
        const isValidPassword = await bcrypt.compare(password, result.rows[0].password)
        if (!isValidPassword) return res.status(400).json({ message: 'Invalid password' })
        const token = await createAccessToken({ id: result.rows[0].id })
        res.cookie('token', token, {
            // httpOnly: true, // JS cannot access the cookie
            secure: true, // see the cookie in the browser
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        return res.status(200).json(result.rows[0])
    } catch (error) {

    }
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`
        const result = await pool.query('INSERT INTO users (name, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, gravatar])
        const token = await createAccessToken({ id: result.rows[0].id })

        // Save token in cookie
        res.cookie('token', token, {
            httpOnly: true, // JS cannot access the cookie
            secure: true,  // see the cookie in the browser
            sameSite: 'none', // domains that can access the cookie
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(201).json(result.rows[0])
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'User already exists' })
        }
        next(error)
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId])
    return res.status(200).json(result.rows[0])
}