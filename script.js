import * as THREE from 'three';
import { initScene, initCamera, initRenderer } from './sceneSetup';
import { createCube } from './shapes';

// Création de la scène, de la caméra et du rendu
const scene = initScene();
const camera = initCamera();
const renderer = initRenderer();

// Création du premier cube
const cube1 = createCube(0x0000ff, -1, 0, 0);
const cube2 = createCube(0xffffff, 0, 0, 0);
const cube3 = createCude(0xff0000, 1, 0, 0);
/*
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.set(-1, 0, 0)*/
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);

// Création du deuxième cube
/*const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(0, 0, 0); // Positionner le deuxième cube à côté du premier
scene.add(cube2);*/

// Création du troisième cube
/*
const geometry3 = new THREE.BoxGeometry(1, 1, 1);
const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.set(1, 0, 0); // Positionner le deuxième cube à côté du premier
scene.add(cube3);*/

// Création du quatrième cube
const geometry4 = new THREE.BoxGeometry(1, 1, 1);
const material4 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube4 = new THREE.Mesh(geometry4, material4);
cube4.position.set(-1, 1, 0)
scene.add(cube4);

// Création du cinquième cube
const geometry5 = new THREE.BoxGeometry(1, 1, 1);
const material5 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube5 = new THREE.Mesh(geometry5, material5);
cube5.position.set(0, 1, 0); // Positionner le deuxième cube à côté du premier
scene.add(cube5);

// Création du sixième cube
const geometry6 = new THREE.BoxGeometry(1, 1, 1);
const material6 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube6 = new THREE.Mesh(geometry6, material6);
cube6.position.set(1, 1, 0); // Positionner le deuxième cube à côté du premier
scene.add(cube6);

// Création du sol
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
function handleControls() {
	// Obtenir la direction de la caméra
	camera.getWorldDirection(cameraDirection);

	// Avancer
	if (moveForward) {
		camera.position.add(cameraDirection.multiplyScalar(moveSpeed));
	}
	// Reculer
	if (moveBackward) {
		camera.position.sub(cameraDirection.clone().multiplyScalar(moveSpeed));
	}
	// Tourner à gauche
	if (turnLeft) {
		const leftDirection = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x).normalize();
		camera.position.sub(leftDirection.multiplyScalar(moveSpeed));
	}
	// Tourner à droite
	if (turnRight) {
		const rightDirection = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize();
		camera.position.sub(rightDirection.multiplyScalar(moveSpeed));
	}
	// Monter
	if (goUp) {
		const upDirection = new THREE.Vector3(0, 1, 0);
		camera.position.add(upDirection.clone().multiplyScalar(moveSpeed));
	}
	if (goDown) {
		const upDirection = new THREE.Vector3(0, 1, 0);
		camera.position.sub(upDirection.clone().multiplyScalar(moveSpeed));
	}
}

// Gestion des touches pressées et relâchées
document.addEventListener('keydown', (event) => {
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
});

document.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'z':
			moveForward = false;
			break;
		case 's':
			moveBackward = false;
			break;
		case 'q':
			turnLeft = false;
			break;
		case 'd':
			turnRight = false;
			break;
		case ' ':
			goUp = false;
			break;
		case 'Shift':
			goDown = false;
			break;
	}
});

camera.position.z = 2;

// Ajout des bordures aux cubes
const border1 = new THREE.LineSegments(
	new THREE.EdgesGeometry(cube1.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
cube1.add(border1);

const border2 = new THREE.LineSegments(
	new THREE.EdgesGeometry(cube2.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
cube2.add(border2);

const border3 = new THREE.LineSegments(
	new THREE.EdgesGeometry(cube3.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
cube3.add(border3);

const border4 = new THREE.LineSegments(
	new THREE.EdgesGeometry(cube4.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
cube4.add(border4);

const border5 = new THREE.LineSegments(
	new THREE.EdgesGeometry(cube5.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
cube5.add(border5);

const border6 = new THREE.LineSegments(
	new THREE.EdgesGeometry(cube6.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
cube6.add(border6);

const border = new THREE.LineSegments(
	new THREE.EdgesGeometry(plane.geometry),
	new THREE.LineBasicMaterial({ color: 'white' })
);
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