"use strict";
/*global jsge */
(function(jsge)
{
    jsge.KeyManager = function()
    {
        var _binds = [];
        var _pressedEvents = [];
        var _releasedEvents = [];
        var _down = [];


        this.addBind = function(name, keycode)
        {
            var values = [];
            if (name.length <= 2)
            {
                console.warn("The bind-name: " + name + " is too short");
            }
            if(keycode.constructor != Array){
                values = [keycode];    
            }
            values = keycode;
            for(var i = 0; i<values.length;i++){
                if(values[i].constructor == String){
                    values[i] = jsge.KeyCodes.getCodeByName(values[i]);
                }
            }
            _binds[name] = values;
            return name;
        };

        this.getBind = function(name)
        {
            return _binds[name];
        };
        
        this.getBinds = function()
        {
            return _binds;
        };
        

        /**
         * Deletes a Bind by name or all Binds connected to a specific key
         *
         * @param {String || Number} The bind-name, a String like "p", or the keyCode of a key
         */
        this.deleteBinds = function deleteBinds(key)
        {
            var value = null;
            //bindName or KeyName
            if (key.constructor == String)
            {
                //bindName
                if (key.length >= 2)
                {
                    delete _binds[key];
                    return;
                }
                else
                { //key
                    value = jsge.KeyCodes.indexOf(key.toUpperCase());
                }
            }
            else
            {
                value = key;
            }
            for (var b in _binds)
            {
                if (_binds[b] == value)
                {
                    delete _binds[b];
                }
            }

        };

        var onKeyDown = function(event)
        {
            event.stopPropagation();
            if(!_down[event.keyCode]){
                _pressedEvents[event.keyCode] = 1;    
            }
            _down[event.keyCode] = 1;
        };

        var onKeyUp = function(event)
        {
            event.stopPropagation();
            _releasedEvents[event.keyCode] = 1;
            delete _down[event.keyCode];
        };

        this.update = function()
        {
            _releasedEvents = [];
            _pressedEvents = [];
        };


        this.wasPressed = function(keyCode)
        {
            if (_pressedEvents[keyCode]) return true;
            return false;
        };

        this.wasPressed_bind = function(bindName)
        {
            for(var e in _binds[bindName]){
                if(this.wasPressed(_binds[bindName][e]))return true;
            }
            return false;
        };

        this.wasReleased = function(keyCode)
        {
            if (_releasedEvents[keyCode]) return true;
            return false;
        };
        
        this.wasReleased_bind = function(bindName)
        {
            for(var e in _binds[bindName]){
                if(this.wasReleased(_binds[bindName][e]))return true;
            }
            return false;
        };

        this.isPressed = function(keyCode)
        {
            if (_down[keyCode]) return true;
            return false;
        };
        
         this.isPressed_bind = function(bindName)
        {
            for(var e in _binds[bindName]){
                if(this.isPressed(_binds[bindName][e]))return true;
            }
            return false;
        };

        this.startListening = function()
        {
            console.log("start Listening for keyCode");
            document.addEventListener("keydown", onKeyDown.bind(this));
            document.addEventListener("keyup", onKeyUp.bind(this));
        };

    };

})(window.jsge || (window.jsge = {}));