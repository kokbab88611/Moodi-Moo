import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from './UseUser';

interface privateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({children}: privateRouteProps) => {
    const {user, isLoading} = useUser();
    if(isLoading){
        return <div>Loading...</div>
    }
    if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;