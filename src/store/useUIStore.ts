import { create } from "zustand";

interface UIState {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (message) => set({ error: message }),
}));
