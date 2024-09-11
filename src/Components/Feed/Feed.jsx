import { useEffect, useState } from "react";
import './Feed.css';

const Feed = () => {
  const [leftMessage, setLeftMessage] = useState("");
  const [rightMessage, setRightMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const storedMessage = localStorage.getItem("KillFeed");
      if (storedMessage) {
        const [left, right] = storedMessage.split(" killed ");
        setLeftMessage(left);
        setRightMessage(right);
      }
    }, 1000); // Poll for updates every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const formatMessagePart = (message) => {
    const regex = /\(([^)]+)\)/g; // Matches roles inside parentheses
    return message.replace(regex, (match, role) => {
      const imagePath = `/src/assets/DeadState/${role.toLowerCase()}Dead.png`; // Dynamically generate image path
      return `<img src="${imagePath}" alt="${role}" class="role-image" />`; // Inject image HTML with styling class
    });
  };

  return (
    <div className="feed-container">
      <div className="feed-message">
        <span
          className="message-part left-message"
          dangerouslySetInnerHTML={{ __html: formatMessagePart(leftMessage) }}
        ></span>
        <div className="middle-message-container">
          <span className="middle-message">killed</span>
        </div>
        <span
          className="message-part right-message"
          dangerouslySetInnerHTML={{ __html: formatMessagePart(rightMessage) }}
        ></span>
      </div>
    </div>
  );
};

export default Feed;
