import { mainFunction, arrivalPage,createCookie ,httpGetAsync} from './utils/utils.js';

var url = 'https://nikolazdravkovic.github.io/ikeaTest/';

httpGetAsync();

mainFunction(document);

arrivalPage(url);

createCookie();

