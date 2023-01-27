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
        <AblyChatComponent channelNum={channelNum} />
      </main>
    </div>
  );
}
