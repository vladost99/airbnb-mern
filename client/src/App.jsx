import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/user.context";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/account/:subpage?"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
