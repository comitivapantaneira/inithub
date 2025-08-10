import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
//import Home from "./pages/Home";
import Header from "./components/Header";
//import CreateIniciative from "./components/CreateIniciative";

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
              <h1>home</h1>
            </LayoutWithHeader>
          }
        />

        <Route
          path="/my-initiatives"
          element={
            <LayoutWithHeader>
              <h1>Minhas Iniciativas</h1>
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
              <h1>create inicia</h1>
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
