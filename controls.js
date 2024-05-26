import * as THREE from 'three';

export function handleControls(camera, cameraDirection, keysPressed, moveSpeed, checkCollisions) {
    // Obtenir la direction de la caméra
    camera.getWorldDirection(cameraDirection);

    let newPosition = camera.position.clone();

    // Avancer
    if (keysPressed['KeyW']) {
        const forwardDirection = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
        newPosition.add(forwardDirection.clone().multiplyScalar(moveSpeed));
    }
    // Reculer
    if (keysPressed['KeyS']) {
        const forwardDirection = new THREE.Vector3(-cameraDirection.x, 0, -cameraDirection.z).normalize();
        newPosition.add(forwardDirection.clone().multiplyScalar(moveSpeed));
    }
    // Tourner à gauche
    if (keysPressed['KeyA']) {
        const leftDirection = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize();
        newPosition.add(leftDirection.clone().multiplyScalar(moveSpeed));
    }
    // Tourner à droite
    if (keysPressed['KeyD']) {
        const rightDirection = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x).normalize();
        newPosition.add(rightDirection.clone().multiplyScalar(moveSpeed));
    }
    // Monter
    if (keysPressed['Space']) {
        const upDirection = new THREE.Vector3(0, 1, 0);
        newPosition.add(upDirection.clone().multiplyScalar(moveSpeed));
    }
    // Descendre
    if (keysPressed['ShiftLeft']) {
        const upDirection = new THREE.Vector3(0, -1, 0);
        newPosition.add(upDirection.clone().multiplyScalar(moveSpeed));
    }
    if (!checkCollisions(newPosition)) {
        camera.position.copy(newPosition);
    }
}