/**
 * @service taskService
 * @summary Task management service for authenticated endpoints
 * @domain task
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/task/...
 *
 * Authentication token is automatically added by interceptor.
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Task, CreateTaskDto } from '../types';

export const taskService = {
  /**
   * @endpoint GET /api/v1/internal/task
   * @summary Fetches list of tasks
   */
  async list(): Promise<Task[]> {
    const response = await authenticatedClient.get('/task');
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/task
   * @summary Creates new task
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await authenticatedClient.post('/task', data);
    return response.data.data;
  },
};
