import { useState } from 'react';
import axios from 'axios';

const projectID = '519daa58-d3ae-4dd2-85c8-4e5544e63329';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="login">
      <div className="login-triangle" />
      <div className="form">
        <h1 className="login-header">Chat Application</h1>
        <form className="login-container" onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <input type="submit" className="button" value="Start chatting" />
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
