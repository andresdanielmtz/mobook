// Not Found View
// This view is used to show a 404 error when the user tries to access a page that does not exist.

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Button onClick={() => navigate("/")}> Return to Home</Button>
      </div>
    </div>
  );
};
export default NotFoundView;
