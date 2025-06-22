import { Routes, Route, Link } from 'react-router-dom';
import AddItems from './pages/AddItems';
import ViewItems from './pages/ViewItems';
import Signup from './pages/Signup';
import { onValue } from "firebase/database";
// import Login from './pages/Login'; // Make sure this file exists
import { getDatabase, ref, set } from 'firebase/database';
import { app } from "../firebase";

const db = getDatabase(app);

export default function App() {
  const putData = () => {
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.values(data);
        console.log("All signed-up users:", userList);
        alert(`Total Users: ${userList.length}`);
      } else {
        console.log("No users found.");
        alert("No users found.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Item Manager</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">View Items</Link>
          <Link to="/add" className="text-gray-700 hover:text-blue-600">Add Item</Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
          {/* <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link> */}
        </div>
        <button
          onClick={putData}
          className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          PutData
        </button>
      </nav>

      {/* Page Content */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add" element={<AddItems />} />
          <Route path="/signup" element={<Signup />} />
        
        </Routes>
      </div>
    </div>
  );
}
