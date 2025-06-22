import { useEffect, useState } from 'react';
import { loadItems } from '../utils/storage';
import ItemCard from '../components/ItemCard';

export default function ViewItems() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(loadItems());
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.length === 0 ? (
                <p className="text-center col-span-full">No items available. Please add one.</p>
            ) : (
                items.map(item => <ItemCard key={item.id} item={item} />)
            )}
        </div>
    );
}
