import { getBooksById } from "@/api/getBooks";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import type { Item } from "@/model";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Markup } from "interweave";
import type { IReview } from "@/model/Reviews";
import { addReview, getReviewsByBookId } from "@/services/reviewsServices";
import { Input } from "@/components/ui/input";

// Show specific book details by ID

const DetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<Item | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [reviews, setReviews] = React.useState<IReview[]>([]);
  const [reviewMessage, setReviewMessage] = React.useState<string>("");

  const fetchData = async (id: string) => {
    try {
      const response = await getReviewsByBookId(id);
      if (response) {
        setReviews(response);
      } else {
        console.error("No reviews found for this book.");
        setReviews([]);
      }
      console.error(`Fetched reviews for book ID ${id}:`, response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError(error as Error);
      setReviews([]); // Reset reviews on error
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    fetchData(id).catch((error) => {
      console.error("Error fetching reviews:", error);
      setError(error as Error);
    });
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      console.error("ID is undefined, cannot submit review");
      return;
    }
    if (reviewMessage.trim()) {
      try {
        await addReview({
          bookId: id,
          userId: "anonymous", // Replace with actual user ID if available
          rating: 5, // Default rating, can be modified
          comment: reviewMessage,
          createdAt: new Date(),
        });
        console.log("Review submitted:", reviewMessage);
        setReviewMessage(""); // Clear the input after submission
        await fetchData(id); // Refresh reviews after submission
      } catch (error) {
        console.error("Error submitting review:", error);
        setError(error as Error);
      }
    } else {
      console.error("Review message cannot be empty");
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    const fetchData = async () => {
      console.log(`Complete URL: ${import.meta.env.VITE_BOOK_API_URL2}/${id}`);
      try {
        const response = await getBooksById(id);

        setData(response);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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

      {/**
       * Reviews Section
       */}

      <div>
        <form className="container mx-auto p-6">
          <Input
            type="text"
            placeholder="Add your review..."
            className="w-full max-w-md mx-auto my-6"
            onChange={(e) => setReviewMessage(e.target.value)}
            value={reviewMessage}
          />
          <Button
            className="w-full max-w-md mx-auto my-2"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </Button>
        </form>
      </div>

      {reviews.length > 0 ? (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border rounded shadow-sm bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.userId} - {review.rating} Stars
                </h3>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  Reviewed on:{" "}
                  {new Date(review.createdAt!).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div> No comments found for this. </div>
      )}
    </div>
  );
};

export default DetailsView;
