import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    totalServices : number;
}

const initialState: CounterState = {
    value: 0,
    totalServices : 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },

    //     ServicesCount
        incrementByServices : (state) => {
            state.totalServices += 1;
        },
        decrementByServices: (state) => {
            state.totalServices -= 1;
        },
        decrementByServicesByAmount: (state, action : PayloadAction<number>) => {
            state.totalServices -= action.payload;
        },
        decrementByServicesByZero(state){
            state.totalServices = 0;
        }
    },
});

// export actions
export const { increment, decrement, incrementByAmount, incrementByServices, decrementByServices, decrementByServicesByAmount, decrementByServicesByZero } = counterSlice.actions;

// export reducer
export default counterSlice.reducer;
