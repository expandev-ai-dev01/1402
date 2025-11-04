/**
 * @page HomePage
 * @summary Home page - welcome screen
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
export const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">TODO List</h1>
        <p className="text-xl text-gray-600 mb-8">Sistema de Gerenciamento de Tarefas</p>
        <div className="space-y-4">
          <p className="text-gray-500">Bem-vindo ao seu gerenciador de tarefas!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
