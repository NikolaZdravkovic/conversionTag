import { double,  redirect } from './utils/utils.js';

var button = document.getElementById('button');
var redirectUrl = 'https://nikolazdravkovic.github.io/conversionTag/redirect?first_name=nikola&last_name=zdravkovic';

button.addEventListener('click', function () {
    redirect(redirectUrl)
})

console.log(double(5))