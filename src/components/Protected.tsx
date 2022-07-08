import { PropsWithChildren, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function Protected(props: PropsWithChildren<unknown>): ReactElement {
  const { children } = props;
  const location = useLocation();

  // If we're not logged in, navigate to the auth page
  if (localStorage.getItem('ala-auth-token')) {
    // currentUser === null
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  // Otherwise, render the component
  return children as ReactElement;
}

export default Protected;
