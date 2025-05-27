import { Button } from "@/components/ui/button";
import { auth } from "@/config/firebase";
import { signInWithGoogle } from "@/services/authenticationServices";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
      return resp.user.uid;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch {
      console.error("Google sign-in failed");
    }
  };

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
              placeholder="******************"
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
