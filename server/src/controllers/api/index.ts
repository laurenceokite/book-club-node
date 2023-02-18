import { Router } from "express";
import bookRoutes from './books'
import clubRoutes from './clubs'
import userRoutes from './users'

const router = Router();

router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);
router.use('/users', userRoutes);

router.use((req, res) => {
    res.status(404).end();
});

export default router;

