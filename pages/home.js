import Posts from "../components/Posts";
import { useAuthContext } from "../hooks/useAuthContext";
import { Router, useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = Promise.resolve(useAuthContext());

  user.then((user) => {
    if (!user.user && user.authIsReady) {
      router.push("/login");
    }
  });

  return <Posts />;

  // useEffect(() => {
  //   getCurrentUser()
  //   if (!user) router.push("/");
  // }, []);

  // return <Posts />;

  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []);
}
