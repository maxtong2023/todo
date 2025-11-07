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

    const handleAddItem = () => {
        const newItem = { // this creates a new item object with the following properties. 
            id: Date.now(),
            title: `Item ${items.length + 1}`,
            description: "Item description"
        };
        setItems([...items, newItem]); // ... is the spread operator. It is used to copy the existing items array and add the new item to the end of the array.
    };

    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: '80px', padding: '80px 20px 20px 20px' }}>
                {itemField.map((id) => (
                    
                    <ItemField key={id} />
                ))}
            </div>
            <AddItem onAddClick={addItemField} />
        </div>
    )
}