import * as BABYLON from "@babylonjs/core";
import { PlayerController } from "./PlayerController";

export class Player {
    camera: BABYLON.UniversalCamera
    controller: PlayerController
    playerbody: BABYLON.Mesh;
constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0,2,0), scene);
    this.camera.attachControl(canvas, true);
    this.camera.minZ = 0.1;
    this.camera.fov = -80;
    this.camera.layerMask = 0x1;
    this.playerbody = BABYLON.MeshBuilder.CreateCapsule("playerBody", { radius: 1.2, height: 2 }, scene);
    this.playerbody.checkCollisions = true;
    this.playerbody.layerMask = 0x2;
    this.controller = new PlayerController(this.camera, this.playerbody, scene);
    }
    update() {
        this.controller.update()
    }
}