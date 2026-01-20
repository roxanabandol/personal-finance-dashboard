import { create } from "zustand";

interface UIState {
  isModalOpen: boolean;
  loading: boolean;
  error: string | null;
  openModal: () => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  loading: false,
  error: null,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setLoading: (loading) => set({ loading }),
  setError: (message) => set({ error: message }),
}));
