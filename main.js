import { redirect } from './utils/utils.js';

var button = document.getElementById('button');
var redirectUrl = 'https://nikolazdravkovic.github.io/conversionTag/redirect?utm_source=newsletter&utm_medium=email&utm_campaign=nikola';

button.addEventListener('click', function () {
    redirect(redirectUrl)
})
