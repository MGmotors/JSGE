/*
This loader loads the files in a given loder.json
and injects them to the document in the right order.
It can also load other loader.json files.

*/


"use strict";
window.tools = window.tools ||
{};
(function()
{
	window.tools.loader = window.tools.loader ||
		function()
		{
			var _callback = undefined;
			var _loadedJSONS = [];
			var _filesToLoad = [];
			this.loadedJsonPaths = [];
			
			this.loadFromJson = function(file,callback){
				_callback = callback;
				setTimeout(load.bind(this,file),0);
			};
			
			var load = function(file){
				loadAndParseJson(file);
				while(_filesToLoad.length){
					var elem = _filesToLoad.shift();
					var req = new XMLHttpRequest();
					console.log("try to load: " + elem.url);
					req.open("GET", elem.url + "?h=" + Date.now(), false);
					req.setRequestHeader("cache-control", "no-cache");
					req.send(null);
					if (req.readyState == 4 && req.status == 200){
						console.log("Loaded " + elem.url);
						var a = elem.url.split("/");
						var text = req.responseText +  "\n //# sourceURL= " + elem.name +"/" + a[a.length - 1];
						var newScriptElement = document.createElement("script");
                    	newScriptElement.type = "text/javascript";
                    	newScriptElement.text = text;
                    	document.getElementsByTagName("head")[0].appendChild(newScriptElement); 
					}
					else{
						console.log("Can't load " + elem.url);
					}
				}
				_callback();
			};

			var loadAndParseJson = function(file) {
				for(var i in _loadedJSONS){
					if(_loadedJSONS[i] == file){
						return;
					}
				}
				_loadedJSONS.push(file);
				var	req = new XMLHttpRequest();
				req.open("GET", file + "?h=" + Date.now(), false);
				req.setRequestHeader("cache-control", "no-cache");
				req.send(null);
				
				if (req.readyState == 4 && req.status == 200)
				{
					try{
						var json = JSON.parse(req.responseText);
					}catch(e){
						console.error(e);
						console.error(req);
						return;				
					}
					for(var j in json.files){
						if(json.files[j].toLowerCase().indexOf("http://") != 0){
							json.files[j] = json.base + json.files[j];
						}
						if(json.files[j].toLowerCase().indexOf(".json") != -1){
							loadAndParseJson(json.files[j]);
							continue;
						}
						_filesToLoad.push({name:json.name,url:json.files[j]});
					}
				}else{
					console.log("can't load " + file);
				}
			};
		};
})();