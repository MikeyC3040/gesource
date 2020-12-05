"use strict";

Widget.register("gesource", function (widget) {
    var quickBtns = widget.template(".btn-area");
    var gameSelect = widget.template(".gameplay-select");
    var mapSelect = widget.template(".maps-select");
    var weaponSelect = widget.template(".weapon-select");
    /**
     * On initialization
     */

    widget.addOptions = function(entries,select) {
        entries.sort();
        for (var i = 1; i < entries.length; i++) {
            var entry = entries[i];
            select.append(
                $('<option>')
                    .attr("value", entry)
                    .html('<div class="option">' +
                        '<span class="text">' + entry + '</span>' +
                        '</div>')
            );
        }
    };
    widget.onInit = function () {
        widget.backend("gamePlayList", null, function(data){
            if (!data) return;
            var select = gameSelect.find("select");
            widget.addOptions(data,select);
            select.selectpicker("refresh");
        });

        widget.backend("availableMaps", null, function(data){
            if (!data) return;
            var select = mapSelect.find("select");
            widget.addOptions(data,select);
            select.selectpicker("refresh");
        });
        widget.backend("availableWeapons", null, function(data){
            if (!data) return;
            var select = weaponSelect.find("select");
            widget.addOptions(data,select);
            select.selectpicker("refresh");
        });
        widget.content.on("click", ".radaron", function(ev){
            widget.cmd("ge_allowradar 1")
        });
        widget.content.on("click", ".radaroff", function(ev){
            widget.cmd("ge_allowradar 0")
        });
        widget.content.on("click", ".teamon", function(ev){
            widget.cmd("ge_teamplay 1")
        });
        widget.content.on("click", ".teamoff", function(ev){
            widget.cmd("ge_teamplay 0")
        });
        widget.content.on("click", ".addbot", function(ev){
            widget.cmd("ge_bot")
        });
        widget.content.on("click", ".removebot", function(ev){
            widget.cmd("ge_bot_remove 1")
        });
        widget.content.on("change", '.gameplay-select select', function(ev){
            var v = $(this).val();
            widget.cmd("ge_gameplay "+v)
        });
        widget.content.on("click", ".nextround", function(ev){
            widget.cmd("ge_endround")
        });
        widget.content.on("change", '.maps-select select', function(ev){
            var v = $(this).val();
            widget.cmd("changelevel "+v)
        });
        widget.content.on("change", '.weapon-select select', function(ev){
            var v = $(this).val().split("  (")[1].slice(0,-1);
            widget.cmd("ge_weaponset "+v)
        });
        widget.content.append(widget.template(".btn-header"));
        widget.content.append(quickBtns);
        widget.content.append(widget.template(".gameplay-header"));
        widget.content.append(gameSelect);
        widget.content.append(widget.template(".maps-header"));
        widget.content.append(mapSelect);
        widget.content.append(widget.template(".weapon-header"));
        widget.content.append(weaponSelect);        
    };

    // update playerlist when backend updates are done
    widget.onBackendUpdate = function () {
    };

    // update playerlist when backend send the serverstatus
    widget.onBackendMessage = function (message) {

    };
});