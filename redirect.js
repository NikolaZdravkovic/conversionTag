// import { mainFunction, arrivalPage,createCookie ,httpGetAsync} from './utils/utils.js';

// var url = 'https://nikolazdravkovic.github.io/ikeaTest/';

// httpGetAsync();

// mainFunction(document);

// arrivalPage(url);

// createCookie();




//NEW CODE FOR TEST 

var redirectUrl = window.location.href;
var queryString;

function prepareFrame() {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute('id', 'receiver');
    ifrm.setAttribute("src", "https://nikolazdravkovic.github.io/ikeaTest/");
    ifrm.style.width = "0";
    ifrm.style.height = "0";
    ifrm.style.border = '0';
    document.body.appendChild(ifrm);
}
prepareFrame();

// Send request to BigQuery

function getQuery() {



    if (redirectUrl.match(/\?./)) {

        // queryString = redirectUrl.split('?').pop()
        queryString = window.location.search;
        console.log(queryString);



    } else {
        console.log('query don`t exist')
    }

}
var receiver = document.getElementById('receiver').contentWindow;
var iframeSrc = document.getElementById('receiver').src;


function sendMessage() {

    // Send a message to the receiver window.
    receiver.postMessage(queryString, iframeSrc);

}
// Redirekt na Ikea sajt za 15 sekundi
function arrivalPage() {
    setTimeout(function () {
        window.location.href = iframeSrc;
        // alert('stigao sam u Ikeu!')
    }, 15000);
}
// Send request to BigQuery
function httpGetAsync() {

    var queryURL;

    if (queryString !== undefined) {

        queryURL = 'https://bpt.easyvoyage.fr/pixel.png' + queryString;


    } else {
        queryURL = 'https://bpt.easyvoyage.fr/pixel.png';
    }
    var http = new XMLHttpRequest()

    http.open("GET", queryURL)
    http.send()

    http.onload = function () { console.log(http.responseText) };


}

getQuery();
sendMessage();
arrivalPage();
//httpGetAsync();


