import { create } from "zustand";

const useStore = create((set) => ({
  url: "",
  name: "",
  setUrlImage: (url) => set({ url }),
  setName: (name) => set({ name }),
}));

export default useStore;
