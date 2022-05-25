import { Home } from './pages/Clients/Home';
import  { Router }  from './routes';

import GlobalStyles from './styles/global';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Home />
    </div>
  );
}

export default App;
