import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadItems, saveItems } from '../utils/storage';

export default function AddItems() {
    const [formData, setFormData] = useState({
        itemName: '',
        itemType: '',
        itemDescription: '',
        coverImage: '',
        additionalImages: [],
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'coverImage') {
            const reader = new FileReader();
            reader.onload = () => setFormData({ ...formData, coverImage: reader.result });
            reader.readAsDataURL(files[0]);
        } else if (name === 'additionalImages') {
            const readers = Array.from(files).map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(readers).then(images => setFormData({ ...formData, additionalImages: images }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const items = loadItems();
        items.push({ id: Date.now(), ...formData });
        saveItems(items);
        alert('Item added successfully!');
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
            <div className="mb-4">
                <label className="block mb-1">Item Name</label>
                <input name="itemName" value={formData.itemName} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Item Type</label>
                <input name="itemType" value={formData.itemType} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Cover Image</label>
                <input type="file" name="coverImage" accept="image/*" onChange={handleChange} className="w-full" />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Additional Images</label>
                <input type="file" name="additionalImages" multiple accept="image/*" onChange={handleChange} className="w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Item</button>
        </form>
    );
}
