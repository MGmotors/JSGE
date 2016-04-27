"use strict";
(function(jsge){
    jsge.BaseGame = function(){
        // ####### Private Variables ######## \\
        var _ecsEngine = new jsge.ECSEngine();
        var _keyManager = new jsge.KeyManager(); 
        var _bStop = false;
        var _lastUpdate;
        var _level;
        var _htmlCanvas;
        var _ctx;
        
        var update = function(timestamp){
            if(!_lastUpdate) _lastUpdate = timestamp;
            var d = (timestamp - _lastUpdate);
            d /= 1000;
            _ctx.clearRect(0,0,200,200); 
            _ecsEngine.update(d);
            _level.update(d);
            _keyManager.update();
           
            if(!_bStop){
                _lastUpdate = timestamp; 
                window.requestAnimationFrame(update.bind(this));
            }    
        };
        
        this.start = function(){
            _bStop = false;
            _keyManager.startListening();
            window.requestAnimationFrame(update.bind(this));    
        };
        
        this.stop = function(){
           _bStop = true;
        };
        
        this.setLevel = function(level){
            if(_level){
                _level.onUnload();
            }
            _level = level;
            level.onLoad();
        };
        
        this.getLevel = function(){
            return _level;
        };
        
        this.getECS = function(){
            return _ecsEngine;
        };
        
        this.getContext = function(){
            return _ctx;
        };
        
        this.createScreen = function(parentElement, width, height){
            _htmlCanvas  = document.createElement("canvas");
            _htmlCanvas.width = width;
            _htmlCanvas.height = height;
            parentElement.appendChild(_htmlCanvas );
            _ctx = _htmlCanvas.getContext("2d");
        };
        
        this.getKeyManager = function(){
            return _keyManager;
        };
        
        
    };
    
})(window.jsge || (window.jsge = {}));