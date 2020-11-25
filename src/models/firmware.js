const mongoose=require("mongoose");
const fs = require('fs')

const firmwareSchema = myyongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    versionAvailable : {
        type: String,
        required: true,
    },
    url : {
        type: String,
        required: false,
        validator: function(value) {
            return fs.existsSync(value);
        },
        message: props => `${props.value} does not exist!`
      }
    }
}, {
    timestamps : true
});

deviceSchema.statics.findByMac = function(mac) {
    return this.find({ 
        mac: mac
    });
};

deviceSchema.statics.findByName = function(name) {
    return this.find({
        name : name
    });
};

const Firmware = mongoose.model('Firmware', firmwareSchema);

module.exports = Device;