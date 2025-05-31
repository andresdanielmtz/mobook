import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./Router";
import Footer from "@/components/Footer.tsx";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
