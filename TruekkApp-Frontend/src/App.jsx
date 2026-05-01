import { Navigate, Route, Routes } from "react-router-dom";

import MainNavbar from "./components/layout/MainNavbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyServices from "./pages/MyServices";
import CreateService from "./pages/CreateService";
import ServiceDetail from "./pages/ServiceDetail";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import EditService from "./pages/EditService";
import UserProfile from "./pages/UserProfile";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";

import SavedServices from "./pages/SavedServices";

function App() {
  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      <MainNavbar />

      <main className="flex-grow-1">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services/:id" element={<ServiceDetail />} />

          {/* Usuario autenticado */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />

          <Route path="/users/:id" element={<UserProfile />} />

          <Route
            path="/my-services"
            element={
              <ProtectedRoute>
                <MyServices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-service"
            element={
              <ProtectedRoute>
                <CreateService />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-services"
            element={
              <ProtectedRoute>
                <SavedServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-service/:id"
            element={
              <ProtectedRoute>
                <EditService />
              </ProtectedRoute>
            }
          />

          {/* Solo ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
