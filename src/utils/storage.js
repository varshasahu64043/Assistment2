export const loadItems = () => {
    return JSON.parse(localStorage.getItem('items')) || [];
};

export const saveItems = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
};
  