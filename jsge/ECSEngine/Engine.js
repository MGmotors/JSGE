"use strict";
/*global jsge */
(function(namespace){
    namespace.ECSEngine = function(){
        var _entities = [];
        var _systems = [];
        var _nextEntityID = 0;
        var _nextComponentShamt = 0;
        
        this.update = function(deltaTime){
            for(var e in _entities){
                if(_entities[e].hasChanged()){
                    for(var s in _systems){
                        _systems[s].checkEntity(_entities[e]);
                    }
                    _entities[e].setHasChanged(false);
                }
            }
            
            for(var system in _systems){
                _systems[system].update(deltaTime);
            }
            
        };
        
        this.addSystem = function(system, priority){
            system.setPriority(priority);
            _systems.push(system);
            _systems.sort(compareSystems.bind(this));
            system.onAdded();
        };
        
        var compareSystems = function(a,b) {
            return a.getPriority() - b.getPriority();
        };
        
        this.removeSystem = function(system){
            var i = _systems.indexOf(system,0);
            _systems[i].onRemoved();
            delete _systems[i];
        };
        
        this.removeAllSystems = function(){
            for(var s in _systems){
                _systems[s].onRemoved();
                delete _systems[s];
            }
        };
        
        this.announceComponent = function(componentClass){
            if(componentClass && !componentClass.prototype.shamt){
                //componentClass.info = {};
                componentClass.shamt = _nextComponentShamt;
                _nextComponentShamt ++;
                console.log("announced " + componentClass.name);
            } else{
                console.log("announcing failed !");
            }
        };
        
        this.createNewEntity = function(){
            var e = new jsge.Entity(_nextEntityID);
            _entities[_nextEntityID] = e;
            _nextEntityID ++;
            return e;
        };
        
        this.removeEntityByObject = function(entity){
            this.removeEntity(entity.getID);
        };
        
        this.removeEntity = function(id){
            delete _entities[id];
            for(var i in _systems){
                _systems[i].removeEntity(id);   
            }
        };
        
        this.removeAllEntities = function(){
            for(var i in _entities){
                this.removeEntity(i);
            }
        };
        
        this.getAllEntities = function(){
            return _entities;
        };
    };
    
})(window.jsge || (window.jsge = {}));