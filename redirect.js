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
//prepareFrame();

// Send request to BigQuery

function getQuery() {



    if (redirectUrl.match(/\?./)) {

        queryString = redirectUrl.split('?').pop()
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
    setTimeout(() => {
        window.location.href = iframeSrc;
        // alert('stigao sam u Ikeu!')
    }, 15000);
}

getQuery(); 
sendMessage(); 
arrivalPage();


