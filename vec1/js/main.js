function onload(){
    var loader = new window.tools.loader();
    loader.loadFromJson("http://projects-mgmotors.c9users.io/vec1/vec1.json",scriptLoaded);
    console.log("started loading");
}

function scriptLoaded(){
    console.log("script-loading completed");
}

window.addEventListener("load",onload);