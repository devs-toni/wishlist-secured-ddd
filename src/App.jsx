import Cover from './componentes/Cover';
import { TaskProvider } from './context/TaskContext';
import Router from './router/Router';

function App() {
  return (
    <>
      <Cover />
      <TaskProvider>
          <Router />
      </TaskProvider>
    </>
  );
}

export default App;
