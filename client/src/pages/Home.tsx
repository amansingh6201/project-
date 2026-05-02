import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // In a real app, this would fetch from Supabase.
    // Since Phase 8 (Supabase setup) is manual and might not be done yet,
    // we use a safe fallback so the UI works immediately for testing.
    setFeatured({
      id: '1',
      title: 'Neon Genesis',
      description: 'In a post-apocalyptic world, teenagers pilot giant mechs to defend humanity from mysterious alien beings known as Angels.',
      video_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      backdrop_url: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2000&auto=format&fit=crop',
      rating: 'U/A 16+',
      genres: ['Anime', 'Sci-Fi', 'Action']
    });

    const mockData = Array(10).fill(null).map((_, i) => ({
      id: i.toString(),
      title: `Show Title ${i}`,
      thumbnail_url: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop&sig=${i}`,
      year: 2024,
      rating: 'U/A',
      duration: '2h 10m',
      genres: ['Action', 'Drama']
    }));

    setRows([
      { title: 'Trending Now', data: mockData },
      { title: 'New Releases', data: mockData },
      { title: 'Anime', data: mockData },
      { title: 'Movies', data: mockData },
      { title: 'Top Rated', data: mockData },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Banner */}
      {featured && (
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          
          <img 
            src={featured.backdrop_url} 
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-[20%] left-8 md:left-16 z-20 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-lg" style={{fontFamily: "'Bebas Neue', sans-serif"}}>
              {featured.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm mb-4 font-semibold text-gray-300">
              <span className="border border-gray-400 px-2 py-0.5 rounded text-xs">{featured.rating}</span>
              <span>{featured.genres.join(' • ')}</span>
            </div>

            <p className="text-lg text-gray-200 mb-8 line-clamp-3 max-w-xl drop-shadow-md">
              {featured.description}
            </p>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-white/80 transition">
                <FaPlay className="text-sm" /> Play Now
              </button>
              <button className="flex items-center gap-2 bg-gray-500/50 text-white px-6 py-2.5 rounded font-bold hover:bg-gray-500/70 transition backdrop-blur-sm">
                <FaInfoCircle className="text-lg" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Rows */}
      <div className="pb-20 -mt-24 relative z-20">
        {rows.map((row, index) => (
          <div key={index} className="mb-8 pl-8 md:pl-16">
            <h2 className="text-xl font-bold mb-4 text-gray-100">{row.title}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {row.data.map((item, i) => (
                <div key={i} className="flex-none w-[250px] group relative cursor-pointer snap-start transition duration-300 ease-in-out hover:scale-105 hover:z-30">
                  <img 
                    src={item.thumbnail_url} 
                    alt={item.title}
                    className="w-full h-[140px] object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex flex-col justify-end p-4">
                    <h3 className="font-bold text-sm truncate">{item.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-300 mt-1">
                      <span className="border border-gray-500 px-1 rounded">{item.rating}</span>
                      <span>{item.year}</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
