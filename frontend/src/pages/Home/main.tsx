/**
 * @page HomePage
 * @summary Home page - welcome screen with navigation to task creation
 * @domain core
 * @type page-component
 * @category public
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 * - Guards: none
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">TODO List</h1>
        <p className="text-xl text-gray-600 mb-8">Sistema de Gerenciamento de Tarefas</p>
        <div className="space-y-4">
          <p className="text-gray-500">Bem-vindo ao seu gerenciador de tarefas!</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/tasks/create')}>
            Criar Nova Tarefa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
