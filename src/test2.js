var jsdom = require('jsdom');
var $ = require('jquery');
//******example 1*****
jsdom.env({
url: "https://www.allaboutbirds.org/guide/Northern_Cardinal/id",
scripts: ["http://code.jquery.com/jquery.js"],
done: function (errors, window) {
var $ = window.$;
console.log($("title").text());
}
});
//end example 1 *****
