/**
 * @summary Task CRUD operations controller
 * @module api/v1/internal/task
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import { taskCreate, taskList } from '@/services/task';

const securable = 'TASK';

/**
 * @summary Validation schema for task creation
 */
const createSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).nullable().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  dueTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .nullable()
    .optional(),
  priority: z.enum(['alta', 'média', 'baixa']),
  recurrence: z
    .object({
      type: z.enum(['diária', 'semanal', 'mensal', 'anual']),
      frequency: z.number().int().min(1).max(30),
      endDate: z.string().datetime().nullable().optional(),
    })
    .nullable()
    .optional(),
  template: z
    .enum(['reunião', 'projeto', 'lembrete', 'compra', 'personalizado'])
    .nullable()
    .optional(),
});

/**
 * @api {post} /api/v1/internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task with specified parameters
 *
 * @apiParam {String} title Task title (3-100 characters)
 * @apiParam {String} [description] Task description (max 1000 characters)
 * @apiParam {String} [dueDate] Due date in ISO format
 * @apiParam {String} [dueTime] Due time in HH:MM format
 * @apiParam {String} priority Priority level (alta, média, baixa)
 * @apiParam {Object} [recurrence] Recurrence configuration
 * @apiParam {String} [template] Template type
 *
 * @apiSuccess {Number} id Task identifier
 * @apiSuccess {String} title Task title
 * @apiSuccess {Date} dateCreated Creation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  const [validated, error] = await operation.create(req, createSchema);

  if (!validated) {
    return next(error);
  }

  try {
    /**
     * @validation Business rule validations
     * @rule {be-business-rule-validation} Validate business constraints
     */
    if (validated.params.dueTime && !validated.params.dueDate) {
      res.status(400).json(errorResponse('dueDateRequiredWhenTimeProvided'));
      return;
    }

    if (validated.params.recurrence && !validated.params.dueDate) {
      res.status(400).json(errorResponse('dueDateRequiredForRecurrence'));
      return;
    }

    if (
      validated.params.recurrence?.endDate &&
      validated.params.dueDate &&
      new Date(validated.params.recurrence.endDate) <= new Date(validated.params.dueDate)
    ) {
      res.status(400).json(errorResponse('recurrenceEndDateMustBeAfterDueDate'));
      return;
    }

    if (validated.params.dueDate && new Date(validated.params.dueDate) < new Date()) {
      res.status(400).json(errorResponse('dueDateCannotBeInPast'));
      return;
    }

    const data = await taskCreate({
      ...validated.credential,
      ...validated.params,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}

/**
 * @api {get} /api/v1/internal/task List Tasks
 * @apiName ListTasks
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all tasks for the authenticated user
 *
 * @apiSuccess {Array} tasks List of tasks
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const [validated, error] = await operation.list(req);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskList({
      ...validated.credential,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    next(StatusGeneralError);
  }
}
