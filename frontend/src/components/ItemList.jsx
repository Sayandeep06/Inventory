import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import EditForm from './EditForm';
const ItemList = ()=>{
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null); 
  useEffect(() => {
    const fetchItems = async ()=>{
      try {
        const response = await fetch('http://localhost:3000/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch itemss');
        }
        const data = await response.json();
        setItems(data)
      }
      catch(error){
        console.error(error.message)
      }
    }
    fetchItems();
  }, []);
  
  const handleAddItem = (newItem) => {
    console.log('New items added:', newItem); 
    setItems([...items, newItem]);
  };
  
  const handleDelete = async (_id) =>{
    try{
      const response = await fetch('http://localhost:3000/api/items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id })
      });
      if(!response.ok){
        throw new Error('Failed to delete items');
      }
      setItems(items.filter((it) =>  it._id !== _id ));
    }catch(error){
      console.error(error.message);
    }
  }
  const handleEdit = (item) => {
    setEditItem(item); // Set the selected item for editing
  };

  const handleUpdate = async (updatedItem) =>{
    try{
      const response = await fetch('http://localhost:3000/api/items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem)
      });
      if(!response.ok){
        throw new Error('Failed to delete items');
      }
      const updatedItems = items.map((it) => it._id === updatedItem._id ? updatedItem : it);
      setItems(updatedItems);
      setEditItem(null);
    }catch(error){
      console.error(error.message);
    }
  }  
  return (
    <div>
      <h1>Inventory</h1>
      <AddItem onAdd={handleAddItem} />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editItem && editItem._id === item._id ? (
              // Render an inline edit form if the item is being edited
              <EditForm item={editItem} onUpdate={handleUpdate} />
            ) : (
              // Render the regular item view
              <>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>{item.description}</p>
                <p>Category: {item.category}</p>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
  
}

export default ItemList;