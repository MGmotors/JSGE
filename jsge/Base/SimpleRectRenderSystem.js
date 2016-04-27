"use strict";
(function(jsge)
{
    jsge.SimpleRectRenderSystem = function(game)
    {
        var _game = game;
        var _entities = [];
        var _priority = 0;
        var _sigNeeded; //optional

        this.checkEntity = function(entity)
        {
            var sig = entity.getSignature();
            if (sig & _sigNeeded == _sigNeeded)
            {
                _entities[entity.getID()] = entity;
            }
            else
            {
                delete _entities[entity.getID()];
            }
        };

        this.removeEntity = function(id)
        {
            delete _entities[id];
        };

        this.getPriority = function()
        {
            return _priority;
        };

        this.setPriority = function(priority)
        {
            _priority = priority;
        };

        this.onAdded = function()
        {
            _sigNeeded = 1 << jsge.SimpleRectComponent.shamt;
        };

        this.onRemoved = function()
        {
            _entities = undefined;
            _game = undefined;
            _priority = undefined;
            _sigNeeded = undefined;
        };

        this.update = function(deltaTime)
        {
            for (var i in _entities)
            {
                var e = _entities[i];
                var comp = e.getComponent(jsge.SimpleRectComponent);
                var ctx = _game.getContext();
                ctx.fillStyle = "BLACK";
                ctx.fillRect(Math.round(comp.posX), Math.round(comp.posY), 20, 20);
                //ctx.fillRect(0,0,150,75);
                /*
                ctx.strokeStyle = "darkblue";
                ctx.fillStyle = "lightblue";
                ctx.lineWidth = 10;
                ctx.fillRect(25, 25, 100, 125);
                ctx.strokeRect(25, 25, 100, 125);*/
            }
        };
    };

})(window.jsge || (window.jsge = {}));