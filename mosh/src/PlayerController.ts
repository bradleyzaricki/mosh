import * as BABYLON from "@babylonjs/core";
import { PlayerInput } from "./PlayerInput";

const SPEED = 0.1;
const GRAVITY = -0.01;
const JUMP_STRENGTH = 0.2;

export class PlayerController {
    camera: BABYLON.UniversalCamera;
    input: PlayerInput;
    scene: BABYLON.Scene;
    playerbody: BABYLON.Mesh;
    verticalVelocity: number;
    isGrounded: boolean;

    private move = new BABYLON.Vector3();
    private forward = new BABYLON.Vector3();
    private right = new BABYLON.Vector3();
    private groundCheckRay = new BABYLON.Ray(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), 1.1);

    constructor(camera: BABYLON.UniversalCamera, playerbody: BABYLON.Mesh, scene: BABYLON.Scene) {
        this.camera = camera;
        this.playerbody = playerbody;
        this.scene = scene;
        this.input = new PlayerInput();
        this.verticalVelocity = 0;
        this.isGrounded = false;
    }

    update() {
        this.playerbody.rotation.y = this.camera.rotation.y;

        this.playerbody.getDirectionToRef(BABYLON.Axis.Z, this.forward);
        this.playerbody.getDirectionToRef(BABYLON.Axis.X, this.right);

        this.move.set(0, 0, 0);

        if (this.input.forward) {
            this.move.addInPlace(this.forward);
        }

        if (this.input.backward) {
            this.move.subtractInPlace(this.forward);
        }

        if (this.input.left) {
            this.move.subtractInPlace(this.right);
        }

        if (this.input.right) {
            this.move.addInPlace(this.right);
        }

        if (this.move.lengthSquared() > 0) {
            this.move.normalize();
            this.move.scaleInPlace(SPEED);
        }

        this.groundCheckRay.origin.copyFrom(this.playerbody.position);

        const hit = this.scene.pickWithRay(
            this.groundCheckRay,
            (mesh) => mesh.checkCollisions && mesh !== this.playerbody
        );

        this.isGrounded = !!hit?.hit;

        if (this.isGrounded && this.verticalVelocity < 0) {
            this.verticalVelocity = 0;
        }

        if (this.input.jump && this.isGrounded) {
            this.verticalVelocity = JUMP_STRENGTH;
            this.isGrounded = false;
        }

        this.verticalVelocity += GRAVITY;
        this.move.y = this.verticalVelocity;

        this.playerbody.moveWithCollisions(this.move);

        this.camera.position.x = this.playerbody.position.x;
        this.camera.position.y = this.playerbody.position.y + 1.5;
        this.camera.position.z = this.playerbody.position.z;
    }
}