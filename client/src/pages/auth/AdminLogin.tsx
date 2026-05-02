import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((state: any) => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ id: 'admin1', role: 'admin' });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1a0f0f] flex flex-col items-center justify-center">
      <div className="bg-red-600 w-full p-2 text-center text-white font-bold tracking-widest text-sm mb-12 border-y border-red-800">
        ADMINISTRATIVE ACCESS ONLY
      </div>
      
      <div className="w-full max-w-md bg-[#261515] p-10 rounded shadow-2xl border border-red-900/50">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-red-500">SYSTEM LOGIN</h2>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input 
            type="email" 
            placeholder="Admin Email" 
            className="bg-[#1a0f0f] border border-red-900/30 p-3 rounded text-red-100 focus:border-red-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="bg-[#1a0f0f] border border-red-900/30 p-3 rounded text-red-100 focus:border-red-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Secret Admin Key" 
            className="bg-[#1a0f0f] border border-red-900/30 p-3 rounded text-red-100 focus:border-red-500 outline-none transition font-mono"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          
          <button type="submit" className="bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700 transition mt-2 border border-red-500">
            Verify & Enter
          </button>
        </form>
      </div>
    </div>
  );
}
