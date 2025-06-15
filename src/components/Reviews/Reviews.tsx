import React, { useContext, useEffect, useState } from "react";
import { type IReview } from "@/model/Reviews";
import {
  addReview,
  deleteReview,
  getReviewsByBookId,
} from "@/services/reviewService";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/AuthContext";
import { getName } from "@/utils/avatar";
import type { IUser } from "@/model/User";
import { getUserById } from "@/services/authServices";
import { Star } from "lucide-react";
import StarRating from "../StarRating";

interface ReviewsProps {
  bookId: string;
}

const Reviews = ({ bookId }: ReviewsProps) => {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [error, setError] = useState<Error | null>(null);
  const [userData, setUserData] = useState<IUser>();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
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

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure youi want to delete this review?"))
      return;

    try {
      await deleteReview(reviewId);
      await fetchData(bookId);
    } catch (error) {
      alert("Failed to delete review.:(");
      console.error(error);
    }
  };

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
          userId: getName(userData),
          rating,
          comment: reviewMessage,
          createdAt: new Date(),
        });
        setReviewMessage("");
        setRating(5);
        await fetchData(bookId);
      } catch (error) {
        console.error("Error submitting review:", error);
        setError(error as Error);
      }
    } else {
      console.error("Review message cannot be empty");
    }
  };

  if (error) {
    return <div>Error fetching reviews: {error.message}</div>;
  }

  return (
    <div>
      <form
        className="container mx-auto p-4 flex flex-col items-center gap-2"
        onSubmit={handleReviewSubmit}
      >
        <StarRating value={rating} onChange={setRating} />
        <textarea
          placeholder="Add your review..."
          className="w-full max-w-md min-h-[80px] max-h-48 p-2 border rounded resize-y"
          onChange={(e) => setReviewMessage(e.target.value)}
          value={reviewMessage}
        />
        <Button className="w-full max-w-md" type="submit">
          Submit Review
        </Button>
      </form>

      {reviews.length > 0 ? (
        <div className="container mx-auto p-4">
          <h2 className="text-xl font-bold  mb-4">Reviews</h2>
          <div className="space-y-2">
            {[...reviews]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((review) => {
                if (!review.id) return;

                const isExpanded = expanded[review.id];
                const maxLength = 120;
                const shouldTruncate = review.comment.length > maxLength;
                const displayComment =
                  !shouldTruncate || isExpanded
                    ? review.comment
                    : review.comment.slice(0, maxLength) + "…";

                const isOwn = userData && getName(userData) === review.userId;
                return (
                  <div
                    key={review.id}
                    className="grid grid-cols-[120px_80px_1fr_90px] items-start gap-2 p-2 border rounded shadow-sm text-sm"
                  >
                    <span className="font-semibold  truncate col-span-1 text-left">
                      {review.userId}
                    </span>
                    <span className="flex items-center gap-0.5 col-span-1 justify-start">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < review.rating ? "#facc15" : "none"}
                          stroke={i < review.rating ? "#facc15" : "#d1d5db"}
                        />
                      ))}
                    </span>
                    <span className="flex-1  col-span-1 text-left break-words">
                      {displayComment}
                      {shouldTruncate && (
                        <button
                          type="button"
                          className="ml-2 text-blue-500 underline text-xs"
                          onClick={() => {
                            if (!review.id) return;
                            setExpanded((prev) => ({
                              ...prev,
                              [String(review.id)]: !isExpanded,
                            }));
                          }}
                        >
                          {isExpanded ? "less" : "more"}
                        </button>
                      )}
                    </span>
                    <span className="text-xs  text-right col-span-1 flex flex-col items-end gap-1">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : ""}
                      {isOwn && (
                        <button
                          className="text-red-500 underline text-xs mt-1"
                          onClick={() => handleDelete(review.id!)}
                          type="button"
                        >
                          Delete
                        </button>
                      )}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="text-center  mt-4">No comments found for this.</div>
      )}
    </div>
  );
};

export default Reviews;
