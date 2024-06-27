import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {

    const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const response = await fetch('https://2443rfrs9157.vicp.fun/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.text(); // We expect the data to be text
    setMessages(parseMessages(data)); // Parse the data and set it to state
    setInput('');
  };

  const parseMessages = (data) => {
    const parts = data.split('}{').map((part, index, array) => {
      if (index === 0) return part + '}';
      if (index === array.length - 1) return '{' + part;
      return '{' + part + '}';
    });

    return parts.map((part) => JSON.parse(part));
  };

  useEffect(() => {
    if (messages.length > 0) {
      let index = 0;
      let displayText = '';

      const intervalId = setInterval(() => {
        if (index < messages.length) {
          const message = messages[index];
          const content = message.payload.choices.text.map((text) => text.content).join('');
          displayText += content;
          setDisplayText(displayText);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 500); // Adjust the interval as needed

      return () => clearInterval(intervalId);
    }
  }, [messages]);

  return (
    <div>
      <h1>宝宝心的私人GPT</h1>
      <div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <textarea style = {{height : "100px" }}value={displayText} readOnly />
      </div>
    </div>
  );
}

export default ChatApp;
