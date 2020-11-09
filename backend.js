"use strict";

var Widget = require(__dirname + "/../../../src/widget");
var steamapi = require(__dirname + "/../../../src/steamapi");

var widget = new Widget();

/** @type {object} */
widget.serverstatus = {};

/**
 * On rcon server has successfully connected and authenticated
 * @param {RconServer} server
 */
widget.onServerConnected = function (server) {
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