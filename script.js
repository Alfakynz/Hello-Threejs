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
const cubes = [
	createCube(0x0000ff, -1, 0, 0),
	createCube(0xffffff, 0, 0, 0),
	createCube(0xff0000, 1, 0, 0),
	createCube(0x0000ff, -1, 1, 0),
	createCube(0xffffff, 0, 1, 0),
	createCube(0xff0000, 1, 1, 0),
	createCube(0x00ff00, 3, 3, 3)
]

const plane = createPlane(0x808080, 0, -1, 0);
const border = createBorder(plane, 'white');

// Ajout des shapes à la scène et des bordures aux shapes
cubes.forEach(cube => scene.add(cube));
scene.add(plane);
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

function updateBoundingBoxes() {
	const margin = 0.25;
	const marginTop = 1.25;
	cubes.forEach(cube => {
		cube.geometry.computeBoundingBox();
		cube.boundingBox = cube.geometry.boundingBox.clone();

		cube.boundingBox.min.x -= margin;
		cube.boundingBox.max.x += margin;
		cube.boundingBox.min.z -= margin;
		cube.boundingBox.max.z += margin;
		cube.boundingBox.min.y -= margin;
		cube.boundingBox.max.y += marginTop;

		cube.boundingBox.applyMatrix4(cube.matrixWorld);
	});
}

// Fonction pour vérifier les collisions
function checkCollisions(newPosition) {
	for (let cube of cubes) {
		if (cube.boundingBox.containsPoint(newPosition)) {
			return true;
		}
	}
	return false;
}

function animate() {
	requestAnimationFrame(animate);

	updateBoundingBoxes();

	// Mettre à jour la rotation de la caméra en utilisant des quaternions
	const quaternion = new THREE.Quaternion();
	quaternion.setFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'));
	camera.quaternion.copy(quaternion);

	handleControls(camera, cameraDirection, keysPressed, moveSpeed, checkCollisions); // Gérer les commandes de déplacement et de rotation

	renderer.render(scene, camera);
}

animate();