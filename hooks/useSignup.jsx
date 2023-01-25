import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    try {
      //signup user with firebase

      const res = await createUserWithEmailAndPassword(auth, email, password);

      // if (!res) {
      //   throw new Error("Could not complete signup");
      // }
      //add display name to firebase user
      dispatch({ type: "LOGIN", payload: res.user });

      await updateProfile(res.user, { displayName });

      // dispatch login action

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      //error handling
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
