import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {name:"Test Name",age: 15,email:"mapi@gmail.com"}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: initialStateValue},
    reducers: {
        login:(state, action) => {
            state.value = action.payload;
        },
        logout:(state) => {
            state.value = initialStateValue;
        },
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
