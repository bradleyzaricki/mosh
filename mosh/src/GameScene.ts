import * as BABYLON from "@babylonjs/core";
import { Player } from "./Player";

export async function createGameScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement,
) {
    const scene = new BABYLON.Scene(engine);
    const player = new Player(scene,canvas)
    const sceneInstr = new BABYLON.SceneInstrumentation(scene);
    sceneInstr.captureFrameTime = true;
    sceneInstr.captureRenderTime = true;
    sceneInstr.captureActiveMeshesEvaluationTime = true;

    const engineInstr = new BABYLON.EngineInstrumentation(engine);
    engineInstr.captureGPUFrameTime = true;
    scene.collisionsEnabled = true;
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
    box.position.z = 5;
    box.checkCollisions = true;

    }
setInterval(() => {
    console.log("fps:", engine.getFps());
    console.log("delta ms:", engine.getDeltaTime());

    console.log("frame:", sceneInstr.frameTimeCounter.current);
    console.log("render:", sceneInstr.renderTimeCounter.current);
    console.log("active meshes eval:", sceneInstr.activeMeshesEvaluationTimeCounter.current);
    console.log("gpu frame:", engineInstr.gpuFrameTimeCounter.current);

    console.log("meshes:", scene.meshes.length);
}, 1000);
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);
    ground.checkCollisions = true;



    scene.onBeforeRenderObservable.add(()=>{
        player.update()
    })
    return scene;
}