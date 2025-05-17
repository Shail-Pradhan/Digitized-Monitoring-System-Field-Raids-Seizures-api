import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import {
    createSeizure,
    getSeizures,
    getSeizureById,
    updateSeizure,
    deleteSeizure,
    addSeizureMemo
} from '../controllers/seizureController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// All routes require user verification
router.post('/', verifyToken, createSeizure);
router.post('/:id/memo', upload.single('memo'), addSeizureMemo);
router.get('/', verifyToken, getSeizures);
router.get('/:id', verifyToken, getSeizureById);
router.put('/:id', verifyToken, updateSeizure);
router.delete('/:id', verifyToken, deleteSeizure);

export default router;