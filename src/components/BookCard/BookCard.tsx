import type { ImageLinks } from "@/model";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

// BookCard Component used to display a book's information in a card format.

interface ICard {
  imageLinks?: ImageLinks;
  title: string;
  id: string;
  isUserList?: boolean;
  onRemove?: (id: string) => void;
  removeLabel?: string;
}

const BookCard = ({
  imageLinks,
  title,
  id,
  isUserList,
  onRemove,
  removeLabel,
}: ICard) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) {
    console.error("User is not authenticated.");
    return null; // or handle unauthenticated state appropriately
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(id);
    }
  };
  return (
    <div
      tabIndex={0}
      className={`bg-card text-card-foreground aspect-3-4 sm:max-w-xs rounded-lg overflow-hidden relative group focus:outline-none cursor-pointer my-5 shadow hover:shadow-lg transition-shadow duration-300  flex flex-col  w-full ${isUserList ? "h-[400px]" : "h-[350px]"}`}
      onClick={() => navigate(`/books/${id}`)}
    >
      <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
        {imageLinks ? (
          <img
            className="w-full h-full object-contain bg-gray-100"
            src={imageLinks.thumbnail}
            alt={title}
          />
        ) : (
          <p className="text-center text-gray-700 px-2 font-semibold">
            {title}
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 text-sm font-medium">
        {title}
      </div>

      {isUserList && (
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
          <Button
            variant="outline"
            size="icon"
            className="bg-white text-gray-800 hover:bg-gray-100"
            onClick={handleRemove}
            title={removeLabel}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
