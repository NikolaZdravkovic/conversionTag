import { double,  redirect } from './utils/utils.js';

var button = document.getElementById('button');
var redirectUrl = 'http://127.0.0.1:5500/redirect.html?utm_source=newsletter&utm_medium=email&utm_campaign=jelena';

button.addEventListener('click', function () {
    redirect(redirectUrl)
})

console.log(double(5))