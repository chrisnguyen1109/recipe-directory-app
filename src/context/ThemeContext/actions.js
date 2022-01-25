import { CHANGE_NAV_COLOR, CHANGE_MODE_COLOR } from './constants';

export const changeNavColor = payload => {
    return {
        type: CHANGE_NAV_COLOR,
        payload,
    };
};

export const changeModeColor = payload => {
    return {
        type: CHANGE_MODE_COLOR,
        payload,
    };
};
