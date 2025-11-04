/**
 * @types Task
 * @summary Type definitions for task domain
 * @domain task
 * @category types
 */

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  priority: 'alta' | 'média' | 'baixa';
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';
  recurrence?: TaskRecurrence;
  template?: TaskTemplate;
  dateCreated: string;
  userId: string;
}

export interface TaskRecurrence {
  type: 'diária' | 'semanal' | 'mensal' | 'anual';
  frequency: number;
  endDate?: string;
}

export type TaskTemplate = 'reunião' | 'projeto' | 'lembrete' | 'compra' | 'personalizado';

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  priority: 'alta' | 'média' | 'baixa';
  recurrence?: TaskRecurrence;
  template?: TaskTemplate;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'alta' | 'média' | 'baixa';
  recurrence: {
    enabled: boolean;
    type: 'diária' | 'semanal' | 'mensal' | 'anual';
    frequency: number;
    endDate: string;
  };
  template: TaskTemplate | '';
}
