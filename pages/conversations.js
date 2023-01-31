import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getConversations } from "../hooks/getConversations";
import { useAuthContext } from "../hooks/useAuthContext";

import ConversationCard from "../components/ConversationCard";

import styles from "../css/conversations.module.css";

export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthContext();

  useEffect(() => {
    getConversations().then((response) => {
      setConversations(response);
      setIsLoading(false);
    });
  }, []);

  let router = useRouter();

  const handleRedirect = (channel, secondUser) => {
    router.push({
      pathname: `/message/${channel}`,
      query: { secondUser: `${secondUser}` },
    });
  };

  const filteredConversations = conversations?.filter((item) => {
    return item?.recipient === user?.displayName;
  });

  let grouped = {};

  filteredConversations.forEach((obj) => {
    if (grouped[obj.channel] === undefined) {
      grouped[obj.channel] = [];
      grouped[obj.channel].push(obj);
    }
  });

  if (isLoading) return <div>Loading...</div>;

  if (filteredConversations?.length > 0) {
    return (
      <div>
        <h1 className={styles.heading}>Conversations</h1>

        <section className={styles.conversations}>
          {Object.keys(grouped).map((item, i) => (
            <div
              onClick={() =>
                handleRedirect(
                  grouped?.[item]?.[0]?.channel,
                  grouped?.[item]?.[0]?.user
                )
              }
            >
              <ConversationCard
                key={`${item}-${i}`}
                user={grouped?.[item]?.[0]?.user}
                date={grouped?.[item]?.[0]?.createdAt?.toLocaleString()}
                message={grouped?.[item]?.[0]?.message}
              />
            </div>
          ))}
        </section>
      </div>
    );
  }
}
