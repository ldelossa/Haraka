// var stub      = require('./fixtures/stub');
// var constants = require('./../constants');
// var Logger    = require('./fixtures/stub_logger');
// var utils     = require('./../utils');
var server       = require('./../server');

function _set_up(callback) {
    this.server = server;

    callback();
}

function _tear_down(callback) {
    callback();
}

exports.get_listen_addrs = {
    setUp : _set_up,
    tearDown : _tear_down,
    'IPv4 fully qualified' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '127.0.0.1:25'});
        test.deepEqual(['127.0.0.1:25'], listeners);
        test.done();
    },
    'IPv4, default port' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '127.0.0.1'});
        test.deepEqual(['127.0.0.1:25'], listeners);
        test.done();
    },
    'IPv4, custom port' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '127.0.0.1'}, 250);
        test.deepEqual(['127.0.0.1:250'], listeners);
        test.done();
    },
    'IPv6 fully qualified' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '[::1]:25'});
        test.deepEqual(['[::1]:25'], listeners);
        test.done();
    },
    'IPv6, default port' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '[::1]'});
        test.deepEqual(['[::1]:25'], listeners);
        test.done();
    },
    'IPv6, custom port' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '[::1]'}, 250);
        test.deepEqual(['[::1]:250'], listeners);
        test.done();
    },
    'IPv4 & IPv6 fully qualified' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '127.0.0.1:25,[::1]:25'});
        test.deepEqual(['127.0.0.1:25','[::1]:25'], listeners);
        test.done();
    },
    'IPv4 & IPv6, default port' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '127.0.0.1:25,[::1]'});
        test.deepEqual(['127.0.0.1:25','[::1]:25'], listeners);
        test.done();
    },
    'IPv4 & IPv6, custom port' : function (test) {
        test.expect(1);
        var listeners = this.server.get_listen_addrs({listen: '127.0.0.1,[::1]'}, 250);
        test.deepEqual(['127.0.0.1:250','[::1]:250'], listeners);
        test.done();
    },

};

exports.get_smtp_server = {
    setUp : _set_up,
    tearDown : _tear_down,
    'gets a net server object': function (test) {
        test.expect(2);
        var server = this.server.get_smtp_server('127.0.0.1', 2501, 10);
        test.ok(server);
        server.getConnections(function (err, count) {
            test.equal(0, count);
            test.done();
        });
    },
};
