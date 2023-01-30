import React, { useEffect, useState } from "react";
import { useChannel } from "./AblyReactEffect";
import { useAuthContext } from "../hooks/useAuthContext";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const AblyChatComponent = (props) => {
  const { user } = useAuthContext();
  let inputBox = null;
  let messageEnd = null;
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const [channel, ably] = useChannel(props.channelNum.channel, (message) => {
    // Here we're computing the state that'll be drawn into the message history
    // We do that by slicing the last 199 messages from the receivedMessages buffer

    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);

    // Then finally, we take the message history, and combine it with the new message
    // This means we'll always have up to 199 message + 1 new message, stored using the
    // setMessages react useState hook
  });
  useEffect(() => {
    async function getChatHistory() {
      const q = query(
        collection(db, "messages"),
        where("channel", "==", `${props.channelNum.channel}`)
      );
      const querySnapshot = await getDocs(q);
      const returnedMessages = querySnapshot.docs.map((doc) => {
        return doc._document.data.value.mapValue.fields;
      });
      return returnedMessages;
    }
    getChatHistory().then((res) => {
      setMessageHistory(res);
    });
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  }, []);
  const sendChatMessage = (messageText) => {
    const docRef = addDoc(collection(db, "messages"), {
      user: user.displayName,
      message: messageText,
      channel: props.channelNum.channel,
    });
    console.log("Document written with ID: ", docRef.id);
    channel.publish({ name: user.displayName, data: messageText });
    setMessageText("");
    inputBox.focus();
  };
  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };
  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };
  const previousMessages = messageHistory.map((msg, index) => {
    console.log(msg);
    return (
      <section>
        <span key={index}>
          {msg.user.stringValue}: {msg.message.stringValue}
        </span>
        <br />
      </section>
    );
  });

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";

    return (
      <section>
        <span key={index} data-author={author}>
          {message.name}: {message.data}
        </span>
        <br />
      </section>
    );
  });
  <div
    ref={(element) => {
      messageEnd = element;
    }}
  ></div>;

  return (
    <main style={{ marginTop: "92px" }}>
      <div>
        {previousMessages}
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission}>
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button type="submit" disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </main>
  );
};

export default AblyChatComponent;
