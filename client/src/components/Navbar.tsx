import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUser, FaBars } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-colors duration-300 px-8 py-4 flex items-center justify-between ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="flex items-center gap-8">
        <Link to="/home" className="text-3xl font-bold tracking-tighter text-[#ff4d38]" style={{fontFamily: "'Bebas Neue', sans-serif"}}>
          NOVASTREAM
        </Link>
        
        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link to="/home" className="hover:text-white transition-colors">Home</Link>
          <Link to="/series" className="hover:text-white transition-colors">Series</Link>
          <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
          <Link to="/anime" className="hover:text-white transition-colors">Anime</Link>
          <Link to="/watchlist" className="hover:text-white transition-colors">My List</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {searchOpen && (
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              className="bg-black/50 border border-white/30 text-sm px-3 py-1 text-white outline-none focus:border-white/80 transition-colors"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <FaSearch className="text-gray-300 hover:text-white cursor-pointer" onClick={() => setSearchOpen(true)} />
        </div>
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-300 hover:text-white" />
          <span className="absolute -top-1 -right-1 bg-[#ff4d38] text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-full">3</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center overflow-hidden">
            <FaUser className="text-gray-400" />
          </div>
        </div>
        <FaBars className="md:hidden text-gray-300 hover:text-white cursor-pointer" />
      </div>
    </nav>
  );
}
