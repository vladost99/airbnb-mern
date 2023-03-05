import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { UserContextProvider } from "./context/user.context";
import { routes, RouteNotFound } from "./routes";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, routeInd) =>
            route.index ? (
              <Route
                key={routeInd + "_indexPage"}
                index
                element={route.element}
              />
            ) : (
              <Route
                key={route + `_${route.path}`}
                path={route.path}
                element={route.element}
              />
            )
          )}
        </Route>

        {RouteNotFound}
      </Routes>
    </UserContextProvider>
  );
}

export default App;
