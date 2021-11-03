import $ from 'jquery';
import { base64Encode } from '../scripts/base64';


export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        $.post("/api/v1/Auth/LogIn", { username, password }, (OK) => {
            return true;
        }).fail(() => {
            return false;
        });
    });
}


// Context/actions.js


const ROOT_URL = '';

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Encode(`${loginPayload.username}:${loginPayload.password}`)}`
    }
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    return;
  } catch (error) {
    return;
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
}
