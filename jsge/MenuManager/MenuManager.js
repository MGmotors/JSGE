(function(jsge){
    jsge.MenuManager = function MenuManager(){
        var _uiElementHolder;
        var _nextFreeID = 0; 
        var _controller = [];
        
        this.removeElement = function(name){
            var elem = this.getElementByName(name);
            elem.parentNode.removeChild(elem);
        };
        
        this.addElementsFromHTML = function(html,name){
            if(!name){
                name = "" + _nextFreeID;
                _nextFreeID ++;
            }
            var container = document.createElement("div");
            container.setAttribute("name",name);
            container.style["width"] = _uiElementHolder.offsetWidth + "px";
            container.style["height"] = _uiElementHolder.offsetHeight + "px";
            container.style["position"] = "absolute";
            container.innerHTML = html;
            _uiElementHolder.appendChild(container);
            return container;
        };
        
        this.clearUI = function(){
            _uiElementHolder.innerHTML = "";
        };
        
        
        this.getElementByName = function(name,parent){
            var ret;
            if(!parent){
                parent = _uiElementHolder;
            }
            if(parent.getAttribute("name") == name) return parent;
            
            
            for(var i = 0; i<parent.children.length;i++){
                ret = this.getElementByName(name,parent.children[i]);
                if(ret) break;
            }
            
            return ret;
        };

        this.setUIElementHolder = function(holder){
            _uiElementHolder = holder;
            _uiElementHolder.setAttribute("name","JSGE_UIELEMENTHOLDER");
        };
        
        this.getUIElementHolder = function(){
            return _uiElementHolder;
        };
        
        this.addController = function(controller){
            _controller[controller.getName()] = controller;
            controller.onAdded();
        };
        
        this.getController = function(name){
            return _controller[name];
        };
        
        this.removeController = function(name) {
            if(_controller[name]){
                _controller[name].onRemove();
                delete _controller[name];
            }  
        };
        
    };
})(window.jsge || (window.jsge = {}));