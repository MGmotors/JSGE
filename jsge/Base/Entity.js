"use strict";
(function(jsge){
    jsge.Entity = function(id){
        var _id = id;
        var _components = [];
        //ist set to true, when _components has changed. 
        var _hasChanged = false;
        //the signature of the components. a bit-Mask
        var _signature = 0;
        
        
        this.hasChanged = function(){
            return _hasChanged;
        };
        
        this.setHasChanged = function(b){
            _hasChanged = b; 
        };
        
        this.getID = function(){
            return _id;
        };
        
        this.getSignature = function(){
            return _signature;
        };
        
        this.addComponent = function(component){
            var currShamt = component.constructor.shamt;
            if(currShamt == undefined){
                console.log(component + " isnt registered properly. You have to call engine.announceComponent first");
            }
            
            if(_components[currShamt]) return;
            _components[currShamt] = component;
            //console.log("added Component to entity " + id);
            _signature += (1<<currShamt);
            _hasChanged = true;
        };
        
        this.getComponent = function(componentClass){
            return _components[componentClass.shamt];
        };
        
        this.removeComponent = function(componentClass){
            if(!componentClass.shamt){
                 console.log(componentClass + " isnt registered properly. You have to call engine.announceComponent first");
            }
            delete _components[componentClass.shamt];
            _signature -= (1<<componentClass.shamt);
            _hasChanged = true;
        };
        
        this.removeAllComponents = function(){
            _signature = 0;
            _components = [];
        };
        
        this.hasComponent = function(ComponentClass){
            if(!ComponentClass.shamt){
                 console.log(ComponentClass + " isnt registered properly. You have to call engine.announceComponent first");
                return false;
            }
            if(_components[ComponentClass.shamt]){
                return true;
            }
            return false;
            
        };
                
};
    
})(window.jsge || (window.jsge = {}));