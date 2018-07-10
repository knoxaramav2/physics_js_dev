module.exports.Vector = class{

    //_vX = 0;
    //_vY = 0;

    constructor(){
        this._vX = 0;
        this._vY = 0;
    }

    magnitude(){
        return Math.sqrt(this._vX*this._vX, this._vY*this._vY);
    }

    angle(){
        if (this.x == 0)
            return 0;

        return Math.atan(this._vY/this._vX);
    }
};

