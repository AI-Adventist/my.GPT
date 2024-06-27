// src/Items.js
import React, { useState, useEffect } from 'react';
import ChatApp from "./views/ChatApp"

import axios from 'axios';
const API_URL = 'https://2443rfrs9157.vicp.fun/items';
// const API_URL = 'http://localhost:3000/items';

const getItem = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("response")
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};  

const Items = () => {
  const [items, setItems] = useState([]);
  const [itemId,setItemId] = useState([]);
  const [content,setContent] = useState([])
  
  useEffect(() => {
    // Fetch data from the backend
    fetch('https://2443rfrs9157.vicp.fun/items')
    // fetch('http://localhost:3000/items')
      .then(response => {
        console.log(response);
        return response.json();
          }
          )
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  useEffect(() => {
    // Fetch data from the backend
    getItem(itemId)
      .then(response => {
        console.log(response);
        return JSON.stringify(response);
      })
      .then(data => {
        setContent(JSON.parse(data))})
      .catch(error => console.error('Error fetching items:', error));
  }, [itemId]);

  return (
    <div>
      <h1>The Truth World</h1>
      {/* <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul> */}
      <div>
        <ul>
            {items.map(item=>(
              <button key={item.id} onClick={()=>setItemId(item.id)}>{item.id}</button>
            ))}
          
        </ul>
        <div>本页内容：
      
        {content && ( // Render only if content exists
          <div key={content.id}>
            <h2>{content.name}</h2>
            <p>{content.description}</p>
          </div>
        )}
      
        </div>
      </div>
      <ChatApp/>
    </div>
  );
};

export default Items;


