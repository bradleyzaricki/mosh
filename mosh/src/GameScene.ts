import * as BABYLON from "@babylonjs/core";

export async function createGameScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement,
) {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.UniversalCamera("playerCam", new BABYLON.Vector3(0, 3, -10), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);

    const box = BABYLON.MeshBuilder.CreateBox("player", { size: 2 }, scene);
    box.position.y = 1;
    return scene;
}