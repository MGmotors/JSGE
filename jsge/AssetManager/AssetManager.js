(function(jsge){
    jsge.AssetManager = function AssetManager(){
        var _textData = [];
        this.loadTextFile = function(url, name){
            if(_textData[name]){
                console.warn("Overwriting " + name);
            }
            var req = new XMLHttpRequest();
			req.open("GET", url + "?h=" + Date.now(), false);
			req.setRequestHeader("cache-control", "no-cache");
			req.send(null);
			if (req.readyState == 4 && req.status == 200){
				_textData[name] = req.responseText;
			}
        };
        
        this.getText = function(name){
            return _textData[name];  
        };

    };
})(window.jsge || (window.jsge = {}));