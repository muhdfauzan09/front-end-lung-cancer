import { create } from "zustand";

const useStore = create((set) => ({
  votes: "",
  setVotes: (votes) => set({ votes }),
}));

export default useStore;
