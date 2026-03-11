import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const fpsDiv = document.getElementById('fps') as HTMLDivElement;

const engine = new BABYLON.Engine(canvas);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.createDefaultCameraOrLight(true, false, true); //set first param to false to create a fixed camera

    const box = BABYLON.MeshBuilder.CreateBox('box', { size: 0.31 }, scene);
    window.addEventListener("keydown", (event) => {
        if (event.key === "w") {
            box.scaling.x -= 0.01;
            box.scaling.y -= 0.01;
            box.scaling.z -= 0.01;
        }
    });
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function() 
{
    scene.render();
    fpsDiv.innerText = "FPS: " + engine.getFps().toFixed(0);
});
window.addEventListener("resize", function () {
    engine.resize();
});

