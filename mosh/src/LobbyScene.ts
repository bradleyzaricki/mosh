import * as BABYLON from "@babylonjs/core";

export async function createLobbyScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement,)
{
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 2, -8), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp = [];
    camera.keysDown = [];
    camera.keysLeft = [];
    camera.keysRight = [];
    camera.keysRotateDown = [];
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    BABYLON.MeshBuilder.CreateBox("box", { size: 5}, scene);


    return scene;
}