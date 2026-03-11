import * as BABYLON from "@babylonjs/core";
import { createLobbyScene } from "./LobbyScene.ts";
import { createGameScene } from "./GameScene.ts";

export class SceneManager {
    public currentScene: BABYLON.Scene | null = null;
    private engine: BABYLON.Engine;
    private canvas: HTMLCanvasElement;

    constructor(
        private _engine: BABYLON.Engine,
        private _canvas: HTMLCanvasElement
    ) {
        this.engine = _engine;
        this.canvas = _canvas;
    }


    private async switchScene(newScene: BABYLON.Scene) {
        if (this.currentScene) {
            this.currentScene.detachControl();
            this.currentScene.dispose();
        }

        this.currentScene = newScene;
        this.currentScene.attachControl();
    }

    public async goToLobby() {
        const scene = await createLobbyScene(this.engine, this.canvas)

         this.switchScene(scene);
    }

    public async goToGame() {
        const scene = await createGameScene(this.engine, this.canvas)

         this.switchScene(scene);
    }
}