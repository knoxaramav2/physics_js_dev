var assert = require('assert');

const vector = require('../scripts/vector');
const collider = require('../scripts/collider');
const entity = require('../scripts/entity');
const physics = require('../scripts/physics');


describe('Shape', function(){
    describe('Rotation', function(){
        it('Square should be rotated 45 degrees', function(){
            let degree = 45;
            let b = new entity.Rectangle(4, 4, 0, 0, 0, true);
            b.rotate(degree);
            let v = b.vertices;
            let rv0 = entity.GetRotatedPoint(v[0], [0,0], entity.AngleToRadian(degree));
            let rv1 = entity.GetRotatedPoint(v[1], [0,0], entity.AngleToRadian(degree));
            let rv2 = entity.GetRotatedPoint(v[2], [0,0], entity.AngleToRadian(degree));
            let rv3 = entity.GetRotatedPoint(v[3], [0,0], entity.AngleToRadian(degree));

            console.log('>>>');
            console.log(rv0);
            console.log(rv1);
            console.log(rv2);
            console.log(rv3);


        });
    });
});

