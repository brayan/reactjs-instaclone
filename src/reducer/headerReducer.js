export function header(state = "", action) {
    if (action.type === "SHOW_MESSAGE") {
        return action.message;
    }

    return state;
}