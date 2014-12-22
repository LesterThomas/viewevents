App to View Home Automation Events from the home_automation database
====================================================================

This application is a partner to the Node-Red application https://github.com/LesterThomas/NodeRed-flows/tree/master/Query%20BT%20router%20for%20registered%20people%20(inc%20Sonos%20welcome%20and%20Tannoy)

At the moment, it just displays some static HTML and has a proxy to the home-automation database.

This static HTML code is based on the tutorial on the Modulus Blog about [static content with Express](http://blog.modulus.io/nodejs-and-express-static-content).

The applicaiton serves static content from the /dist folder.

The database proxy is to the Cloudant database on Bluemix. Any URL's with /db/ will create a proxy to the database at https://40a04e93-daf4-47c7-9faa-f25334792d10-bluemix.cloudant.com/home-automation/