import { Router } from 'express';
import bookRouter from './book.routes';

const router = Router();

router.use('/books', bookRouter);

export default router;