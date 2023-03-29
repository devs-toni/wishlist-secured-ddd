import { Cover } from './componentes/index';
import { TaskProvider } from './context/TaskContext';
import Router from './router/Router';

function App() {
  return (
    <>
      <TaskProvider>
          <Router />
      </TaskProvider>
    </>
  );
}

export default App;
