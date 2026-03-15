import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

type LoadedChunk = {
    container: BABYLON.AssetContainer;
    root: BABYLON.TransformNode;
};

const CHUNK_SIZE = 90;  
const LOAD_RADIUS = 1;   

const loadedChunks = new Map<string, LoadedChunk>();
const loadingChunks = new Set<string>();

function chunkKey(x: number, z: number): string {
    return `${x}_${z}`;
}

export function getPlayerChunk(pos: BABYLON.Vector3) {
    return {
        // Adding 1 because 0,0 origin is chunk 1,1
        x: Math.floor((pos.x + CHUNK_SIZE/2)/ CHUNK_SIZE) + 1,
        z: Math.floor((pos.z + CHUNK_SIZE/2)/ CHUNK_SIZE) + 1
    };
}

async function loadChunk(x: number, z: number, scene: BABYLON.Scene) {
    const key = chunkKey(x, z);

    if (loadedChunks.has(key) || loadingChunks.has(key)) {
        return;
    }

    loadingChunks.add(key);

    try {
        const container = await BABYLON.LoadAssetContainerAsync(
            `/models/ground_${x}_${z}.glb`,
            scene
        );

        const root = container.meshes[0]; // Assuming the first mesh is the root
        container.addAllToScene();

        for (const mesh of container.meshes) {

            mesh.checkCollisions = true;
        }
const terrain = container.meshes[1];

const bounds = terrain.getBoundingInfo().boundingBox;

const width = bounds.maximumWorld.x - bounds.minimumWorld.x;
const depth = bounds.maximumWorld.z - bounds.minimumWorld.z;

console.log("chunk width:", width);
console.log("chunk depth:", depth);
        loadedChunks.set(key, { container, root });

        console.log(`loaded chunk ${key}`);
    } catch (err) {
        console.warn(`failed to load chunk ${key}`, err);
    } finally {
        loadingChunks.delete(key);
    }
}

function unloadChunk(x: number, z: number) {
    const key = chunkKey(x, z);
    const chunk = loadedChunks.get(key);
    if (!chunk) return;

    chunk.container.removeAllFromScene();
    chunk.root.dispose();
    loadedChunks.delete(key);

    console.log(`unloaded chunk ${key}`);
}

export async function updateChunksAroundPlayer(
    playerPos: BABYLON.Vector3,
    scene: BABYLON.Scene
) {

    const playerChunkX = Math.floor((playerPos.x + CHUNK_SIZE/2)/ CHUNK_SIZE) + 1;
    const playerChunkZ = Math.floor((playerPos.z + CHUNK_SIZE/2)/ CHUNK_SIZE) + 1;

    // check chunks around player
    for (let x = playerChunkX - LOAD_RADIUS; x <= playerChunkX + LOAD_RADIUS; x++) {
        for (let z = playerChunkZ - LOAD_RADIUS; z <= playerChunkZ + LOAD_RADIUS; z++) {

            const key = `${x}_${z}`;

            if (!loadedChunks.has(key)) {
                await loadChunk(x, z, scene);
            }
        }
    }

    // remove chunks that are too far
    for (const key of loadedChunks.keys()) {

        const [x, z] = key.split("_").map(Number);

        if (
            Math.abs(x - playerChunkX) > LOAD_RADIUS ||
            Math.abs(z - playerChunkZ) > LOAD_RADIUS
        ) {
            unloadChunk(x, z);
        }
    }
}