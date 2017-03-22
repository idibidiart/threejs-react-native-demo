import * as THREE from 'three';
import Dimensions from 'Dimensions';

export const isInside = (target, candidate) => {
  const a = new THREE.Box3().setFromObject(target);
  const b = new THREE.Box3().setFromObject(candidate);

  return a.intersectsBox(b);
}

export const getIntersects = (x, y, camera, objects) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const raycaster = new THREE.Raycaster();
  const position = new THREE.Vector2();

  position.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
  raycaster.setFromCamera(position, camera);

  return raycaster.intersectObjects(objects);
}
