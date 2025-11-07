import { useState } from "react";

interface ItemFieldProps{
    itemID: number;
    onEnterPress: (text: string, itemID: number) => void; 
}

export default function ItemField({ itemID, onEnterPress }: ItemFieldProps){
    // Step 1: Create state to track what the user types
    const [inputValue, setInputValue] = useState<string>("");

    // Step 2: Handle when user types in the input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            // Step 3: Call the parent's function with the text and ID
            onEnterPress(inputValue.trim(), itemID);
            // Step 4: Clear the input field
            setInputValue("");
        }
    };

    return (
        <div className = "item-field">
            <input 
                type="text" 
                placeholder="Add a Task" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}