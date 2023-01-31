import Posts from "../components/Posts";
import checkLoggedIn from "../hooks/checkLoggedIn";

export default function Home() {
  checkLoggedIn();

  return <Posts />;
}
