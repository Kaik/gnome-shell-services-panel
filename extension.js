
// extension root object
const Me = imports.misc.extensionUtils.getCurrentExtension();
const schema = "org.gnome.shell.extensions.services-panel";
const Lib = Me.imports.lib;
const MenuItems = Me.imports.menu_items;


// aliases for used modules
const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;

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
    _init: function(menu) {

        this.parent(0.0, 'Services Panel');

        statusIcon = new St.Icon({
            icon_name: '',
            style_class: panel_icon
        });

        this.actor.add_actor(statusIcon);

        //this._settings = Convenience.getSettings();
        this._createMenu(menu);
    },

    /**
     * Creates menu for the Indicator. It will be popuped on RMB click.
     *
     * @private
     * @this {Indicator}
     */
    _createMenu: function(menu) {
        
        let items = menu.getEnableItems();
        //Main.notify(items);
	for (itemIndex in items)
	{
            let item = items[itemIndex];
            menuItem = new PopupMenu.PopupSwitchMenuItem(item['label'], isServiceActive(item['cmd']));
            this.menu.addMenuItem(menuItem);
            menuItem.statusAreaKey = item['label'];
           // menuItem.connect('toggled', toggleService(item['cmd']));
	}        
    },

});


/*
 * Extension definition.
 */

function Extension(schema) {
    this._init(schema);
}

Extension.prototype = {
    
    settings: null,
    menuItems: null,    
    
    _init: function(schema) {
        this._indicator = null;
        let settings = new Lib.Settings(schema);
        this.settings = settings.getSettings();
	this.menuItems = new MenuItems.MenuItems(this.settings);
    },

    enable: function() {
        this._indicator = new Indicator(this.menuItems);
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


function init(schema) {
    return new Extension(schema);
}



function isServiceActive(name) {
    return "active";
}

function toggleService(name) {
    //Main.notify("Restarting" + name);

}