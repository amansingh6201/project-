import { create } from 'zustand'

interface StoreState {
  user: any | null
  setUser: (user: any) => void
  clearUser: () => void
}

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useStore
