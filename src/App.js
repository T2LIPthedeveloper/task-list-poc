import { Provider } from "./components/ui/provider";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
