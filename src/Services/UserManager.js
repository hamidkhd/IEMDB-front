export function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user))
}

export function userLoggedIn() {
    if(localStorage.getItem("user") == null)
        return false;
    else
        return true;
}

export function userLogout() {
    localStorage.removeItem("user");
}