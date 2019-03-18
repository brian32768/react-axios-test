export const actions = {
    ACTIONTYPE: "STRING",
};

// FIXME this key is not going to be unique after reload
let _id = 1;
export function uniqueId() {
    return _id++;
}
