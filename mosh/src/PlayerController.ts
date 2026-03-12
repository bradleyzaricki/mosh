import * as BABYLON from "@babylonjs/core";
import { PlayerInput } from "./PlayerInput";

export class PlayerController {
    camera: BABYLON.UniversalCamera;
    input: PlayerInput;
    scene: BABYLON.Scene;
    playerbody: BABYLON.Mesh;
    constructor(camera: BABYLON.UniversalCamera, playerbody:BABYLON.Mesh, scene: BABYLON.Scene) {
        this.camera = camera;
        this.playerbody = playerbody;
        this.scene = scene;
        this.input = new PlayerInput()
    }

    update() {
        let speed = 0.1
        this.playerbody.rotation.y = this.camera.rotation.y;
        const forward = this.playerbody.getDirection(BABYLON.Axis.Z).scale(speed)
        const right = this.playerbody.getDirection(BABYLON.Axis.X).scale(speed)

        //Keyboard inputs from PlayerInput.ts
        if(this.input.forward) 
            this.playerbody.position.addInPlace(forward)
        if(this.input.backward) 
            this.playerbody.position.addInPlace(forward.scale(-1))
        if(this.input.left) 
            this.playerbody.position.addInPlace(right.scale(-1))
        if(this.input.right) 
            this.playerbody.position.addInPlace(right)
        this.camera.position = new BABYLON.Vector3(this.playerbody.position.x - 0, this.playerbody.position.y + 1.5, this.playerbody.position.z);
    }
}