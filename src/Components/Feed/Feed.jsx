import { useEffect, useState } from "react";
const Feed = () => {
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      const interval = setInterval(() => {
        const storedMessage = localStorage.getItem("KillFeed");
        if (storedMessage) {
          setMessage(storedMessage);
        }
      }, 50); 
  
      return () => clearInterval(interval); 
    }, []);
  
    return (
      <div className="feed-container">
        <p>{message}</p>
      </div>
    );
  };
  
  export default Feed;