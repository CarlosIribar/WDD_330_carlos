import {makeRequest} from './authHelpers.js';
import Auth from './auth.js'
// makeRequest('login', 'POST', {
//     password: 'user1',
//     email: 'user1@email.com'
// });

const auth = new Auth();

function submit() {
    event.preventDefault();
    console.log('submit');
    auth.login(getPosts);
}

async function getPosts() {
    console.log('callback')
    try {
      const response = await makeRequest('posts', 'GET', null, auth.token);
      console.log(response);
      var ul = document.getElementById('posts');
      ul.innerHTML = '';
      response.forEach(item => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item.title));
        ul.appendChild(li);
      })
    } catch (error) {
    }
  }

document.getElementById('submit').onclick = submit;