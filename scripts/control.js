'use strict';

module.exports = class{
    constructor(){
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvas = document.getElementById('canvas');

        this.canvas.addEventListener('mousemove', this.updateMouse.bind(this));
    }

    updateMouse(evt){
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = evt.clientX - rect.left;
        this.mouseY = evt.clientY - rect.top;
    }

    getMouse(){
        return {
            x : this.mouseX,
            y : this.mouseY
        };
    }
};