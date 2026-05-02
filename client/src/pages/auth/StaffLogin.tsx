import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

export default function StaffLogin() {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useStore((state: any) => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ id: 'staff1', role: 'staff' });
    navigate('/staff/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#112240] p-10 rounded-lg shadow-2xl border border-teal-500/30">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-teal-400">STAFF PORTAL</h2>
          <p className="text-slate-400 text-sm mt-2">Internal Access Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input 
            type="text" 
            placeholder="Staff ID" 
            className="bg-[#0a192f] border border-slate-700 p-3 rounded text-slate-200 focus:border-teal-400 outline-none transition"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="bg-[#0a192f] border border-slate-700 p-3 rounded text-slate-200 focus:border-teal-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit" className="bg-teal-500 text-slate-900 p-3 rounded font-bold hover:bg-teal-400 transition">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
