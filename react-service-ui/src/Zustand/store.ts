import { create } from 'zustand';
type CounterStore = {
    count: number;
    secodCounter : number;
    increament :() => void;
    decreament:() => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    secodCounter: 0,
    increament: () => set((state) => ({ count: state.count + 1 })),
    decreament: () => set((state) => ({ count: state.count - 1 }))
}));