import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Quiz from "../components/pages/Quiz";
import Result from "../components/pages/Result";
import Signup from "../components/pages/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";



function App() {
  return (
  <>
    <AuthProvider>
      <Nav />
      <Layout> 
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/quiz/:id" element={<PrivateRoute><Quiz/></PrivateRoute>} />
            <Route path="/result/:id" element={<PrivateRoute><Result/></PrivateRoute>} />
          </Routes> 
      </Layout>
    </AuthProvider>
  </>
  );
}

export default App;
