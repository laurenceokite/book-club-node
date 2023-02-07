import { Router } from "express";
const router = Router();

router.use((req, res) => {
    res.status(404).end();
});

export default router;