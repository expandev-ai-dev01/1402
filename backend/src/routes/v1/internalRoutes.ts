/**
 * @summary Internal API routes configuration
 * @module routes/v1/internal
 */

import { Router } from 'express';
import * as taskController from '@/api/v1/internal/task/controller';

const router = Router();

/**
 * @summary Task routes
 */
router.post('/task', taskController.postHandler);
router.get('/task', taskController.getHandler);

export default router;
