import { Routes as Router, Route, Navigate } from 'react-router-dom';

// Import routes
import Auth from './Auth';

// Route helpers
import Protected from '../components/Protected';

function Routes(): JSX.Element {
  return (
    <Router>
      <Route
        path="/protected/*"
        element={
          <Protected>
            <div>Protected Route</div>
          </Protected>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Router>
  );
}

export default Routes;
