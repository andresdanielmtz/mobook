import React, { useContext, useEffect, useState } from "react";
import { type IReview } from "@/model/Reviews";
import { addReview, getReviewsByBookId } from "@/services/reviewsServices";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/AuthContext";
import { getName } from "@/utils/avatar";
import type { IUser } from "@/model/User";
import { getUserById } from "@/services/authenticationServices";

interface ReviewsProps {
  bookId: string;
}

const Reviews = ({ bookId }: ReviewsProps) => {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [userData, setUserData] = useState<IUser>();
  useEffect(() => {
    if (!user) return;
    getUserById(user.uid).then((payload) => {
      setUserData(payload);
    });
  }, [user]);

  const fetchData = async (bookId: string) => {
    try {
      const response = await getReviewsByBookId(bookId);
      if (response) {
        setReviews(response);
      } else {
        console.error("No reviews found for this book.");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (!bookId) {
      console.error("ID is undefined");
      return;
    }

    fetchData(bookId).catch((error) => {
      console.error("Error fetching reviews:", error);
      setError(error as Error);
    });
  }, [bookId]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) {
      console.error("ID is undefined, cannot submit review");
      return;
    }
    if (reviewMessage.trim()) {
      try {
        if (!userData) return;

        await addReview({
          bookId: bookId,
          userId: getName(userData), // Replace with actual user ID if available
          rating: 5, // Default rating, can be modified
          comment: reviewMessage,
          createdAt: new Date(),
        });
        console.log("Review submitted:", reviewMessage);
        setReviewMessage(""); // Clear the input after submission
        await fetchData(bookId); // Refresh reviews after submission
      } catch (error) {
        console.error("Error submitting review:", error);
        setError(error as Error);
      }
    } else {
      console.error("Review message cannot be empty");
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchData(bookId).catch((error) => {
        console.error("Error fetching reviews:", error);
        setError(error as Error);
      });
    }
  }, [bookId]);

  if (error) {
    return <div>Error fetching reviews: {error.message}</div>;
  }

  return (
    <div>
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

export default Reviews;
