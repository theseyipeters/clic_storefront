import { createSlice } from "@reduxjs/toolkit";

interface ActionState {
	cartDrawer: boolean;
}

const initialState: ActionState = {
	cartDrawer: false,
};

const actionSlice = createSlice({
	name: "action",
	initialState,
	reducers: {
		toggleCartDrawer: (state, action) => {
			state.cartDrawer = action.payload;
		},
	},
});

export const { toggleCartDrawer } = actionSlice.actions;

export default actionSlice.reducer;
