import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await fetch('https://picsum.photos/v2/list');
      const data = await response.json();
      setUsers(data);
      
       setTimeout(() => {
        setLoading(false); // Set loading to false after data is fetched
      }, 2000);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <Loading />; // Return the loading component here
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {users.map((item) => (
        <div
          key={item.id}
          className="max-w-sm m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-t-lg"
              src={item.download_url}
              alt="random_image"
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.author}
              </h5>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
