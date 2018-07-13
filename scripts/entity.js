RadianToAngle = function(radian){
    return (180 * radian) / Math.PI
}

AngleToRadian = function(angle){
    return (angle * Math.PI)/180;
}

GetRotatedPoint = function(vertice, angle){
    let xp = (vertice[0]*Math.cos(angle)) - (vertice[1] * Math.sin(angle));
    let yp = (vertice[1]*Math.cos(angle)) + (vertice[0] * Math.sin(angle));
    return [xp, yp];
}

GetMagnitude = function(origin, vertice){
    return Math.sqrt(
        Math.pow(vertice[0]-origin[0], 2) +
        Math.pow(vertice[1]-origin[0], 2));
}

module.exports.AngleToRadian = AngleToRadian;
module.exports.GetRotatedPoint = GetRotatedPoint;
module.exports.GetMagnitude = GetMagnitude;

const collider = require('./collider');

const TAU = Math.PI * 2;

class Entity extends collider.Collider{

    constructor(vertices, x, y, angle, normalizeVertice){
        super(x, y);
        this.vertices = vertices;
        this.angle = angle;
        this.color = '#ffffff';

        //readjust vertices so x,y in center of object
        if (normalizeVertice){

            let ax = 0;
            let ay = 0;

            vertices.forEach(v => {
                ax += v[0];
                ay += v[1];
                //console.log(ax + ' ' + ay);
            });

            ax /= vertices.length;
            ay /= vertices.length;

            //console.log(ax + ' ' + ay);

            vertices.forEach(v => {
                v[0] -= ax;
                v[1] -= ay;
            });
        }
    }

    render(ctx){
        let v = this.vertices;

        ctx.beginPath();
        let vloc = GetRotatedPoint(v[0], this.angle);
        ctx.moveTo(vloc[0]+this.xLoc, vloc[1]+this.yLoc);

        for(let i = 1; i < this.vertices.length; ++i){
            vloc = GetRotatedPoint(v[i], this.angle);
            ctx.lineTo(vloc[0]+this.xLoc, vloc[1]+this.yLoc);
        }

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    setColor(color){
        this.color = color;
    }

    rotate(dAngle){

        let rad = AngleToRadian(dAngle);
        this.angle += rad;

        if (this.angle > TAU){
            this.angle -= TAU;
        } else if (this.angle < 0){
            this.angle += TAU;
        }
    }

    translate(dx, dy){
        this.xLoc += dx;
        this.yLoc += dy;
    }

    toString(){
        return JSON.stringify(this);
    }
};

module.exports.Entity = Entity,

module.exports.Circle = class extends Entity{
    constructor(radius, x, y){
        super(null, x, y, 0, false);
        this.radius = radius;
    }

    render(ctx){
        ctx.beginPath();
        ctx.arc(this.xLoc, this.yLoc, this.radius, 0, 2*Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
},

module.exports.Rectangle = class extends Entity {
    constructor(width, height, x, y, angle, nrm=true){
        let vertices = [[0,0],[width, 0],[width, height], [0, height]];
        super(vertices, x, y, angle, nrm);
    }
},

module.exports.Polygon = class extends Entity {
    constructor(vertices, x, y, angle, nrm=true){
        super(vertices, x, y, angle, nrm);
    }
}