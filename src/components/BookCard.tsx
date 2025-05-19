import type { ImageLinks } from "@/model";

interface ICard {
  imageLinks?: ImageLinks;
  title: string;
}

const BookCard = ({ imageLinks, title }: ICard) => {
  return (
    <div
      key={title}
      tabIndex={0}
      className="w-48 rounded overflow-hidden relative group focus:outline-none cursor-pointer my-5"
    >
      {!imageLinks ? (
        <div className="w-full h-48 object-contain content-center justify-items-center bg-gray-300">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-black">
            {" "}
            {title}{" "}
          </p>
        </div>
      ) : (
        <img
          className="w-full h-48 object-contain"
          src={imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : ""}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
        {title}
      </div>
    </div>
  );
};

export default BookCard;
