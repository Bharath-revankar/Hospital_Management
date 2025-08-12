import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = ({ currentUser, recipientId, recipientName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Join room for this conversation
    const roomId = [currentUser.id, recipientId].sort().join("-");
    newSocket.emit("join", roomId);

    // Listen for messages
    newSocket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, [currentUser.id, recipientId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        text: newMessage,
        senderId: currentUser.id,
        senderName: currentUser.name,
        recipientId,
        timestamp: new Date(),
      };

      const roomId = [currentUser.id, recipientId].sort().join("-");
      socket.emit("sendMessage", { roomId, message: messageData });

      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", maxWidth: "400px" }}
    >
      <h4>Chat with {recipientName}</h4>
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid #eee",
          padding: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <strong>{msg.senderName}:</strong> {msg.text}
            <div style={{ fontSize: "0.8em", color: "#666" }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "70%" }}
        />
        <button type="submit" style={{ width: "25%", marginLeft: "5%" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
