import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import AddItem from "../components/additem";
import Item from "../components/item";
import ItemField from "../components/itemfield";
import ClearAll from "../components/clearall";

export default function Home() {
    // Initialize state from localStorage using a function (runs only once)
    const [items, setItems] = useState<Array<{ id: number; title: string; description: string; completed: boolean }>>(() => {
        // This function runs only once when component first mounts
        console.log('Initializing items from localStorage...');
        try {
            const savedItems = localStorage.getItem('todo-items');
            if (savedItems) {
                const parsed = JSON.parse(savedItems);
                console.log('Loaded items from localStorage:', parsed);
                return parsed;
            }
        } catch (error) {
            console.error('Error loading items:', error);
        }
        console.log('No saved items found, using empty array');
        return [];
    }); // loads the items from localStorage into items.
    
    const [itemField, setItemField] = useState<number[]>(() => {
        // This function runs only once when component first mounts
        console.log('Initializing itemFields from localStorage...');
        try {
            const savedItemFields = localStorage.getItem('todo-itemFields');
            if (savedItemFields) {
                const parsed = JSON.parse(savedItemFields);
                console.log('Loaded itemFields from localStorage:', parsed);
                return parsed;
            }
        } catch (error) {
            console.error('Error loading itemFields:', error);
        }
        console.log('No saved itemFields found, using empty array');
        return [];
    }); // does the same thing for itemFields.
    
    // Use a ref to track if we've completed initial load
    const isInitialLoad = useRef(true);
    
    // Mark initial load as complete after first render
    useEffect(() => {
        isInitialLoad.current = false;
        console.log('Initial load flag set to false');
    }, []);
    
    const addItemField = () => {
        const newID = itemField.length + 1; 
        setItemField([...itemField, newID]);
    }

    const handleOnToggle = (itemID: number) => {
        setItems(items.map((item) => item.id === itemID ? { ...item, completed: !item.completed } : item)); // 
    }

    const handleClearAll = () => {
        setItems([]);
        setItemField([]);
        localStorage.removeItem('todo-items');
        localStorage.removeItem('todo-itemFields');
        console.log('All data cleared from localStorage');
    }

    const handleOnDelete = (itemID: number) => {
        setItems(items.filter((item) => item.id !== itemID));
    }


    // Step 1: Save data to localStorage whenever items or itemField changes
    useEffect(() => {
        // Don't save on initial load - wait until data is loaded first
        if (isInitialLoad.current) {
            console.log('Skipping save - initial load in progress');
            return;
        }
        // Save items array to localStorage
        console.log('Saving items to localStorage:', items);
        localStorage.setItem('todo-items', JSON.stringify(items));
        console.log('Items saved successfully');
    }, [items]); // This effect runs whenever 'items' changes

    useEffect(() => {
        // Don't save on initial load - wait until data is loaded first
        if (isInitialLoad.current) {
            console.log('Skipping save - initial load in progress');
            return;
        }
        // Save itemField array to localStorage
        console.log('Saving itemFields to localStorage:', itemField);
        localStorage.setItem('todo-itemFields', JSON.stringify(itemField));
        console.log('ItemFields saved successfully');
    }, [itemField]); // This effect runs whenever 'itemField' changes

    // This function is called when user presses Enter in the text field
    const handleEnterPress = (text: string, itemID: number) => {
        // Step 1: Create a new item with the text from the input
        const newItem = {
            id: Date.now(),
            title: text,  // Use the actual text the user typed
            description: "Item description",
            completed: false
        };
        
        // Step 2: Add the new item to the items array
        setItems([...items, newItem]);
        
        // Step 3: Remove the text field (filter out this itemID)
        setItemField(itemField.filter((id) => id !== itemID));
    }

    return (
        <div>
            <Navbar />
            <ClearAll onClearAll={handleClearAll} />
            <div style={{ paddingTop: '90px', paddingLeft: '20px', paddingRight: '40px', textAlign: 'left' }}>
                {/* Render all the items */}
                {items.map((item) => (
                    <Item key={item.id} title={item.title} completed={item.completed} onToggle={() => handleOnToggle(item.id)} onDelete={() => handleOnDelete(item.id)} />
                ))}
                
                {/* Render all the text fields */}
                {itemField.map((id) => (
                    <ItemField 
                        key={id} 
                        itemID={id}
                        onEnterPress={handleEnterPress}
                    />
                ))}
            </div>
            <AddItem onAddClick={addItemField} />
            
        </div>
    )
}