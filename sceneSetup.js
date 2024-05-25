import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    return scene;
}

export function initCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    return camera;
}

export function initRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}