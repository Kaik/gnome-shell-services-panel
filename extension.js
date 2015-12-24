
// extension root object
const Me = imports.misc.extensionUtils.getCurrentExtension();

// aliases for used modules
const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const GLib = imports.gi.GLib;
const Util = imports.misc.util;

// StatusIcon manager
let panel_icon = 'services-panel-icon';


/*
 * Indicator class.
 *
 * Creates an actor in the StatusArea panel. Provides menu for manipulating
 * visiblity of other icons.
 */
const Indicator = new Lang.Class({
    Name: 'Indicator',
    Extends: PanelMenu.Button,

    /**
     * Creates an actor object, which can be added to the status area,
     *
     * @constructor
     * @this {Indicator}
     * @param {string} icon an icon name
     */
    _init: function(icon) {

        this.parent(0.0, 'Services Panel');

        statusIcon = new St.Icon({
            icon_name: icon,
            style_class: panel_icon
        });

        this.actor.add_actor(statusIcon);

        //this._settings = Convenience.getSettings();
        this._createMenu();
    },

    /**
     * Creates menu for the Indicator. It will be popuped on RMB click.
     *
     * @private
     * @this {Indicator}
     */
    _createMenu: function() {
        menuItemApache = new PopupMenu.PopupSwitchMenuItem("Web Server", isApacheActive());
        this.menu.addMenuItem(menuItemApache);
        menuItemApache.statusAreaKey = "Web Server";
    },

});


/*
 * Extension definition.
 */

function Extension() {
    this._init();
}

Extension.prototype = {
    _init: function() {
        this._indicator = null;
    },

    enable: function() {
        this._indicator = new Indicator('');
        Main.panel.addToStatusArea('Services Panel', this._indicator);
    },



    disable: function() {
        this._indicator.destroy();
        this._indicator = null;
    }

};


/**
 * Entry point.
 *
 * Should return an object with callable `enable` and `disable` properties.
 */

// A JSON Object that keeps strings -
//Useful for creating settings


function init() {
    return new Extension();
}



function isApacheActive() {
    return "active";
}
