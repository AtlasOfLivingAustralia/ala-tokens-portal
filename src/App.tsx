import { BrowserRouter } from 'react-router-dom';

import {
  getRedirectResult,
  // eslint-disable-next-line import/no-relative-packages
} from '../../ala-web-auth/dist/index';

// Routes
import Routes from './routes';

function App(): React.ReactElement {
  getRedirectResult();

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
