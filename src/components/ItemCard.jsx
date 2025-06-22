export default function ItemCard({ item }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img src={item.coverImage} alt="Cover" className="w-full h-48 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{item.itemName}</h3>
            <p className="text-sm text-gray-600">Type: {item.itemType}</p>
            <p className="text-sm text-gray-700 mt-2">{item.itemDescription}</p>
            {item.additionalImages.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {item.additionalImages.map((img, i) => (
                        <img key={i} src={img} alt="Additional" className="h-16 object-cover rounded" />
                    ))}
                </div>
            )}
        </div>
    );
  }