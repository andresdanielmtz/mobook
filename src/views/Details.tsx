import { getBooksById } from "@/api/getBooks";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import type { Item } from "@/model";
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

// Show specific book details by ID

const DetailsView = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);

  const [data, setData] = React.useState<Item | null>(null);
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
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Return error and no data states

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="flex justify-start align-bottom mt-5 ml-5 ">
        <Button onClick={handleBack}> Back</Button>
      </div>
      <div className="container mx-auto p-6">
        <div className="flex flex-row items-center justify-between align-middle">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-justify">
            {data.volumeInfo.title}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {data.volumeInfo.imageLinks?.thumbnail && (
            <img
              className="w-full md:w-1/3 rounded shadow-md mb-6 md:mb-0 md:mr-6"
              src={data.volumeInfo.imageLinks?.thumbnail}
              alt={data.volumeInfo.title}
            />
          )}
          <div className="flex-1 text-justify">
            <Markup content={data.volumeInfo.description} />

            <h3 className="text-xl font-semibold text-gray-800 mb-4  my-5">
              Authors
            </h3>
            <ul className="list-disc list-inside mb-6">
              {data.volumeInfo.authors?.map((author, index) => (
                <li key={index} className="text-gray-600">
                  {author}
                </li>
              ))}

              <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                {" "}
                Publisher
              </h3>
              <p className="text-gray-600 mb-6">{data.volumeInfo.publisher}</p>
              {data.volumeInfo.publishedDate ? (
                <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                  {" "}
                  Published Date: {data.volumeInfo.publishedDate}
                </h3>
              ) : (
                <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                  {" "}
                  Publish Date Unavailable
                </h3>
              )}

              <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                Categories
              </h3>
              <ul className="list-disc list-inside mb-6">
                {data.volumeInfo.categories?.map((category, index) => (
                  <li key={index} className="text-gray-600">
                    {category}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 mb-4">
        <Button
          onClick={handleAddToWishlist}
          disabled={bookInWishlist || wishlistLoading}
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
        >
          {bookInReadList
            ? "In Read List"
            : readLoading
              ? "Adding..."
              : "Add to Read List"}
        </Button>
      </div>

      {/**
       * Reviews Section
       */}

      {bookId && <Reviews bookId={bookId} />}
    </div>
  );
};

export default DetailsView;
