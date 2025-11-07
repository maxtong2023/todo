interface ClearAllProps {
    onClearAll: () => void;
}

export default function ClearAll({ onClearAll }: ClearAllProps) {
    return (
        <div className="clear-all">
            <button className="clear-all-button" onClick={onClearAll}>Clear All</button>
        </div>
    )
}