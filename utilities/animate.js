import * as Utils from './utils';

const getNextDirection = (mesh) => {
  if (mesh.position.z >= 170 && mesh.userData.animDirection === 'left') {
    return 'right';
  }

  if (mesh.position.z <= -170 && mesh.userData.animDirection === 'right') {
    return 'left';
  }

  return mesh.userData.animDirection;
}

export const animateCatcher = (mesh, dt) => {
  mesh.userData.animDirection = getNextDirection(mesh);

  if (mesh.userData.animDirection === 'left') {
    mesh.position.z += mesh.userData.animRate * dt;
  }
  if (mesh.userData.animDirection === 'right') {
    mesh.position.z -= mesh.userData.animRate * dt;
  }
}

export const getAnimatableIds = (scene, animations, removal) => {
  return animations.filter(id => {
    if (removal.includes(id)) {
      const object = scene.getObjectById(id);
      scene.remove(object);
      return false;
    }

    return true;
  });
}

export const animateCubeFromId = (id, dt, catcher, scene, removalArray) => {
  const object = scene.getObjectById(id);

  if (object.position.y >= 320) {
    return;
  }

  if (object.position.x >= 170) {
    object.position.y += object.userData.animRate * dt;

    if (Utils.isInside(catcher, object)) {
      removalArray.push(object.id);
    }
    return;
  }

  object.position.x += object.userData.animRate * dt;
}
