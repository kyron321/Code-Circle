import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AblyChatComponent = dynamic(
  () => import("../../components/AblyChatComponent"),
  { ssr: false }
);

export default function Message() {
  const router = useRouter();
  const channelNum = router.query;

  return (
    <div className="container">
      <main>
        <h1 className="title">Next.js Chat Demo</h1>
        <AblyChatComponent channelNum={channelNum} />
      </main>
    </div>
  );
}
