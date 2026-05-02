import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaArrowLeft, FaStepForward, FaStepBackward } from 'react-icons/fa';

export default function Watch() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Temporary mock data for testing
  const video = {
    title: 'Neon Genesis',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  };

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (playing) setShowControls(false);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [playing]);

  const handlePlayPause = () => setPlaying(!playing);
  
  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };
  
  const handleSeekMouseUp = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    if (!showControls) {
      setPlayed(state.played);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col group">
      <ReactPlayer
        ref={playerRef}
        url={video.url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={(d) => setDuration(d)}
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          file: {
            forceHLS: true,
          }
        } as any}
      />

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 flex flex-col justify-between ${showControls ? 'opacity-100' : 'opacity-0 cursor-none'}`}
      >
        {/* Top bar */}
        <div className="p-6 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white hover:text-[#ff4d38] transition">
            <FaArrowLeft className="text-2xl" />
          </button>
          <h2 className="text-xl font-bold text-white">{video.title}</h2>
        </div>

        {/* Bottom bar */}
        <div className="p-6 pb-8">
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-white text-sm w-12 text-center">{formatTime(played * duration)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#ff4d38]"
            />
            <span className="text-white text-sm w-12 text-center">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-6 text-white">
              <button onClick={handlePlayPause} className="hover:text-[#ff4d38] transition">
                {playing ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
              </button>
              
              <button onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)} className="hover:text-[#ff4d38] transition">
                <FaStepBackward className="text-xl" />
              </button>
              
              <button onClick={() => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)} className="hover:text-[#ff4d38] transition">
                <FaStepForward className="text-xl" />
              </button>

              <div className="flex items-center gap-2 group/volume">
                <button onClick={() => setMuted(!muted)} className="hover:text-[#ff4d38] transition">
                  {muted || volume === 0 ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setMuted(false);
                  }}
                  className="w-0 group-hover/volume:w-20 transition-all duration-300 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#ff4d38] origin-left"
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-6 text-white">
              <button onClick={toggleFullScreen} className="hover:text-[#ff4d38] transition">
                <FaExpand className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
