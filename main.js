var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/////////////////////////////////////////////////////////////////////////

var initParameters = {
	clientID: "MVG9uudbyLbNPZOEM.vAy8Y1H8RF8ocpnP1nW2Nt_2a9aFFOjolOIyKa6.1QCCfC9ZreHWPMWEIJhSnQuQqP",
	clientSecret: "4299800700281945236",
	redirectUri: "https://hello-world360.herokuapp.com/",
	environment: "https://na30.salesforce.com/services/oauth2/token",
};

HttpClient httpclient = new HttpClient();
PostMethod post = new PostMethod(environment);

post.addParameter("code",code);
post.addParameter("grant_type","authorization_code");
post.addParameter("client_id",initParameters.clientID;
post.addParameter("client_secret",initParameters.clientSecret);
post.addParameter("redirect_uri",initParameters.redirectUri);

//////////////////////////////////////////////////////////////////////////

httpclient.executeMethod(post);
String responseBody = post.getResponseBodyAsString();
    
String accessToken = null;
JSONObject json = null;
try {
    json = new JSONObject(responseBody);
    accessToken = json.getString("access_token");
    issuedAt = json.getString("issued_at");
    /** Use this to validate session
    * instead of expiring on browser close.
    */
                                 
} catch (JSONException e) {
    e.printStackTrace();
}
HttpServletResponse httpResponse = (HttpServletResponse)response;
Cookie session = new Cookie(ACCESS_TOKEN, accessToken);
session.setMaxAge(-1); //cookie not persistent, destroyed on browser exit
httpResponse.addCookie(session);

//////////////////////////////////////////////////////////////////////////

HttpClient httpclient = new HttpClient();
GetMethod gm = new GetMethod(serviceUrl);
     
//set the token in the header
gm.setRequestHeader("Authorization", "Bearer "+accessToken);
//set the SOQL as a query param
NameValuePair[] params = new NameValuePair[1];
        
/**
* other option instead of query string, pass just the fields you want back:
*  https://instance_name.salesforce.com/services/data/v20.0/sobjects/Account/
*       001D000000INjVe?fields=AccountNumber,BillingPostalCode
*/
params[0] = new NameValuePair("q","SELECT name, title FROM Contact LIMIT 100");
gm.setQueryString(params);
  
httpclient.executeMethod(gm);
String responseBody = gm.getResponseBodyAsString();
//exception handling removed for brevity
JSONObject json = new JSONObject(responseBody);
  
JSONArray results = json.getJSONArray("records");
                     
for(int i = 0; i < results.length(); i++)
    response.getWriter().write(results.getJSONObject(i).getString("Name")+","
    	+results.getJSONObject(i).getString("Title")+"\n");