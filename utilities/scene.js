import * as THREE from 'three';

export const createGrid = (size, step) => {
  const geometry = new THREE.Geometry();

  for (let i = -size; i <= size; i += step) {
    geometry.vertices.push(new THREE.Vector3(-size, 0, i));
    geometry.vertices.push(new THREE.Vector3(size, 0, i));
    geometry.vertices.push(new THREE.Vector3(i, 0, -size));
    geometry.vertices.push(new THREE.Vector3(i, 0, size));
  }

  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
    opacity: 1
  });

  return new THREE.LineSegments(geometry, material);
}

export const createPlane = (width, length) => {
  const planeGeometry = new THREE.PlaneBufferGeometry(width, length);
  planeGeometry.rotateX(-Math.PI / 2);

  return new THREE.Mesh(
    planeGeometry,
    new THREE.MeshBasicMaterial({ visible: false })
  );
}

export const createCube = () => {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
    wireframeLinewidth: 2
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.userData.animRate = 80;

  return cube;
}

export const createCatcher = () => {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 'skyblue',
    wireframe: true,
    wireframeLinewidth: 2
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = 170;
  cube.position.y = 240;
  cube.position.z = -170;
  cube.userData.animDirection = 'left';
  cube.userData.animRate = 120;

  return cube;
}
