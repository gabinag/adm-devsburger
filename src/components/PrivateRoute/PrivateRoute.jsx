import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Carregando...</p>; 
  }

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
