import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/pages/Login";
import CreateInitiative from "@/pages/CreateInitiative";
import CreateAccount from "@/pages/CreateAccount";
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import MyInitiatives from "@/pages/MyInitiatives";
import ProgressInitiative from "@/pages/ProgressInitiative";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import AdminRoute from "@/components/routing/AdminRoute";
import AdministratorDashboard from "@/pages/AdministratorDashboard";

function LayoutWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function LoginRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Login />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRoute />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <LayoutWithHeader>
                <Home />
              </LayoutWithHeader>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-initiatives"
          element={
            <ProtectedRoute>
              <LayoutWithHeader>
                <MyInitiatives />
              </LayoutWithHeader>
            </ProtectedRoute>
          }
        />

        <Route
          path="/initiatives/:id/progress"
          element={
            <ProtectedRoute>
              <LayoutWithHeader>
                <ProgressInitiative />
              </LayoutWithHeader>
            </ProtectedRoute>
          }
        />

        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <LayoutWithHeader>
                <h1>Notícias</h1>
              </LayoutWithHeader>
            </ProtectedRoute>
          }
        />

        <Route
          path="/screening"
          element={
            <AdminRoute>
              <LayoutWithHeader>
                <AdministratorDashboard />
              </LayoutWithHeader>
            </AdminRoute>
          }
        /> 

        <Route
          path="/create-initiative"
          element={
            <ProtectedRoute>
              <LayoutWithHeader>
                <CreateInitiative />
              </LayoutWithHeader>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-account"
          element={
            <CreateAccount />
          }
        />  
      </Routes>
    </Router>
  );
}
