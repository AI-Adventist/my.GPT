import React, { useEffect, useState } from 'react';
import { getItems,getItem } from '../services/itemsService';

const ItemList = () => {
  const [items, setItems] = useState([]);
const [item,setItem] = useState([]);
const arr = [1,2];
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  // const fetchItem = async (num) => {
  //   try {
  //     const data = await getItems(num);
  //     setItems(data);
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   }
  // }




  return (
    <div>
      <h1>Items222</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: {item.description}</li>
        ))}
      </ul>
      <div>

      <ul>
          {arr.map(item=>(
            <button>{item}</button>
          ))}
          <button>11</button>
      </ul>
      </div>
    </div>
  );
};

export default ItemList;
