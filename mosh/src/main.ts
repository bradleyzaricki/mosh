import * as BABYLON from '@babylonjs/core';
import { SceneManager } from "./SceneManager";

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const fpsDiv = document.getElementById('fps') as HTMLDivElement;

const engine = new BABYLON.Engine(canvas);

const sceneManager = new SceneManager(engine, canvas);

await sceneManager.goToLobby();


engine.runRenderLoop(function() 
{
    sceneManager.currentScene?.render();
    fpsDiv.innerText = "FPS: " + engine.getFps().toFixed(2);
});
window.addEventListener("resize", function () {
    engine.resize();
});
