const vector = require('./vector');

module.exports = {
    Collider : class{

        constructor(x, y){
            this.xLoc = x;
            this.yLoc = y;
            this.angle = 0;
            this.vector = new vector.Vector();
        }
    }
}