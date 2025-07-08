import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from './UseUser';

interface RouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({children}: RouteProps) => {
    const {user, isLoading} = useUser();
    if(isLoading){
        return <div>Loading...</div>
    }
    if (!user) {
    return <Navigate to="/" replace />;
    }
  return children;
}

export const PublicRoute = ({children}: RouteProps) =>{
    const {user, isLoading} = useUser();
    if (isLoading) {
        return <div>Loading...</div>;
        }
    if(user) {
        return <Navigate to="/me" replace />;
    }
    return children
}

