import * as BABYLON from "@babylonjs/core";
import { PlayerController } from "./PlayerController";

export class Player {
    camera: BABYLON.UniversalCamera
    controller: PlayerController
    playerbody: BABYLON.Mesh;
constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
    this.camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0,2,0), scene);
    this.camera.attachControl(canvas, true);
    this.playerbody = BABYLON.MeshBuilder.CreateBox("playerBody", { width: 1, depth: 1, height: 2 }, scene);
    this.controller = new PlayerController(this.camera, this.playerbody, scene);
    }
    update() {
        this.controller.update()
    }
}