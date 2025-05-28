import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./Router";
import Footer from "@/components/Footer.tsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
