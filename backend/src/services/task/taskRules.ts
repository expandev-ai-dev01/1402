/**
 * @summary Task business logic and operations
 * @module services/task
 */

import { TaskCreateRequest, TaskEntity } from './taskTypes';

/**
 * @summary Creates a new task
 * @function taskCreate
 *
 * @param {TaskCreateRequest} params - Task creation parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number} params.idUser - User identifier
 * @param {string} params.title - Task title
 * @param {string} [params.description] - Task description
 * @param {string} [params.dueDate] - Due date
 * @param {string} [params.dueTime] - Due time
 * @param {string} params.priority - Priority level
 * @param {object} [params.recurrence] - Recurrence configuration
 * @param {string} [params.template] - Template type
 *
 * @returns {Promise<TaskEntity>} Created task entity
 *
 * @throws {ValidationError} When parameters fail validation
 * @throws {BusinessRuleError} When business rules are violated
 */
export async function taskCreate(params: TaskCreateRequest): Promise<TaskEntity> {
  /**
   * @remarks In-memory storage implementation
   * Real implementation would call database stored procedure
   */
  const tasks: TaskEntity[] = [];

  const newTask: TaskEntity = {
    id: tasks.length + 1,
    idAccount: params.idAccount,
    idUser: params.idUser,
    title: params.title,
    description: params.description || null,
    dueDate: params.dueDate || null,
    dueTime: params.dueTime || null,
    priority: params.priority,
    status: 'pendente',
    recurrenceType: params.recurrence?.type || null,
    recurrenceFrequency: params.recurrence?.frequency || null,
    recurrenceEndDate: params.recurrence?.endDate || null,
    template: params.template || null,
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    deleted: false,
  };

  tasks.push(newTask);

  return newTask;
}

/**
 * @summary Lists all tasks for an account
 * @function taskList
 *
 * @param {object} params - List parameters
 * @param {number} params.idAccount - Account identifier
 *
 * @returns {Promise<TaskEntity[]>} List of tasks
 */
export async function taskList(params: { idAccount: number }): Promise<TaskEntity[]> {
  /**
   * @remarks In-memory storage implementation
   * Real implementation would call database stored procedure
   */
  const tasks: TaskEntity[] = [];

  return tasks.filter((task) => task.idAccount === params.idAccount && !task.deleted);
}
