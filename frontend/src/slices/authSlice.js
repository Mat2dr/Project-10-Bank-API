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

            localStorage.setItem('token', JSON.stringify(token.data.body.token));
            return token.data.body.token
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUser = createAsyncThunk("auth/getUser", async (token, { rejectWithValue }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const bodyParameters = {
            key: "value"
            };
            const res = await axios.post(`http://localhost:3001/api/v1/user/profile`, bodyParameters, config);
            return res;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const modifyUser = createAsyncThunk("auth/modifyUser", async (values, { rejectWithValue }) => {
    try {
        const firstName = values.firstName;
        const lastName = values.lastName;
        const config = {
            headers: { Authorization: `Bearer ${values.token}` }
        };
        
        const res = await axios.put(`http://localhost:3001/api/v1/user/profile`, {
            firstName,
            lastName
          }, config);
        return res;
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
            if(action.payload) {
                const user = jwt_decode(action.payload);

                return {
                    ...state,
                    token: action.payload,
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
        builder.addCase(getUser.fulfilled, (state, action) => {
            if(action.payload) {
                return {
                    ...state,
                    _id: action.payload.data.body.id,
                    email: action.payload.data.body.email,
                    firstName: action.payload.data.body.firstName,
                    lastName: action.payload.data.body.lastName,
                }
            } else return state
        });
        builder.addCase(modifyUser.fulfilled, (state, action) => {
            if(action.payload) {
                return {
                    ...state,
                    firstName: action.payload.data.body.firstName,
                    lastName: action.payload.data.body.lastName,
                }
            } else return state
        });
    }
});

export const {loadUser, logoutUser} = authSlice.actions

export default authSlice.reducer;