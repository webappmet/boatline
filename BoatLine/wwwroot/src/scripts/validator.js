let regex = {
    password: "^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9]).{8,}$",
}

export const username = (value) => {
    if (value && value.length > 0) return true;
    else return "Username is required";
}

export const password = (value) => {
    if (value && value.length > 0) return true;
    else return "Password is required";
}

export const newPassword = (value) => {
    return value.match(regex.password) ? true : 'Password must be 8 characters long, contain an upper case letter and a number';
}