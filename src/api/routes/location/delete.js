const Location = require("../../../models/location");

async function deleteLocation(req, res) {

    Location.findByIdAndDelete(req.params['locationId'], function(err, doc) {

        if(err) {
            if (err.message.indexOf('Cast to ObjectId failed') !== -1) {
                res.redirect('/location?msgtype=error&msg=' + encodeURI(`Could not delete entry "${err.value}"`));
            }
            else {
                res.redirect('/location?msgtype=error&msg=' + encodeURI(err));
            }
        } else {
            res.redirect('/location?msgtype=info&msg=' + encodeURI(`Successfully deleted ${doc.name}`));
        }

    });
   
}

module.exports = deleteLocation;