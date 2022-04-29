import {toast} from "react-toastify";

export function validateEmail(username) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(username.match(validRegex))
        return true;
    else {
        toast.error("Invalid Email");
        return false;
    }
}

export function passwordsMatch(password, repeatPass) {
    if (password != repeatPass)
        toast.error("Passwords Do Not Match");
}