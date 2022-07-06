import { BrowserRouter } from 'react-router-dom';

// Routes
import Routes from './routes';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
