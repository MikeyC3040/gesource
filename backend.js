"use strict";

var Widget = require(__dirname + "/../../../src/widget");
var steamapi = require(__dirname + "/../../../src/steamapi");

var widget = new Widget();

/** @type {object} */
widget.availableMaps = {};
widget.gamePlayList = {};
widget.weaponList = {};

/**
 * On rcon server has successfully connected and authenticated
 * @param {RconServer} server
 */
widget.onServerConnected = function (server) {
    widget.gamePlayList[server.id] = [];
    widget.availableMaps[server.id] = [];
    widget.weaponList[server.id] = [];
    server.cmd("ge_gameplaylist", null, false, function(data){
        var lines = data.split("\n");
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i];
            widget.gamePlayList[server.id].push(line);
        }
    });
    server.cmd("maps *", null, false, function(data){
        var lines = data.split("\n");
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i].substring(16).split(".")[0];
            widget.availableMaps[server.id].push(line);
        }
    });
    server.cmd("ge_weaponset_list", null, false, function(data){
        var lines = data.split("\n");
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i];
            widget.weaponList[server.id].push(line);
        }
    });
};

/**
 * Fired when widget is added to a server dashboard
 * @param {RconServer} server
 */
widget.onWidgetAdded = function (server) {
};

/**
 * On frontend message
 * @param {RconServer} server
 * @param {WebSocketUser} user
 * @param {string} action The action
 * @param {*} messageData Any message data received from frontend
 * @param {function} callback Pass an object as message data response for the frontend
 */
widget.onFrontendMessage = function (server, user, action, messageData, callback) {
    switch(action) {
        case "gamePlayList":
            callback(this, widget.gamePlayList[server.id]);
            break;
        case "availableMaps":
            callback(this, widget.availableMaps[server.id]);
            break;
        case "availableWeapons":
            callback(this, widget.weaponList[server.id]);
            break;
    }
};

/**
 * Update the serverstatus
 * @param {RconServer} server
 * @param {function=} callback
 */
widget.updateServerstatus = function (server, callback) {

};

/**
 * On widget update cycle - Fired every 30 seconds for each server
 * @param {RconServer} server
 */
widget.onUpdate = function (server) {

};

/**
 * On receive a server message
 * @param {RconServer} server
 * @param {RconMessage} message
 */
widget.onServerMessage = function (server, message) {
    // on connect or disconnect, update serverstatus
    console.log(message.body)
};

module.exports = widget;