import * as THREE from 'three';

class Shape {
    constructor() {
        this.geometry = null;
        this.material = null;
        this.mesh = null;
    }
}

class Cube extends Shape {
    constructor(color, x, y, z) {
        super();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
    }
}

class Plane extends Shape {
    constructor(color, x, y, z) {
        super();
        this.geometry = new THREE.BoxGeometry(10, 1, 10);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.set(x, y, z);
    }
}

export function createCube(color, x, y, z) {
    const cube = new Cube(color, x, y, z);
    return cube.mesh;
}

export function createPlane(color, x, y, z) {
    const plane = new Plane(color, x, y, z);
    return plane.mesh;
}

export function createBorder(shape, color) {
    const border = new THREE.LineSegments(
        new THREE.EdgesGeometry(shape.geometry),
        new THREE.LineBasicMaterial({ color: color })
    );
    return border;
}