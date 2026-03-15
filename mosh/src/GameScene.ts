import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { Player } from "./Player";
import { getPlayerChunk, updateChunksAroundPlayer } from "./ChunkManager";

export async function createGameScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement,
) {
    const scene = new BABYLON.Scene(engine);
    const player = new Player(scene,canvas)
    player.playerbody.position.y = 50;
    const sceneInstr = new BABYLON.SceneInstrumentation(scene);
    sceneInstr.captureFrameTime = true;
    sceneInstr.captureRenderTime = true;
    sceneInstr.captureActiveMeshesEvaluationTime = true;

    const engineInstr = new BABYLON.EngineInstrumentation(engine);
    engineInstr.captureGPUFrameTime = true;
    scene.collisionsEnabled = true;
    //Render Test Scene
    
    const lights = [
    new BABYLON.PointLight ("light", new BABYLON.Vector3(0, 50, 0), scene),

    ]
    lights.forEach(light => {
        light.intensity = 10000.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1); 
    });

    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 1;
    box.position.z = 5;
    box.checkCollisions = true;




let chunkUpdateBusy = false;

scene.onBeforeRenderObservable.add(async () => {
    player.update();

    const playerPos = player.playerbody.position; // or whatever your player position is
    const current = getPlayerChunk(playerPos);
    if (
        !chunkUpdateBusy 
    ) {
        chunkUpdateBusy = true;

        try {
            await updateChunksAroundPlayer(playerPos, scene);
                console.log(`Player chunk: ${current.x}, ${current.z}`);

        } finally {
            chunkUpdateBusy = false;
        }
    }
});



    scene.onBeforeRenderObservable.add(()=>{
        player.update()
    })
    return scene;
}