/**
 * Profile View
 * This is the main view of the profile component, it will show the information of the user as well as the settings and preferences option.
 * */

import { type StoreUser } from "@/model/user";
import { getUserById } from "@/services/authenticationServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProfileView = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<StoreUser>();

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
          </div>
        </div>
      ) : (
        <p className="text-center">Loading user data...</p>
      )}
    </div>
  );
};
