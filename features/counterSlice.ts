import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
    totalServices: number;
    selectedServices: number[]; // เก็บ id ของ service ที่เลือกอยู่
}

const initialState: CounterState = {
    value: 0,
    totalServices: 0,
    selectedServices: [],
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },

        // ===== ServicesCount =====
        incrementByServices: (state) => {
            state.totalServices += 1;
        },
        decrementByServices: (state) => {
            if (state.totalServices > 0) state.totalServices -= 1;
        },
        decrementByServicesByAmount: (state, action: PayloadAction<number>) => {
            state.totalServices -= action.payload;
        },
        decrementByServicesByZero(state) {
            state.totalServices = 0;
        },

        // ===== Booking Selection =====
        toggleService: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.selectedServices.includes(id)) {
                // ถ้าเลือกไว้ → เอาออก
                state.selectedServices = state.selectedServices.filter((s) => s !== id);
                state.totalServices = Math.max(state.totalServices - 1, 0);
            } else {
                // ถ้ายังไม่เลือก → เพิ่มเข้า
                state.selectedServices.push(id);
                state.totalServices += 1;
            }
        },
        resetServices: (state) => {
            state.totalServices = 0;
            state.selectedServices = [];
        },
        setServices: (state, action: PayloadAction<number[]>) => {
            state.selectedServices = action.payload;
            state.totalServices = action.payload.length;
        },
    },
});

export const {
    increment,
    decrement,
    incrementByAmount,
    incrementByServices,
    decrementByServices,
    decrementByServicesByAmount,
    decrementByServicesByZero,
    toggleService,
    resetServices,
    setServices
} = counterSlice.actions;

export default counterSlice.reducer;
