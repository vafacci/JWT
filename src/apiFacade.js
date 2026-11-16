/*
  setToken(token): Store the JWT token in local storage.

*/

import config from './config'


async function login(username, password){
  const response = await fetch(config.API_URL+config.AUTH_LOGIN, {    
    method: 'POST',
    body: JSON.stringify({username, password}), 
       headers: {"Content-Type": "application/json"} 
  });
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Invalid username or password ')
  }

  console.log(data)
  localStorage.setItem('jwtToken', data.token)


}

function getToken() {
  return localStorage.getItem("jwtToken")
}

function loggedIn() {
  return getToken() !== null
}

function logout(){
  localStorage.removeItem("jwtToken")
}

async function getData(){
  const response = await fetch(config.API_URL + config.USERPROTECTED, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    }
  });
  const data = await response.json();
  return data;
}

export {login, getData, loggedIn, logout};
