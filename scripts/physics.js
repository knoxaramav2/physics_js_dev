"use strict";
//const collider = require('./collider.js');

module.exports = class {

    constructor(){
        //imports
        this.Collider = require('./collider.js');

        //world settings
        this.gravity = 9.8;
        this.viscosity = 1.0;
        this.world_width = 300;
        this.world_height = 300;
        this.isPaused = true;
        this.objects = [];

        //simulation state
        this.timestamp = 0;
        this.deltaT = 0;

        //graphics
        this.ctx = document.getElementById('canvas').getContext('2d');
    
        //controllable
        this.callback = null;
    }

    start(){
        this.isPaused = false;
        window.requestAnimationFrame(this.loop.bind(this));
    }

    resume(){
        this.isPaused = false;
    }

    togglePause(){
        if (this.isPaused){
            this.resume();
        } else {
            this.stop();
        }

        return this.isPaused;
    }

    stop(){
        this.isPaused = true;
    }

    addObject(obj){
        //obj.ctx = this.ctx;
        this.objects.push(obj);
    }

    setWorldSize(width, height){
        this.world_width = width;
        this.world_height = height;
    }

    update(){
        //this.objects[0].rotate(360 * this.deltaT);
        let clr = this.objects[0].color;
        let clrn = parseInt(clr.substr(1), 16);
        clrn = clrn > 0xFFF ? 0 : clrn+2;
        clr = clrn.toString(16);
        clr = '#' + '000'.substr(0, 3 - clr.length) + clr;
        this.objects[0].setColor(clr);

        //this.objects[0].translate(5 * this.deltaT, 0);
        this.objects[0].rotate(500 * this.deltaT);
        //console.log(this.objects[0].toString());
    }

    draw(ctx){

        ctx.clearRect(0, 0, this.world_width, this.world_height);

        this.objects.forEach(function(e){
            e.render(ctx);
            ctx.restore();
        });
    }

    loop(curr_time_stamp){        
        if (!this.isPaused){
            this.deltaT = (curr_time_stamp - this.timestamp) / 1000;
            if(this.callback !== null){
                this.callback();
            }
            this.update();
            this.draw(this.ctx);
        }

        this.timestamp = curr_time_stamp;

        window.requestAnimationFrame(this.loop.bind(this));
    }

    setCallback(fnc){
        if (typeof(fnc) !== 'function'){
            throw 'Callback must be function';
        }

        this.callback = fnc;
    }

};
