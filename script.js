import * as THREE from 'three';
import { initScene, initCamera, initRenderer } from './sceneSetup';
import { createCube, createPlane, createBorder } from './shapes';
import { handleControls } from './controls';

// Création de la scène, de la caméra et du rendu
const scene = initScene();
const camera = initCamera();
const renderer = initRenderer();

// Positionner la caméra
camera.position.z = 3;

// Variable pour suivre la direction de la caméra
const cameraDirection = new THREE.Vector3();

// Création des cubes et du sol et des bordures
const cube1 = createCube(0x0000ff, -1, 0, 0);
const cube2 = createCube(0xffffff, 0, 0, 0);
const cube3 = createCube(0xff0000, 1, 0, 0);
const cube4 = createCube(0x0000ff, -1, 1, 0);
const cube5 = createCube(0xffffff, 0, 1, 0);
const cube6 = createCube(0xff0000, 1, 1, 0);
const plane = createPlane(0x808080, 0, -1, 0);

const border1 = createBorder(cube1, 'white');
const border2 = createBorder(cube2, 'white');
const border3 = createBorder(cube3, 'white');
const border4 = createBorder(cube4, 'white');
const border5 = createBorder(cube5, 'white');
const border6 = createBorder(cube6, 'white');
const border = createBorder(plane, 'white');

// Ajout des shapes à la scène et des bordures aux shapes
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);
scene.add(cube5);
scene.add(cube6);
scene.add(plane);

cube1.add(border1);
cube2.add(border2);
cube3.add(border3);
cube4.add(border4);
cube5.add(border5);
cube6.add(border6);
plane.add(border);

// Variables pour la gestion des contrôles
const moveSpeed = 0.1;
const keysPressed = {};

// Gestion des touches pressées et relâchées
document.addEventListener('keydown', (event) => {
	keysPressed[event.code] = true;
});

document.addEventListener('keyup', (event) => {
	keysPressed[event.code] = false;
});

// Fonction pour verrouiller le pointeur
document.body.addEventListener('click', () => {
	document.body.requestPointerLock();
}, false);

document.addEventListener('pointerlockchange', () => {
	if (document.pointerLockElement === document.body) {
		document.addEventListener('mousemove', onMouseMove, false);
	} else {
		document.removeEventListener('mousemove', onMouseMove, false);
	}
}, false);

// Variables pour suivre la rotation de la caméra
let yaw = 0;  // Rotation horizontale (gauche/droite)
let pitch = 0;  // Rotation verticale (haut/bas)
const sensitivity = 0.002;  // Sensibilité de la souris

// Fonction pour gérer le mouvement de la souris
function onMouseMove(event) {
	yaw -= event.movementX * sensitivity;
	pitch -= event.movementY * sensitivity;
	pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));  // Limiter le pitch entre -90° et 90°
}

// Gestion du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
	requestAnimationFrame(animate);

	// Mettre à jour la rotation de la caméra en utilisant des quaternions
	const quaternion = new THREE.Quaternion();
	quaternion.setFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'));
	camera.quaternion.copy(quaternion);

	handleControls(camera, cameraDirection, keysPressed, moveSpeed); // Gérer les commandes de déplacement et de rotation

	renderer.render(scene, camera);
}

animate();