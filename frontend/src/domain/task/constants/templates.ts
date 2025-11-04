/**
 * @constants TaskTemplates
 * @summary Predefined task templates configuration
 * @domain task
 * @category constants
 */

import type { TaskTemplate, TaskFormData } from '../types';

export interface TemplateConfig {
  id: TaskTemplate;
  name: string;
  description: string;
  defaults: Partial<TaskFormData>;
}

export const TASK_TEMPLATES: TemplateConfig[] = [
  {
    id: 'reunião',
    name: 'Reunião',
    description: 'Template para reuniões',
    defaults: {
      title: 'Reunião: ',
      description: 'Pauta:\n\nParticipantes:\n',
      priority: 'média',
    },
  },
  {
    id: 'projeto',
    name: 'Projeto',
    description: 'Template para projetos',
    defaults: {
      title: 'Projeto: ',
      description: 'Objetivos:\n\nEtapas:\n',
      priority: 'alta',
    },
  },
  {
    id: 'lembrete',
    name: 'Lembrete',
    description: 'Template para lembretes',
    defaults: {
      title: 'Lembrete: ',
      description: '',
      priority: 'baixa',
    },
  },
  {
    id: 'compra',
    name: 'Compra',
    description: 'Template para compras',
    defaults: {
      title: 'Comprar: ',
      description: 'Local:\n\nQuantidade:\n',
      priority: 'média',
    },
  },
];
