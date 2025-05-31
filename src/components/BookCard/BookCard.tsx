import type { ImageLinks } from "@/model";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";

// BookCard Component used to display a book's information in a card format.

interface ICard {
  imageLinks?: ImageLinks;
  title: string;
  id: string;
}

const BookCard = ({ imageLinks, title, id }: ICard) => {
  const navigate = useNavigate();

  return (
    <div
      tabIndex={0}
      className="aspect-3-4 sm:max-w-xs rounded-lg overflow-hidden relative group focus:outline-none cursor-pointer my-5 shadow hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
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
    </div>
  );
};

export default BookCard;
