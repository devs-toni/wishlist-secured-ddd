import Cover from './componentes/Cover';
import { WishProvider } from './context/WishContext';
import Router from './router/Router';

function App() {
  return (
    <>
      <Cover />
      <WishProvider>
          <Router />
      </WishProvider>
    </>
  );
}

export default App;
