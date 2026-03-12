import * as BABYLON from "@babylonjs/core";
import { Player } from "./Player";

export async function createGameScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement,
) {
    const scene = new BABYLON.Scene(engine);
    const player = new Player(scene,canvas)

    //Render Test Scene
    {
    const lights = [
    new BABYLON.PointLight ("light", new BABYLON.Vector3(4, 2, 0), scene),
    new BABYLON.PointLight ("light", new BABYLON.Vector3(-4, 2, 0), scene),
    new BABYLON.PointLight ("light", new BABYLON.Vector3(0, 2, 4), scene),
    new BABYLON.PointLight ("light", new BABYLON.Vector3(0, 2, -4), scene),
    ]
    lights.forEach(light => {
        light.intensity = 0.1;
        light.diffuse = new BABYLON.Color3(1, 0, 1); 
    });

    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 1;
    }

    BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);



    scene.onBeforeRenderObservable.add(()=>{
        player.update()
    })
    return scene;
}