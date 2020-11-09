"use strict";

Widget.register("gesource", function (widget) {
    var radarOnBtn = widget.template(".radar-on");
    /**
     * On initialization
     */
    widget.onInit = function () {
        widget.content.append(serverLogsBtn);  
    };

    // update playerlist when backend updates are done
    widget.onBackendUpdate = function () {
    };

    // update playerlist when backend send the serverstatus
    widget.onBackendMessage = function (message) {

    };
});