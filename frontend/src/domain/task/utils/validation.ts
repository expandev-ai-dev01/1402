/**
 * @utils TaskValidation
 * @summary Validation utilities for task data
 * @domain task
 * @category utils
 */

import { z } from 'zod';

export const taskFormSchema = z
  .object({
    title: z
      .string()
      .min(3, 'O título deve ter pelo menos 3 caracteres')
      .max(100, 'O título deve ter no máximo 100 caracteres')
      .refine((val) => val.trim().length > 0, 'O título da tarefa é obrigatório'),
    description: z.string().max(1000, 'A descrição deve ter no máximo 1000 caracteres').optional(),
    dueDate: z.string().optional(),
    dueTime: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'O horário deve estar no formato HH:MM')
      .optional(),
    priority: z.enum(['alta', 'média', 'baixa'], {
      errorMap: () => ({ message: 'Selecione uma prioridade válida: alta, média ou baixa' }),
    }),
    recurrence: z
      .object({
        enabled: z.boolean(),
        type: z.enum(['diária', 'semanal', 'mensal', 'anual']),
        frequency: z
          .number()
          .int()
          .min(1, 'A frequência deve ser um número entre 1 e 30')
          .max(30, 'A frequência deve ser um número entre 1 e 30'),
        endDate: z.string().optional(),
      })
      .optional(),
    template: z.enum(['reunião', 'projeto', 'lembrete', 'compra', 'personalizado', '']).optional(),
  })
  .refine(
    (data) => {
      if (data.dueTime && !data.dueDate) {
        return false;
      }
      return true;
    },
    {
      message: 'É necessário definir uma data de vencimento para especificar o horário',
      path: ['dueTime'],
    }
  )
  .refine(
    (data) => {
      if (data.recurrence?.enabled && !data.dueDate) {
        return false;
      }
      return true;
    },
    {
      message: 'É necessário definir uma data de vencimento para tarefas recorrentes',
      path: ['dueDate'],
    }
  )
  .refine(
    (data) => {
      if (data.dueDate) {
        const dueDate = new Date(data.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (dueDate < today) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'A data de vencimento não pode ser anterior à data atual',
      path: ['dueDate'],
    }
  )
  .refine(
    (data) => {
      if (data.recurrence?.enabled && data.recurrence.endDate && data.dueDate) {
        const endDate = new Date(data.recurrence.endDate);
        const dueDate = new Date(data.dueDate);
        if (endDate <= dueDate) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'A data de fim de recorrência deve ser posterior à data de vencimento',
      path: ['recurrence', 'endDate'],
    }
  );

export type TaskFormSchema = z.infer<typeof taskFormSchema>;
