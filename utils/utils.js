//http://127.0.0.1:5500/redirect.html?utm_source=newsletter&utm_medium=email&utm_campaign=jelena

var newCookieValues = [];


function mainFunction(document) {
    var document = document;
    var referrer = document.referrer;
    var gaReferral = {
        'utmcsr': '(direct)',
        'utmcmd': '(none)',
        'utmccn': '(not set)'
    };
    var thisHostname = document.location.hostname;
    var thisDomain = getDomain_(thisHostname);
    var referringDomain = getDomain_(document.referrer);
    var sessionCookie = getCookie_('__utmzzses');
    var cookieExpiration = new Date(+new Date() + 1000 * 60 * 60 * 24 * 30 * 24);
    var qs = document.location.search.replace('?', '');
    var hash = document.location.hash.replace('#', '');
    var gaParams = parseGoogleParams(qs + '#' + hash);
    var referringInfo = parseGaReferrer(referrer);
    var storedVals = getCookie_('__utmz') || getCookie_('__utmzz');
    var newCookieVals = [];
    var keyMap = {
        'utm_source': 'utmcsr',
        'utm_medium': 'utmcmd',
        'utm_campaign': 'utmccn',
        'utm_content': 'utmcct',
        'utm_term': 'utmctr',
        'gclid': 'utmgclid',
        'dclid': 'utmdclid'
    };

    var keyFilter = ['utmcsr', 'utmcmd', 'utmccn', 'utmcct', 'utmctr'];
    var keyName,
        values,
        _val,
        _key,
        raw,
        key,
        len,
        i;

    // Define variables - take values from url
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var fbclidValue = url.searchParams.get("fbclid");
    var gclidValue = url.searchParams.get("gclid");
    var msclkidValue = url.searchParams.get("msclkid");
    var msclkid = 'msclkid';
    var gclid = 'gclid';
    var fbclid = 'fbclid';
    var campaignTrafficSourceId;

    //sessionStorage.setItem('cookieSession', '');
    var cookieSession = sessionStorage.getItem('cookieSession');

    if (url_string.indexOf('&' + fbclid + '=') != -1) {
        campaignTrafficSourceId = 'fbclid=' + fbclidValue;
        newCookieValues.push(fbclid + '=' + campaignTrafficSourceId)

    } else if (url_string.indexOf('&' + gclid + '=') != -1) {
        campaignTrafficSourceId = 'gclid=' + gclidValue;
        newCookieValues.push(gclid + '=' + campaignTrafficSourceId)


    } else if (url_string.indexOf('&' + msclkid + '=') != -1) {
        campaignTrafficSourceId = 'msclkid=' + msclkidValue;
        newCookieVals.push( campaignTrafficSourceId)

    }



    if (sessionCookie && referringDomain === thisDomain) {

        gaParams = null;
        referringInfo = null;

    }

    if (gaParams && (gaParams.utm_source || gaParams.gclid || gaParams.dclid)) {

        for (key in gaParams) {

            if (typeof gaParams[key] !== 'undefined') {

                keyName = keyMap[key];
                gaReferral[keyName] = gaParams[key];

            }

        }

        if (gaParams.gclid || gaParams.dclid) {

            gaReferral.utmcsr = 'google';
            gaReferral.utmcmd = gaReferral.utmgclid ? 'cpc' : 'cpm';

        }

    } else if (referringInfo) {

        gaReferral.utmcsr = referringInfo.source;
        gaReferral.utmcmd = referringInfo.medium;
        if (referringInfo.term) gaReferral.utmctr = referringInfo.term;

    } else if (storedVals) {

        values = {};
        raw = storedVals.split('|');
        len = raw.length;

        for (i = 0; i < len; i++) {

            _val = raw[i].split('=');
            _key = _val[0].split('.').pop();
            values[_key] = _val[1];

        }

        gaReferral = values;

    }

    for (key in gaReferral) {

        if (typeof gaReferral[key] !== 'undefined' && keyFilter.indexOf(key) > -1) {

            newCookieVals.push(key + '=' + gaReferral[key]);

        }

    }

    if (!getCookie_('initialTrafficSource')) {
        writeCookie_('initialTrafficSource', newCookieVals.join('|'), cookieExpiration, '/', thisDomain, campaignTrafficSourceId);
    }
    // if (!getCookie_('esvTrafficSource')) {
    //     sessionStorage.setItem('cookieSession', 'false');
    //     writeCurrentCookie_('esvTrafficSource', newCookieVals.join('|'), campaignTrafficSourceId, 30);
    // }
    if (cookieSession == 'true') {
        writeCurrentCookie_('esvTrafficSource', newCookieVals.join('|'), campaignTrafficSourceId, 30);
        sessionStorage.setItem('cookieSession', 'false');
    }


    writeCookie_('__utmzzses', 1, null, '/', thisDomain);
    writeCurrentCookie_('__utmzzses', 1, null, '/', thisDomain);

    // Replace cookie after 30 min
    // var countdown = 30 * 60 * 1000;
    // var timerId = setInterval(function () {
    //     countdown -= 1000;
    //     if (countdown <= 0) {
    //         writeCurrentCookie_('esvTrafficSource', newCookieVals.join('|'), '/', thisDomain, null, campaignTrafficSourceId);
    //         sessionStorage.setItem('cookieSession', 'true');
    //         clearInterval(timerId);
    //     }

    // }, 1000);


    function parseGoogleParams(str) {

        var campaignParams = ['source', 'medium', 'campaign', 'term', 'content'];
        var regex = new RegExp('(utm_(' + campaignParams.join('|') + ')|(d|g)clid)=.*?([^&#]*|$)', 'gi');
        var gaParams = str.match(regex);
        var paramsObj,
            vals,
            len,
            i;

        if (gaParams) {

            paramsObj = {};
            len = gaParams.length;

            for (i = 0; i < len; i++) {

                vals = gaParams[i].split('=');

                if (vals) {

                    paramsObj[vals[0]] = vals[1];

                }

            }

        }

        return paramsObj;

    }

    function parseGaReferrer(referrer) {

        if (!referrer) return;

        var searchEngines = {
            'daum.net': {
                'p': 'q',
                'n': 'daum'
            },
            'eniro.se': {
                'p': 'search_word',
                'n': 'eniro '
            },
            'naver.com': {
                'p': 'query',
                'n': 'naver '
            },
            'yahoo.com': {
                'p': 'p',
                'n': 'yahoo'
            },
            'msn.com': {
                'p': 'q',
                'n': 'msn'
            },
            'bing.com': {
                'p': 'q',
                'n': 'live'
            },
            'aol.com': {
                'p': 'q',
                'n': 'aol'
            },
            'lycos.com': {
                'p': 'q',
                'n': 'lycos'
            },
            'ask.com': {
                'p': 'q',
                'n': 'ask'
            },
            'altavista.com': {
                'p': 'q',
                'n': 'altavista'
            },
            'search.netscape.com': {
                'p': 'query',
                'n': 'netscape'
            },
            'cnn.com': {
                'p': 'query',
                'n': 'cnn'
            },
            'about.com': {
                'p': 'terms',
                'n': 'about'
            },
            'mamma.com': {
                'p': 'query',
                'n': 'mama'
            },
            'alltheweb.com': {
                'p': 'q',
                'n': 'alltheweb'
            },
            'voila.fr': {
                'p': 'rdata',
                'n': 'voila'
            },
            'search.virgilio.it': {
                'p': 'qs',
                'n': 'virgilio'
            },
            'baidu.com': {
                'p': 'wd',
                'n': 'baidu'
            },
            'alice.com': {
                'p': 'qs',
                'n': 'alice'
            },
            'yandex.com': {
                'p': 'text',
                'n': 'yandex'
            },
            'najdi.org.mk': {
                'p': 'q',
                'n': 'najdi'
            },
            'seznam.cz': {
                'p': 'q',
                'n': 'seznam'
            },
            'search.com': {
                'p': 'q',
                'n': 'search'
            },
            'wp.pl': {
                'p': 'szukaj ',
                'n': 'wirtulana polska'
            },
            'online.onetcenter.org': {
                'p': 'qt',
                'n': 'o*net'
            },
            'szukacz.pl': {
                'p': 'q',
                'n': 'szukacz'
            },
            'yam.com': {
                'p': 'k',
                'n': 'yam'
            },
            'pchome.com': {
                'p': 'q',
                'n': 'pchome'
            },
            'kvasir.no': {
                'p': 'q',
                'n': 'kvasir'
            },
            'sesam.no': {
                'p': 'q',
                'n': 'sesam'
            },
            'ozu.es': {
                'p': 'q',
                'n': 'ozu '
            },
            'terra.com': {
                'p': 'query',
                'n': 'terra'
            },
            'mynet.com': {
                'p': 'q',
                'n': 'mynet'
            },
            'ekolay.net': {
                'p': 'q',
                'n': 'ekolay'
            },
            'rambler.ru': {
                'p': 'words',
                'n': 'rambler'
            },
            'google': {
                'p': 'q',
                'n': 'google'
            }
        };
        var a = document.createElement('a');
        var values = {};
        var searchEngine,
            termRegex,
            term;

        a.href = referrer;

        // Shim for the billion google search engines
        if (a.hostname.indexOf('google') > -1) {

            referringDomain = 'google';

        }

        if (searchEngines[referringDomain]) {

            searchEngine = searchEngines[referringDomain];
            termRegex = new RegExp(searchEngine.p + '=.*?([^&#]*|$)', 'gi');
            term = a.search.match(termRegex);

            values.source = searchEngine.n;
            values.medium = 'organic';

            values.term = (term ? term[0].split('=')[1] : '') || '(not provided)';

        } else if (referringDomain !== thisDomain) {

            values.source = a.hostname;
            values.medium = 'referral';

        }

        return values;

    }

    function writeCookie_(name, value, expiration, path, domain, id) {

        if (id) {
            var str = name + '=' + value + id + ';';
        } else {
            var str = name + '=' + value + ';';
        }
        if (expiration) str += 'Expires=' + expiration.toGMTString() + ';';
        if (path) str += 'Path=' + path + ';';
        if (domain) str += 'Domain=' + domain + ';';

        document.cookie = str;

    }
    function writeCurrentCookie_(name, value, id, minutes) {

        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        if (id) {
            var str = name + '=' + value + id + expires + ';';

        } else {
            var str = name + '=' + value + expires + ';';
        }

        //if (path) str += 'Path=' + path + ';';
        //if (domain) str += 'Domain=' + domain + ';';

        document.cookie = str;

    }

    function getCookie_(name) {

        var cookies = '; ' + document.cookie
        var cvals = cookies.split('; ' + name + '=');

        if (cvals.length > 1) return cvals.pop().split(';')[0];

    }

    function getDomain_(url) {

        if (!url) return;

        var a = document.createElement('a');
        a.href = url;

        try {

            return a.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)[0];

        } catch (squelch) { }

    }
    //newCookieValues.push(newCookieVals)
    newCookieValues=newCookieVals;
    // newCookieValues = [...newCookieValues, newCookieVals];
   console.log(newCookieValues)
}

function double(n) {
    return n * 2
}

// Otvori redirekt stranicu
function redirect(redirectUrl) {
    window.open(redirectUrl, "_blank");

}

// Redirekt na Ikea sajt za 15 sekundi
function arrivalPage(url) {
    setTimeout(() => {
        window.location.href = url;
        // alert('stigao sam u Ikeu!')
    }, 15000);
}

//Kreiraj mi cookie i uzmi parametre iz URL-a
function createCookie() {
    var receiver = document.getElementById('receiver').contentWindow;
    var iframeSrc = document.getElementById('receiver').src;

  
    function sendMessage() {

        // Send a message with the text 'Hello Treehouse!' to the receiver window.
        receiver.postMessage(newCookieValues, iframeSrc);
    }

 
    sendMessage()

}

export { double, mainFunction, redirect, arrivalPage, createCookie }