import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";

export default function checkLoggedIn() {
  const router = useRouter();
  const user = Promise.resolve(useAuthContext());

  user.then((user) => {
    if (!user.user && user.authIsReady) {
      router.push("/login");
    }
  });
}
