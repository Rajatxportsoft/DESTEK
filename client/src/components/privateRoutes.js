import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth(); 

  return isLoggedIn() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
