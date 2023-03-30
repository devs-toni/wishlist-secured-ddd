import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Router from './router/Router';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
