/**
 * Profile View
 * This is the main view of the profile component, it will show the information of the user as well as the settings and preferences option.
 * */

import { Button } from "@/components/ui/button";
import { type StoreUser } from "@/model/User";
import {
  getUserById,
  updateBioByUserID,
} from "@/services/authenticationServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProfileView = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<StoreUser>();
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [editingBioText, setEditingBioText] = useState<string>(
    userData?.bio || "",
  );

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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">
        Profile
      </h1>
      {userData ? (
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
            <h2 className="text-xl font-bold mb-4 ">User Information</h2>
            <p>
              <b>Email:</b> {userData.email}
            </p>
            <p>
              <b>Display Name:</b> {userData.displayName || "N/A"}
            </p>
            {isEditingBio ? (
              <div>
                <textarea
                  className="w-full p-2 border rounded"
                  defaultValue={userData.bio || ""}
                  onChange={(e) => setEditingBioText(e.target.value)}
                />
                <Button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleEditingBio}
                >
                  Save Bio
                </Button>
              </div>
            ) : (
              <div>
                <p>
                  <b>Bio:</b> {userData.bio || "No bio available"}
                </p>
                <Button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsEditingBio(true)}
                >
                  Edit Bio
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading user data...</p>
      )}
    </div>
  );
};
