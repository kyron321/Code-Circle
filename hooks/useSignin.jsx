import { auth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useSignin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }
      // dispatch login action for global user context
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        console.log(err.message);
        setIsPending(false);
        setError(null);
      }
      //error handling
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //error handling
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signin, isPending, error };
};
