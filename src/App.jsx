import Cover from './componentes/Cover';
import Main from './componentes/Main';
import { WishProvider } from './context/WishContext';

function App() {
  return (
    <>
      <Cover />
      <WishProvider>
        <Main />
      </WishProvider>
    </>
  );
}

export default App;
