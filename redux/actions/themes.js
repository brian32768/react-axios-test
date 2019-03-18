import { actions } from './action-types'

export function toggleTheme() {
    console.log("actions.toggleTheme");
    return {
        type: actions.TOGGLE_THEME,
    };
}
