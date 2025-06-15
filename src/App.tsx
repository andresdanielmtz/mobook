import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./Router";
import Footer from "@/components/Footer.tsx";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <AppRouter />
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              closeOnClick
              theme="colored"
              hideProgressBar
              draggable
            />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
