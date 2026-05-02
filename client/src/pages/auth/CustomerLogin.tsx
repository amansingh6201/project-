import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((state: any) => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary mock login
    setUser({ id: '1', email, role: 'customer', plan: 'premium' });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2000')] bg-cover opacity-30 blur-sm" />
      <div className="relative z-10 w-full max-w-md bg-black/80 p-12 rounded-xl backdrop-blur-md border border-white/10">
        <h1 className="text-4xl text-[#ff4d38] font-bold mb-8" style={{fontFamily: "'Bebas Neue', sans-serif"}}>NOVASTREAM</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="bg-gray-800/50 p-4 rounded text-white outline-none focus:border-[#ff4d38] border border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="bg-gray-800/50 p-4 rounded text-white outline-none focus:border-[#ff4d38] border border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit" className="bg-[#ff4d38] text-white p-4 rounded font-bold hover:bg-[#e53e2d] transition mt-4">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-gray-400 text-sm flex justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#ff4d38]" /> Remember me
          </label>
          <a href="#" className="hover:text-white transition">Need help?</a>
        </div>
        
        <p className="mt-8 text-gray-400">
          New to NovaStream? <a href="#" className="text-white hover:underline">Start free trial</a>
        </p>
      </div>
    </div>
  );
}
