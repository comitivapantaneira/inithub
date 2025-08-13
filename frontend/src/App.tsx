import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import CreateInitiative from "@/pages/CreateInitiative";
import CreateAccount from "@/pages/CreateAccount";
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import MyInitiatives from "@/pages/MyInitiatives";
import ProgressInitiative from "@/pages/ProgressInitiative";

function LayoutWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <LayoutWithHeader>
              <Home />
            </LayoutWithHeader>
          }
        />

        <Route
          path="/my-initiatives"
          element={
            <LayoutWithHeader>
              <MyInitiatives />
            </LayoutWithHeader>
          }
        />

        <Route
          path="/initiatives/:id/progress"
          element={
            <LayoutWithHeader>
              <ProgressInitiative />
            </LayoutWithHeader>
          }
        />


        <Route
          path="/news"
          element={
            <LayoutWithHeader>
              <h1>Notícias</h1>
            </LayoutWithHeader>
          }
        />

        <Route
          path="/screening"
          element={
            <LayoutWithHeader>
              <h1>Triagem</h1>
            </LayoutWithHeader>
          }
        /> 

        <Route
          path="/create-initiative"
          element={
            <LayoutWithHeader>
              <CreateInitiative />
            </LayoutWithHeader>
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
