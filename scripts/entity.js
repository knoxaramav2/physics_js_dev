AngleToRadian = function(angle){
    return (angle * Math.PI)/180;
}

GetRotatedPoint = function(vertice, origin, angle){
    magnitude = Math.sqrt(Math.pow(vertice[0], 2) + Math.pow(vertice[1], 2));
    ax = Math.cos(AngleToRadian(angle)) * vertice[0];
    ay = Math.sin(AngleToRadian(angle)) * vertice[1];
    console.log(ax, ay, magnitude, vertice, origin);
    return [ax + origin[0], ay + origin[1]];
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


class Entity extends collider.Collider{

    constructor(vertices, x, y, angle, normalizeVertice){
        super(x, y);
        this.vertices = vertices;
        this.angle = angle;
        this.color = 'black';

        //readjust vertices so x,y in center of object
        if (normalizeVertice){

            let ax = 0;
            let ay = 0;

            vertices.forEach(v => {
                ax += v[0];
                ay += v[1];
                console.log(ax + ' ' + ay);
            });

            ax /= vertices.length;
            ay /= vertices.length;

            console.log(ax + ' ' + ay);

            vertices.forEach(v => {
                v[0] -= ax;
                v[1] -= ay;
            });
        }
    }

    render(ctx){
        let v = this.vertices;

        ctx.beginPath();
        //let p = GetRotatedPoint(v[0], [this.xLoc, this.yLoc], this.angle);
        ctx.moveTo(v[0][0]+this.xLoc, v[0][1]+this.yLoc);
        //ctx.moveTo(p[0], p[1]);

        for(let i = 1; i < this.vertices.length; ++i){
            ctx.lineTo(v[i][0]+this.xLoc, v[i][1]+this.yLoc);
            console.log(AngleToRadian(this.angle));
            //let p = GetRotatedPoint(v[i], [this.xLoc, this.yLoc], this.angle);
            //ctx.lineTo(p[0], p[1]);
        }

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    setColor(color){
        this.color = color;
    }

    rotate(dAngle){
        this.angle += dAngle;

        if (this.angle > 360){
            this.angle -= 360;
        } else if (this.angle < 0){
            this.angle += 360;
        }
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