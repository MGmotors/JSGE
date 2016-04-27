(function(jsge){
    jsge.EventManager = function EventManager(){
        var _events = [];
        var _nextEventID = 0;
        
        this.addListener = function(EventClass, callback){
            if(EventClass.ID == undefined){
                EventClass.ID = _nextEventID;
                _nextEventID ++;
            }
            if(!_events[EventClass.ID]){
                _events[EventClass.ID] = [];
            }
            _events[EventClass.ID].push(callback);
        };
        
        this.raiseEvent = function(event){
            var evtClass = event.constructor;
            if(evtClass.ID == undefined){
                evtClass.ID = _nextEventID;
                _nextEventID ++;
            }
            if(!_events[evtClass.ID]){
                _events[evtClass.ID] = [];
            }
            
            for(var listenerID in _events[evtClass.ID]){
                _events[evtClass.ID][listenerID](event);
            }
            
        };
    };
})(window.jsge || (window.jsge = {}));