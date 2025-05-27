import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/config/firebase";
import { validateEmail } from "@/utils/email";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpView: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // will use later

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      return resp.user.uid;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">
        Create an account.
      </h1>
      <div className="max-w-md mx-auto mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSignUp}
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

            {/** If email is invalid AND it is more than 0 */}
            {!validateEmail(email) && email.length > 0 ? (
              <Alert variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please, insert a valid email.
                </AlertDescription>
              </Alert>
            ) : (
              ""
            )}
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

            {password.length <= 6 && password.length > 0 ? (
              <Alert variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  La contraseña debe de ser de 6 caractéres mínimo.
                </AlertDescription>
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpView;
