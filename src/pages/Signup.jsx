import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from "../firebase";
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);
const db = getDatabase(app);

const Signup = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [toastMessage, setToastMessage] = React.useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Save user data to DB
                set(ref(db, 'users/' + user.uid), {
                    email: user.email,
                    uid: user.uid,
                });

                // ✅ Show toast message
                setToastMessage(`Signup Successful! ✨\nEmail: ${user.email}\nUID: ${user.uid}`);

                // Hide toast after 4s
                setTimeout(() => {
                    setToastMessage("");
                    navigate('/'); // ✅ Redirect after showing
                }, 4000);
            })
            .catch((error) => {
                setToastMessage(`❌ Signup Error: ${error.message}`);
                setTimeout(() => setToastMessage(""), 4000);
            });
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            {/* Toast Sticker */}
            {toastMessage && (
                <div className="absolute top-6 right-6 bg-blue-600 text-white p-4 rounded-xl shadow-lg whitespace-pre-line animate-fadeIn">
                    {toastMessage}
                </div>
            )}

            {/* Signup Card */}
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
