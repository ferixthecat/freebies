import zustandStorage from '@/utils/zustandStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  user: any;
  setUser: (user: any) => any;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: any) => set({ user }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useUserStore;