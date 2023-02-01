import { useAuthContext } from "../hooks/useAuthContext";
import Footer from "./Footer";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { useRouter } from "next/router";



export default function Layout({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();

  if (
    router.pathname === "/login" ||
    router.pathname === "/create-an-account"
  ) {
    return <div>{children}</div>;
  } else if (router.pathname !== "/login") {
    return (
      <div>
        {user ? <LoggedInNav /> : <LoggedOutNav />}
        <div >{children}</div>
        <Footer />
      </div>
    );
  }
}
