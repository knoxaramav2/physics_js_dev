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
        this.objects[0].rotate(360 * this.deltaT);
    }

    draw(ctx){
        this.objects.forEach(function(e){
            e.render(ctx);
        });
    }

    loop(curr_time_stamp){        
        if (!this.isPaused){
            this.deltaT = (curr_time_stamp - this.timestamp) / 1000;
            this.update();
            this.draw(this.ctx);
        }

        this.timestamp = curr_time_stamp;

        window.requestAnimationFrame(this.loop.bind(this));
    }

};
