"use strict";
(function(myNs)
{
    myNs.Matrix33 = function(x0,x1,x2){
        x0 = x0 || [0,0,0];
        x1 = x1 || [0,0,0];
        x2 = x2 || [0,0,0];
        var values = [];
        for(var r = 0; r<=2;r++){
            values[r]= [x0[r], x1[r], x2[r]];
        }
    };
    
})(createNS("tools.Vec3D"));