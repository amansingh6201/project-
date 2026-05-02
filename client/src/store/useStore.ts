import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  watchlist: [],
  continueWatching: [],
  setUser: (user) => set({ user }),
  addToWatchlist: (item) => set((state) => ({ watchlist: [...state.watchlist, item] })),
  removeFromWatchlist: (id) => set((state) => ({ 
    watchlist: state.watchlist.filter(item => item.id !== id) 
  })),
  setContinueWatching: (items) => set({ continueWatching: items }),
}));

export default useStore;
