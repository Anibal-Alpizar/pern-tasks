import jwt from 'jsonwebtoken';

// the payload is the data that we want to store in the token
export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, 'xyz123', { expiresIn: '1d' },
            // Callback
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
    })
}