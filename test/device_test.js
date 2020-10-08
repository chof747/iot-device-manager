var assert = require('assert');
const Device = require('../src/models/device');
const mongoose = require('mongoose');

afterEach(function(done) {
  mongoose.connection.collections.devices.drop(() => { done(); });
});

describe('Device', function () {

  var should = require('chai').should();
  const { expect } = require('chai');

  describe('#simplecreation', function () {
    it('should create a new device and save it uniquely', async function () {
      var dev = new Device({
        name : 'test',
        mac  : 'F3:A3:22:24:FF:D8'
      });

      await dev.save();
      dev.isNew.should.equal(false);

      var dev2 = new Device({
        name : 'test2',
        mac  : 'F3:A3:22:24:FF:D8'
      });
      await dev2.save().then(() => {
        "This is a duplicate!".should.equal("Unique");
      }
      ).catch(() => {
        "OK".should.equal("OK");
      });

    });

  });

  describe('#validation', function() {

    it('should throw a validation error if the mac address is not defined correctly', async function() {
      var dev = new Device({
        name : 'test',
        mac  : 'F3:A3:22:24:FF'
      });

      var error = dev.validateSync();
      error.errors.should.have.key('mac');
    });

  });

  describe("#findbyMac", function() {

    beforeEach(async function() {
      var dev = new Device({
        name : 'testdev1',
        mac  : 'F3:A3:22:24:FF:D8'
      });
      await dev.save();

      dev = new Device({
        name : 'testdev2',
        mac  : 'D7:F3:28:74:AE:F1'
      });
      await dev.save();
    });

    it('should find the device by its MAC address and return only one', async function() {
      var result = await Device.findByMac('D7:F3:28:74:AE:F1');
      result.should.have.lengthOf(1);
      result[0].name.should.equal('testdev2');
    });

    it('should not return an entry on a non existing MAC address', async function() {
      var result = await Device.findByMac('E7:F3:28:74:AE:F1');
      result.should.have.lengthOf(0);
    });

    it('should find the device by its name', async function() {
      var result = await Device.findByName('testdev1');
      result.should.have.lengthOf(1);
      result[0].mac.should.equal('F3:A3:22:24:FF:D8');
    });


  })
}); 