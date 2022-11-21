import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

export const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
