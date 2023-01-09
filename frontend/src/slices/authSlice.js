import { createSlice, createAsyncThunk, createAction, createReducer } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const initialState = {
    token: "",
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    loginStatus: '',
    loginError: '',
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post('http://localhost:3001/api/v1/user/login', {
                email: values.email,
                password: values.password,
            });
            console.log(token.data.body.token)

            localStorage.setItem('token', JSON.stringify(token.data.body.token));
            return token.data.body.token
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action){
            const token = state.token;
            if(token) {
                const user = jwt_decode(token, { header: true })

                return {
                    ...state,
                    token,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    _id: user._id,
                }
            }
        },
        logoutUser(state, action){
            localStorage.removeItem("token")

            return {
                ...state,
                token:'',
                firstName: '',
                lastName: '',
                email: '',
                _id: '',
                loginStatus: '',
                loginError: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: 'pending'};
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            console.log('1');
            if(action.payload) {
                console.log('2');
                const user = jwt_decode(action.payload);
                console.log('3');

                return {
                    ...state,
                    token: action.payload,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    _id: user._id,
                    loginStatus: 'success',
                }
            } else return state
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return { 
                ...state,
                 loginStatus: 'rejected',
                 loginError: action.payload,
                }
            });
    }
});

export const {loadUser, logoutUser} = authSlice.actions

export default authSlice.reducer;