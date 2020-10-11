const Location = require("../../../models/location");

async function deleteLocation(req, res) {

    Location.findByIdAndDelete(req.params['locationId'], function(err, doc) {

        if(err) {
            console.error(err);
        } else {
            console.log(`Deleted: ${doc.name}`);
        }

    });
   
}

module.exports = deleteLocation;