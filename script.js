import * as THREE from 'three';
import { initScene, initCamera, initRenderer } from './sceneSetup';
import { createCube, createPlane, createBorder } from './shapes';

// Création de la scène, de la caméra et du rendu
const scene = initScene();
const camera = initCamera();
const renderer = initRenderer();

// Création du premier cube
const cube1 = createCube(0x0000ff, -1, 0, 0);
const cube2 = createCube(0xffffff, 0, 0, 0);
const cube3 = createCube(0xff0000, 1, 0, 0);
const cube4 = createCube(0x0000ff, -1, 1, 0);
const cube5 = createCube(0xffffff, 0, 1, 0);
const cube6 = createCube(0xff0000, 1, 1, 0);

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);
scene.add(cube5);
scene.add(cube6);

// Création du sol
// const plane = createPlane(0x808080, 0, -1, 0);
const planeGeometry = new THREE.BoxGeometry(10, 10, 1);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Couleur grise
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotation pour placer le plan horizontalement
plane.position.y = -1; // Positionner le plan sous les cubes

scene.add(plane);

// Variables pour suivre la position de la caméra
const moveSpeed = 0.1; // Vitesse de déplacement
let moveForward = false;
let moveBackward = false;
let turnLeft = false;
let turnRight = false;
let goUp = false;
let goDown = false;

// Variables pour suivre la direction de la caméra
const cameraDirection = new THREE.Vector3();

// Fonction pour gérer les commandes de déplacement et de rotation
const keysPressed = {};

// Gestion des touches pressées et relâchées
document.addEventListener('keydown', (event) => {
	keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
	keysPressed[event.key] = false;
});

function handleControls() {
	// Obtenir la direction de la caméra
	camera.getWorldDirection(cameraDirection);

	// Avancer
	if (keysPressed['z']) {
		const forwardDirection = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize();
		camera.position.add(forwardDirection.clone().multiplyScalar(moveSpeed));
	}
	// Reculer
	if (keysPressed['s']) {
		const forwardDirection = new THREE.Vector3(-cameraDirection.x, 0, -cameraDirection.z).normalize();
		camera.position.add(forwardDirection.clone().multiplyScalar(moveSpeed));
	}
	// Tourner à gauche
	if (keysPressed['q']) {
		const leftDirection = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize();
		camera.position.add(leftDirection.clone().multiplyScalar(moveSpeed));
	}
	// Tourner à droite
	if (keysPressed['d']) {
		const rightDirection = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x).normalize();
		camera.position.add(rightDirection.clone().multiplyScalar(moveSpeed));
	}
	// Monter
	if (keysPressed[' ']) {
		const upDirection = new THREE.Vector3(0, 1, 0);
		camera.position.add(upDirection.clone().multiplyScalar(moveSpeed));
	}
	// Descendre
	if (keysPressed['Shift']) {
		const upDirection = new THREE.Vector3(0, -1, 0);
		camera.position.add(upDirection.clone().multiplyScalar(moveSpeed));
	}
}

camera.position.z = 2;

// Ajout des bordures aux cubes
const border1 = createBorder(cube1, 'white');
const border2 = createBorder(cube2, 'white');
const border3 = createBorder(cube3, 'white');
const border4 = createBorder(cube4, 'white');
const border5 = createBorder(cube5, 'white');
const border6 = createBorder(cube6, 'white');
const border = createBorder(plane, 'white');

cube1.add(border1);
cube2.add(border2);
cube3.add(border3);
cube4.add(border4);
cube5.add(border5);
cube6.add(border6);
plane.add(border);

// Variables pour suivre la rotation de la caméra
let yaw = 0;  // Rotation horizontale (gauche/droite)
let pitch = 0;  // Rotation verticale (haut/bas)
const sensitivity = 0.002;  // Sensibilité de la souris

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

	handleControls(); // Gérer les commandes de déplacement et de rotation

	renderer.render(scene, camera);
}

animate();