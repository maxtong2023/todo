interface AddItemProps {
    onAddClick: () => void;
}

export default function AddItem({ onAddClick }: AddItemProps){
    return (
        <div className="add-item">
            <button className="add" onClick={onAddClick}>+</button>
        </div>
    );
}