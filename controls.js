import * as THREE from 'three';

export function handleControls(camera, cameraDirection, keysPressed, moveSpeed) {
    // Obtenir la direction de la caméra
    camera.getWorldDirection(cameraDirection);

    // Avancer
    if (keysPressed['KeyW']) {
        const forwardDirection = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
        camera.position.add(forwardDirection.clone().multiplyScalar(moveSpeed));
    }
    // Reculer
    if (keysPressed['KeyS']) {
        const forwardDirection = new THREE.Vector3(-cameraDirection.x, 0, -cameraDirection.z).normalize();
        camera.position.add(forwardDirection.clone().multiplyScalar(moveSpeed));
    }
    // Tourner à gauche
    if (keysPressed['KeyA']) {
        const leftDirection = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize();
        camera.position.add(leftDirection.clone().multiplyScalar(moveSpeed));
    }
    // Tourner à droite
    if (keysPressed['KeyD']) {
        const rightDirection = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x).normalize();
        camera.position.add(rightDirection.clone().multiplyScalar(moveSpeed));
    }
    // Monter
    if (keysPressed['Space']) {
        const upDirection = new THREE.Vector3(0, 1, 0);
        camera.position.add(upDirection.clone().multiplyScalar(moveSpeed));
    }
    // Descendre
    if (keysPressed['ShiftLeft']) {
        const upDirection = new THREE.Vector3(0, -1, 0);
        camera.position.add(upDirection.clone().multiplyScalar(moveSpeed));
    }
}