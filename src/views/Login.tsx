import { Button } from "@/components/ui/button";
import {
  signInWithEmail,
  signInWithGoogle,
} from "@/services/authenticationServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await signInWithEmail(email, password);
      navigate("/");
      toast.success("Login successful");

      return resp.uid;
    } catch (e) {
      console.log(`Error: ${e}`);
      toast.error(
        "Could not log in. Please check your credentials and try again.",
      );
    }
  }

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Login successful");
    } catch {
      console.error("Google sign-in failed");
      toast.error("Google sign-in failed. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Login</h1>
      <div className="max-w-md mx-auto mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-md mt-1 mx-auto"
              type="submit"
            >
              Sign In
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className=" max-w-md mt-4 mx-auto"
          >
            {/*Uses Google Logo.
                      ?? Might be a good idea to get the logo from a proper icon website instead of hardcoding it from the internet.*/}
            <div className="flex items-center justify-center space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </div>
          </Button>
        </form>
      </div>

      <div className="flex flex-col">
        <Link to="/signup" className="text-blue-500 text-center">
          Don't have an account? Let's create one!
        </Link>
      </div>
    </div>
  );
};

export default LoginView;
