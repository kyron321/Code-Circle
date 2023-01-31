import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import checkLoggedIn from "../../hooks/checkLoggedIn";

const AblyChatComponent = dynamic(
  () => import("../../components/AblyChatComponent"),
  { ssr: false }
);

export default function Message() {
  checkLoggedIn();
  const router = useRouter();
  const channelNum = router.query;

  return (
    <div className="container">
      <main>
        <AblyChatComponent channelNum={channelNum} />
      </main>
    </div>
  );
}
