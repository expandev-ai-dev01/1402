/**
 * @page TaskCreatePage
 * @summary Task creation page with comprehensive form
 * @domain task
 * @type form-page
 * @category task-management
 *
 * @routing
 * - Path: /tasks/create
 * - Params: none
 * - Query: none
 * - Guards: Authentication required
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Form with multiple fields
 *
 * @data
 * - Sources: Task creation API
 * - Loading: Form submission states
 */

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/core/components/Button';
import { useTaskCreate } from '@/domain/task/hooks/useTaskCreate';
import { taskFormSchema, type TaskFormSchema } from '@/domain/task/utils/validation';
import { TASK_TEMPLATES } from '@/domain/task/constants';
import type { TaskFormData } from '@/domain/task/types';

export const TaskCreatePage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      priority: 'média',
      recurrence: {
        enabled: false,
        type: 'diária',
        frequency: 1,
        endDate: '',
      },
      template: '',
    },
  });

  const { createTask, isCreating } = useTaskCreate({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (error: Error) => {
      alert(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  const selectedTemplate = watch('template');
  const recurrenceEnabled = watch('recurrence.enabled');

  const handleTemplateChange = (templateId: string) => {
    const template = TASK_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      if (template.defaults.title) setValue('title', template.defaults.title);
      if (template.defaults.description) setValue('description', template.defaults.description);
      if (template.defaults.priority) setValue('priority', template.defaults.priority);
    }
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      const payload: any = {
        title: data.title,
        priority: data.priority,
      };

      if (data.description) payload.description = data.description;
      if (data.dueDate) payload.dueDate = new Date(data.dueDate).toISOString();
      if (data.dueTime) payload.dueTime = data.dueTime;
      if (data.template) payload.template = data.template;

      if (data.recurrence.enabled) {
        payload.recurrence = {
          type: data.recurrence.type,
          frequency: data.recurrence.frequency,
        };
        if (data.recurrence.endDate) {
          payload.recurrence.endDate = new Date(data.recurrence.endDate).toISOString();
        }
      }

      await createTask(payload);
    } catch (error: unknown) {
      console.error('Error creating task:', error);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tarefa criada com sucesso!</h2>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Criar Nova Tarefa</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
                Template (opcional)
              </label>
              <select
                id="template"
                {...register('template')}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um template</option>
                {TASK_TEMPLATES.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} - {template.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Digite o título da tarefa"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Descreva os detalhes da tarefa"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Vencimento
                </label>
                <input
                  id="dueDate"
                  type="date"
                  {...register('dueDate')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dueDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  id="dueTime"
                  type="time"
                  {...register('dueTime')}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dueTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dueTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Prioridade <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                {...register('priority')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.priority ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
              )}
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center mb-4">
                <input
                  id="recurrence-enabled"
                  type="checkbox"
                  {...register('recurrence.enabled')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="recurrence-enabled"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Tarefa Recorrente
                </label>
              </div>

              {recurrenceEnabled && (
                <div className="space-y-4 pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="recurrence-type"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tipo de Recorrência
                      </label>
                      <select
                        id="recurrence-type"
                        {...register('recurrence.type')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="diária">Diária</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                        <option value="anual">Anual</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="recurrence-frequency"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Frequência
                      </label>
                      <input
                        id="recurrence-frequency"
                        type="number"
                        min="1"
                        max="30"
                        {...register('recurrence.frequency', { valueAsNumber: true })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.recurrence?.frequency ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.recurrence?.frequency && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.recurrence.frequency.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="recurrence-endDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Data de Término da Recorrência
                    </label>
                    <input
                      id="recurrence-endDate"
                      type="date"
                      {...register('recurrence.endDate')}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.recurrence?.endDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.recurrence?.endDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.recurrence.endDate.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit" variant="primary" fullWidth isLoading={isCreating}>
                Criar Tarefa
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
                disabled={isCreating}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCreatePage;
