import {
  Navigate,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      element={
        <Navigate
          to={{
            pathname: !!user ? "/" : "/home",
          }}
        ></Navigate>
      }
    />
  );
};

export default Route;
