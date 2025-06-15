import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { registerWithEmailAndPassword } from "@/services/authServices";
import { validateEmail } from "@/utils/email";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignUpView: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate(); // will use later

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!confirmPassword || password !== confirmPassword) {
      console.error("Passwords do not match or confirm password is empty.");
      throw new Error("Passwords do not match or confirm password is empty.");
    }

    try {
      const resp = await registerWithEmailAndPassword(
        email,
        password,
        firstName,
        lastName,
      );

      if (!resp) return;

      // If the user is created successfully, we can redirect them to the home page
      navigate("/");
      toast.success("Sign up successfully");
    } catch (e) {
      console.error(e);
      toast.error("Could not sign up. Please try again.");
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
              className="block text-gray-700 text-sm font-bold"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-5"
              id="firstName"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-5"
              id="email"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-5"
              id="email"
              type="email"
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

            {password.length < 6 && password.length > 0 ? (
              <Alert variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Password should be at least 6 characters.
                </AlertDescription>
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="******************"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic">
              Please, confirm your password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-md mt-1 mx-auto"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col">
        <Link to="/login" className="text-blue-500 text-center">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
};
export default SignUpView;
