const mongoose=require("mongoose");

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mac : {
        type: String,
        unique : true,
        required: true,
        validate: {
            validator: function(value) {
              return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/.test(value);
            },
            message: props => `${props.value} is not a valid MAC address!`
        }
        
    },
    description : {
        type: String,
        required: false
    },
    model : {
        type: String,
        required: false
    },

    location : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
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

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;