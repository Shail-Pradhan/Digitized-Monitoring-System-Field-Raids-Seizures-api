import express from 'express';
import  verifyToken  from '../middlewares/authMiddleware.js';
const router = express.Router();
import authorizeRole from '../middlewares/roleMiddleware.js';

// admin can access this route
router.get('/admin', verifyToken , authorizeRole("admin"),(req, res) => {
    res.json({
        message: "Welcome Admin"});
});

// supervisor can access this route
router.get('/supervisor', verifyToken, authorizeRole("admin", "supervisor"), (req, res) => {
    res.json({
        message: "Welcome Supervisor"});
});

router.get('/user', verifyToken, authorizeRole("admin", "supervisor", "user"), (req, res) => {
    res.json({
        message: "Welcome User"});
});

export default router;