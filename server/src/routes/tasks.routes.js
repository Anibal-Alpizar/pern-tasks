import { Router } from "express"

const router = Router()

router.get('/tasks', (req, res) => res.send('getting tasks'))
router.get('/tasks/:id', (req, res) => res.send('getting an task'))
router.post('/tasks', (req, res) => res.send('creating a task'))
router.put('/tasks/:id', (req, res) => res.send('updating a task'))
router.delete('/tasks/:id', (req, res) => res.send('deleting a task'))

export default router