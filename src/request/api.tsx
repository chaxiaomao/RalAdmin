import {httpPost} from "./http.tsx";


export async function login(username, password) {

    return await httpPost('/admin/user/login', JSON.stringify({
        LoginForm: {
            username: username,
            password: password,
        }
    }));

}

export async function getUsers(username, password) {

    return await httpPost('/admin/user/login', JSON.stringify({
        LoginForm: {
            username: username,
            password: password,
        }
    }));

}

export async function postFrom() {
    const data = new FormData();
    data.append("myFile", 'myFile');
    data.append("otherStuff", "stuff from a text input");
}