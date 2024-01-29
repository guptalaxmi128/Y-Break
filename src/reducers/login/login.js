import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    // admins: [],
    login: null, 
    isAuthenticated: false,
    state: 'idle', 
    error: null
};


const storedProfile = localStorage.getItem('profile');
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;

const loginReducer = (state = { ...initialState, login: initialProfile }, action) => {
    switch (action.type) {
        // case actionTypes.ADD_ADMIN:
        //     // Update the stored profile in localStorage when admin is added
        //     localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        //     return {
        //         ...state,
        //         admins: action.payload.admins
        //     };
        case actionTypes.LOGIN:
            // Update the stored profile in localStorage when admin logs in
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return {
                ...state,
                login: action.payload,
                isAuthenticated: true,
            };
            case actionTypes.LOGOUT:
                localStorage.removeItem('profile');
                return {
                    ...state,
                    login: null,
                    isAuthenticated: false,
                };
        default:
            return state;
    }
};

export default loginReducer;
