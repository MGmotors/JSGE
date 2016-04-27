"use strict";
(function(jsge){
    jsge.BaseLevel = function(game){
        var _width = 100;
        var _height = 100;
        var _game = game;
        
        this.update = function(deltaTime){}; 
        
        this.onLoad = function(){
            var engine = game.getECS();
            engine.announceComponent(jsge.SimpleRectComponent);
            engine.addSystem(new jsge.SimpleRectMovementSystem(_game),10);
            engine.addSystem(new jsge.SimpleRectRenderSystem(_game),100);
            var e1 = engine.createNewEntity();
            e1.addComponent(new jsge.SimpleRectComponent(0,0));
        };
        
        this.onUnload = function(){};
        
        this.getWidth = function () {
            return _width;
        };
        
        this.getHeight = function(){
            return _height;
        };
        
    };
    
})(window.jsge || (window.jsge = {}));