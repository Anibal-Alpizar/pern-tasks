import { Router } from 'express';

const router = Router();

router.post('/signin', (req, res) => res.json({ message: "Sign In" }))
router.post('/signup', (req, res) => res.json({ message: "Sign Up" }))
router.post('/signout', (req, res) => res.json({ message: "Sign Out" }))
router.get('/profile', (req, res) => res.json({ message: "Profile" }))

export default router;
