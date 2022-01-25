import { CHANGE_MODE_COLOR, CHANGE_NAV_COLOR } from './constants';

export const initialState = {
    navColor: '#58249c',
    modeColor: 'dark',
};

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_NAV_COLOR:
            return { ...state, navColor: action.payload };
        case CHANGE_MODE_COLOR:
            return { ...state, modeColor: action.payload };
        default:
            return state;
    }
};

export default reducer;
