import * as THREE from 'three';

// Variables pour suivre les commandes de déplacement et de rotation
let moveSpeed = 0.1;
let moveForward = false;
let moveBackward = false;
let turnLeft = false;
let turnRight = false;
let goUp = false;
let goDown = false;

// Variables pour suivre la rotation de la caméra
let yaw = 0;  // Rotation horizontale (gauche/droite)
let pitch = 0;  // Rotation verticale (haut/bas)
const sensitivity = 0.002;  // Sensibilité de la souris

// Variables pour suivre la direction de la caméra
const cameraDirection = new THREE.Vector3();

export function handleControls(event) {
    switch (event.key) {
        case 'z':
            moveForward = true;
            break;
        case 's':
            moveBackward = true;
            break;
        case 'q':
            turnLeft = true;
            break;
        case 'd':
            turnRight = true;
            break;
        case ' ':
            goUp = true;
            break;
        case 'Shift':
            goDown = true;
            break;
    }
}

export function onMouseMove(event) {
    yaw -= event.movementX * sensitivity;
    pitch -= event.movementY * sensitivity;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));  // Limiter le pitch entre -90° et 90°
}
