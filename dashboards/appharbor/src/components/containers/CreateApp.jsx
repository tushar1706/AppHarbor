import React, { useState } from 'react';
import axios from 'axios';

function CreateApp() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [port, setPort] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3008/apps', {
        name,
        image,
        port: Number(port),
      });

      //alert('App created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error creating app');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New App</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>App Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Docker Image:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="nginx / redis / node:18"
            required
          />
        </div>

        <div>
          <label>Port:</label>
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            required
          />
        </div>

        <button type="submit">Deploy</button>
      </form>
    </div>
  );
}

export default CreateApp;