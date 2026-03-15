export class PlayerInput {

    forward = false
    backward = false
    left = false
    right = false
    jump = false
    devPOV = false;
    constructor() {

        window.addEventListener("keydown", (e)=>{
            if(e.key === "w") this.forward = true
            if(e.key === "s") this.backward = true
            if(e.key === "a") this.left = true
            if(e.key === "d") this.right = true
            if(e.key === " ") this.jump = true
            if(e.key === "p") this.devPOV = !this.devPOV
        })

        window.addEventListener("keyup", (e)=>{
            if(e.key === "w") this.forward = false
            if(e.key === "s") this.backward = false
            if(e.key === "a") this.left = false
            if(e.key === "d") this.right = false
            if(e.key === " ") this.jump = false
        })
    }
}