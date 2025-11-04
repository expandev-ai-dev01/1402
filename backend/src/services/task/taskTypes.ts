/**
 * @summary Task type definitions
 * @module services/task/types
 */

/**
 * @interface TaskEntity
 * @description Represents a task entity in the system
 *
 * @property {number} id - Unique task identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idUser - User identifier who created the task
 * @property {string} title - Task title
 * @property {string | null} description - Task description
 * @property {string | null} dueDate - Due date in ISO format
 * @property {string | null} dueTime - Due time in HH:MM format
 * @property {TaskPriority} priority - Task priority level
 * @property {TaskStatus} status - Current task status
 * @property {RecurrenceType | null} recurrenceType - Type of recurrence
 * @property {number | null} recurrenceFrequency - Recurrence frequency
 * @property {string | null} recurrenceEndDate - End date for recurrence
 * @property {TemplateType | null} template - Template used
 * @property {string} dateCreated - Creation timestamp
 * @property {string} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface TaskEntity {
  id: number;
  idAccount: number;
  idUser: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  dueTime: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  recurrenceType: RecurrenceType | null;
  recurrenceFrequency: number | null;
  recurrenceEndDate: string | null;
  template: TemplateType | null;
  dateCreated: string;
  dateModified: string;
  deleted: boolean;
}

/**
 * @interface TaskCreateRequest
 * @description Request parameters for task creation
 */
export interface TaskCreateRequest {
  idAccount: number;
  idUser: number;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  dueTime?: string | null;
  priority: TaskPriority;
  recurrence?: {
    type: RecurrenceType;
    frequency: number;
    endDate?: string | null;
  } | null;
  template?: TemplateType | null;
}

/**
 * @type TaskPriority
 * @description Task priority levels
 */
export type TaskPriority = 'alta' | 'média' | 'baixa';

/**
 * @type TaskStatus
 * @description Task status values
 */
export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';

/**
 * @type RecurrenceType
 * @description Recurrence type options
 */
export type RecurrenceType = 'diária' | 'semanal' | 'mensal' | 'anual';

/**
 * @type TemplateType
 * @description Template type options
 */
export type TemplateType = 'reunião' | 'projeto' | 'lembrete' | 'compra' | 'personalizado';
