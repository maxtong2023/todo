import { useState } from "react";
import Navbar from "../components/navbar";
import AddItem from "../components/additem";
import Item from "../components/item";
import ItemField from "../components/itemfield";

export default function Home() {
    const [items, setItems] = useState<Array<{ id: number; title: string; description: string }>>([]); // usestate is the react hook that creates state. 
    // it takes in one argument, the initial value. 
    // basically we are passing in to useState the type of value that the state variable will hold. 
    // setitems is the function that updates the variable and automatically triggers a re render to the UI to display the changes. 

    const [itemField, setItemField] = useState<number[]>([]);
    const addItemField = () => {
        const newID = itemField.length + 1; 
        setItemField([...itemField, newID]);
    }



    // This function is called when user presses Enter in the text field
    const handleEnterPress = (text: string, itemID: number) => {
        // Step 1: Create a new item with the text from the input
        const newItem = {
            id: Date.now(),
            title: text,  // Use the actual text the user typed
            description: "Item description"
        };
        
        // Step 2: Add the new item to the items array
        setItems([...items, newItem]);
        
        // Step 3: Remove the text field (filter out this itemID)
        setItemField(itemField.filter((id) => id !== itemID));
    }

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '80px', padding: '80px 20px 20px 20px' }}>
                {/* Render all the items */}
                {items.map((item) => (
                    <Item key={item.id} title={item.title} description={item.description} />
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