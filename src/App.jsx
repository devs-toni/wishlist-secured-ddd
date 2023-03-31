import { AuthProvider } from './context/AuthContext';
import { WishProvider } from './context/WishContext';
import Router from './router/Router';

function App() {
  return (
    <AuthProvider>
      <WishProvider>
        <Router />
      </WishProvider>
    </AuthProvider>
  );
}

export default App;
