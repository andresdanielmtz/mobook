/**
 * Profile View
 * This is the main view of the profile component, it will show the information of the user as well as the settings and preferences option.
 * */

import { Button } from "@/components/ui/button";
import { type IUser } from "@/model/User";
import { getUserById, updateBioByUserID } from "@/services/authServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pencil } from "@mynaui/icons-react";
import type { Book } from "@/model";
import { getUserWishlist } from "@/services/wishlistBooksServices";
import BookShelf from "@/components/BookShelf";
import { getUserPendingList } from "@/services/pendingBooksServices";
import { getUserReadList } from "@/services/readingBooksServices";

export const ProfileView = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<IUser>();
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [editingBioText, setEditingBioText] = useState<string>(
    userData?.bio || "",
  );
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      const wishlistBooks = await getUserWishlist(userId);
      const readBooks = await getUserReadList(userId);
      const pendingBooks = await getUserPendingList(userId);
      setWishlistBooks(wishlistBooks);
      setReadBooks(readBooks);
      setPendingBooks(pendingBooks);
    };
    if (!userId) {
      console.error("User ID is not available in the URL parameters.");
      return;
    }
    fetchUserData(userId).finally(() => {
      setLoading(false); // Set loading to false after fetching data
    });
  }, [userId]);

  useEffect(() => {
    console.log(`Fetching data for user with ID: ${userId}`);
    getUserById(userId || "")
      .then((user) => {
        if (user) {
          setUserData(user);
          console.log("User data fetched successfully:", user);
        } else {
          console.error("No user found with the provided ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleEditingBio = () => {
    if (!isEditingBio || !userData) {
      console.warn("Bio text is empty, not updating.");
      return;
    }
    if (editingBioText.trim() === "") {
      console.warn("Editing bio text is empty, not updating.");
      setIsEditingBio(false);
      return;
    }
    updateBioByUserID(userId || "", editingBioText)
      .then(() => {
        console.log("Bio updated successfully");

        setUserData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            bio: editingBioText,
          };
        });
      })
      .catch((error) => {
        console.error("Error updating bio:", error);
      })
      .finally(() => {
        setEditingBioText("");
        setIsEditingBio(false);
      });
  };
  return (
    <div>
      {userData ? (
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <div className="mb-6">
              <p>
                <b>Email:</b> {userData.email}
              </p>
              {userData.displayName && (
                <p>
                  <b>Display Name:</b> {userData.displayName || "N/A"}
                </p>
              )}
              {userData.firstName && userData.lastName && (
                <>
                  <p>
                    <b>First Name:</b> {userData.firstName || "N/A"}
                  </p>
                  <p>
                    <b>Last Name:</b> {userData.lastName}
                  </p>
                </>
              )}
            </div>
            <hr className="mb-6" />
            {/* TODO: Add cancel button when editing bio. */}
            {isEditingBio ? (
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  defaultValue={userData.bio || ""}
                  onChange={(e) => setEditingBioText(e.target.value)}
                />
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleEditingBio}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <p>
                  <b>Bio:</b> {userData.bio || "No bio available"}
                </p>
                <Pencil
                  className="ml-auto text-blue-500 cursor-pointer"
                  onClick={() => setIsEditingBio(true)}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading user data...</p>
      )}

      {/** Shelves displayed in a row */}
      <div className="flex flex-row flex-wrap justify-center space-x-1">
        <BookShelf
          books={wishlistBooks}
          title="Wishlist Books"
          isLoading={loading}
        />
        <BookShelf books={readBooks} title="Read Books" isLoading={loading} />
        <BookShelf
          books={pendingBooks}
          title="Pending Books"
          isLoading={loading}
        />
      </div>
    </div>
  );
};
