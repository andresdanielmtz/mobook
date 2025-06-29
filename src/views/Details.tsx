import { getBooksById } from "@/api/getBooks";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import type { Book } from "@/model";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Markup } from "interweave";
import Reviews from "@/components/Reviews/Reviews";
import { AuthContext } from "@/context/AuthContext";
import {
  addBookToUserWishlist,
  checkIfBookInWishlist,
} from "@/services/wishlistBooksServices";
import {
  addBookToUserPendingList,
  checkIfBookInPendingList,
} from "@/services/pendingBooksServices";
import {
  addBookToUserReadList,
  checkIfBookInReadList,
} from "@/services/readingBooksServices";

// Show specific book details by ID as well as reviews for that book.

const DetailsView = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);

  const [data, setData] = React.useState<Book | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [bookInWishlist, setBookWishlistState] = useState<boolean>(false);
  const [bookInPendingList, setBookPendingListState] = useState<boolean>(false);
  const [bookInReadList, setBookReadListState] = useState<boolean>(false);

  const [pendingLoading, setPendingLoading] = useState<boolean>(false);
  const [readLoading, setReadLoading] = useState<boolean>(false);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!bookId) {
      console.error("ID is undefined");
      return;
    }
    const fetchData = async () => {
      console.log(
        `Complete URL: ${import.meta.env.VITE_BOOK_API_URL2}/${bookId}`,
      );
      try {
        const response = await getBooksById(bookId);
        setData(response);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId, bookInWishlist, user]);

  // Check for initial states.

  useEffect(() => {
    if (!bookId || !user) return;
    const checkWishlist = async () => {
      try {
        const isInWishlist = await checkIfBookInWishlist(bookId, user.uid);
        setBookWishlistState(!!isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };
    const checkPendingList = async () => {
      try {
        const isInPendingList = await checkIfBookInPendingList(
          bookId,
          user.uid,
        );
        setBookPendingListState(!!isInPendingList);
      } catch (error) {
        console.error("Error checking pending list:", error);
      }
    };
    const checkReadList = async () => {
      try {
        const isInReadList = await checkIfBookInReadList(bookId, user.uid);
        setBookReadListState(!!isInReadList);
      } catch (error) {
        console.error("Error checking read list:", error);
      }
    };

    checkPendingList();
    checkReadList();
    checkWishlist();
  }, [bookId, user]);

  const handleAddToPendingList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !bookId) return;
    setPendingLoading(true);

    try {
      await addBookToUserPendingList(bookId, user.uid);
      setBookPendingListState(true); // Immediately update state
    } catch (error) {
      console.error("Error adding book to pending list.", error);
    } finally {
      setPendingLoading(false);
    }
  };

  const handleAddToReadList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !bookId) return;
    setReadLoading(true);

    try {
      await addBookToUserReadList(bookId, user.uid);
      setBookReadListState(true); // Immediately update state
    } catch (error) {
      console.error("Error adding book to read list.", error);
    } finally {
      setReadLoading(false);
    }
  };

  const handleAddToWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !bookId) return;
    setWishlistLoading(true);

    try {
      await addBookToUserWishlist(bookId, user.uid);
      setBookWishlistState(true); // Immediately update state
    } catch (error) {
      console.error("Error adding book to wishlist.", error);
    } finally {
      setWishlistLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">{error.message}</div>;
  }

  if (!data) {
    return <div className="text-muted-foreground">No data found</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex justify-start align-bottom mt-5 ml-5">
        <Button
          onClick={handleBack}
          variant="secondary"
          className="bg-card text-card-foreground"
        >
          Back
        </Button>
      </div>
      <div className="container mx-auto p-6 bg-card rounded-lg shadow-lg mt-4">
        <div className="flex flex-row items-center justify-between align-middle">
          <h1 className="text-3xl font-bold mb-6 text-justify text-card-foreground">
            {data.volumeInfo.title}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {data.volumeInfo.imageLinks?.thumbnail && (
            <img
              className="w-full md:w-1/3 rounded shadow-md mb-6 md:mb-0 md:mr-6 bg-background"
              src={data.volumeInfo.imageLinks?.thumbnail}
              alt={data.volumeInfo.title}
            />
          )}
          <div className="flex-1 text-justify">
            <Markup content={data.volumeInfo.description} />

            <h3 className="text-xl font-semibold mb-4 my-5 text-card-foreground">
              Authors
            </h3>
            <ul className="list-disc list-inside mb-6">
              {data.volumeInfo.authors?.map((author, index) => (
                <li key={index} className="text-muted-foreground">
                  {author}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-4 my-5 text-card-foreground">
              Publisher
            </h3>
            <p className="text-muted-foreground mb-6">
              {data.volumeInfo.publisher}
            </p>
            {data.volumeInfo.publishedDate ? (
              <h3 className="text-xl font-semibold mb-4 my-5 text-card-foreground">
                Published Date: {data.volumeInfo.publishedDate}
              </h3>
            ) : (
              <h3 className="text-xl font-semibold mb-4 my-5 text-card-foreground">
                Publish Date Unavailable
              </h3>
            )}

            <h3 className="text-xl font-semibold mb-4 my-5 text-card-foreground">
              Categories
            </h3>
            <ul className="list-disc list-inside mb-6">
              {data.volumeInfo.categories?.map((category, index) => (
                <li key={index} className="text-muted-foreground">
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 mb-4 mt-6 justify-center">
        <Button
          onClick={handleAddToWishlist}
          disabled={bookInWishlist || wishlistLoading}
          variant={bookInWishlist ? "secondary" : "default"}
          className="bg-primary text-primary-foreground"
        >
          {bookInWishlist
            ? "In Wishlist"
            : wishlistLoading
              ? "Adding..."
              : "Add to Wishlist"}
        </Button>

        <Button
          onClick={handleAddToPendingList}
          disabled={bookInPendingList || pendingLoading}
          variant={bookInPendingList ? "secondary" : "default"}
          className="bg-primary text-primary-foreground"
        >
          {bookInPendingList
            ? "In Pending List"
            : pendingLoading
              ? "Adding..."
              : "Add to Pending List"}
        </Button>

        <Button
          onClick={handleAddToReadList}
          disabled={bookInReadList || readLoading}
          variant={bookInReadList ? "secondary" : "default"}
          className="bg-primary text-primary-foreground"
        >
          {bookInReadList
            ? "In Read List"
            : readLoading
              ? "Adding..."
              : "Add to Read List"}
        </Button>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto p-6 bg-card rounded-lg shadow-lg mt-4">
        {bookId && <Reviews bookId={bookId} />}
      </div>
    </div>
  );
};

export default DetailsView;
