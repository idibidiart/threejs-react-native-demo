import Expo from 'expo';
import React, { Component, PropTypes } from 'react';
import * as Meshes from './utilities/scene';
import * as Utils from './utilities/utils';
import * as Animate from './utilities/animate';
import * as THREE from 'three';

const THREEView = Expo.createTHREEViewClass(THREE);

class InteractiveGrid extends Component {
  static propTypes = {
    gridX: PropTypes.number,
    gridY: PropTypes.number
  };

  static defaultProps = {
    gridX: 200,
    gridY: 200
  };

  componentWillMount() {
    this.objects = [];
    this.animatingIds = [];
    this.removalArray = [];

    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
    this.camera.position.x = 300;
    this.camera.position.z = 0;
    this.camera.position.y = 800;

    this.camera.lookAt(new THREE.Vector3());

    this.scene = new THREE.Scene();

    const grid = Meshes.createGrid(this.props.gridX, 50);
    this.scene.add(grid);

    const plane = Meshes.createPlane(this.props.gridX * 2, this.props.gridY * 2);
    this.scene.add(plane);

    this.catcher = Meshes.createCatcher();
    this.scene.add(this.catcher);

    this.objects.push(plane);
  }

  _handleTouchStart = (event) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    const intersects = Utils.getIntersects(x, y, this.camera, this.objects);

    if (intersects.length > 0) {
      const intersect = intersects[0];

      const cube = Meshes.createCube();
      cube.position.copy(intersect.point).add(intersect.face.normal);
      cube.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

      this.scene.add(cube);
      this.animatingIds.push(cube.id);
    }
  }

  tick = (dt) => {
    const animations = Animate.getAnimatableIds(
      this.scene,
      this.animatingIds,
      this.removalArray
    );
    Animate.animateCatcher(this.catcher, dt);
    animations.forEach(id => {
      Animate.animateCubeFromId(
        id,
        dt,
        this.catcher,
        this.scene,
        this.removalArray
      );
    });
  }

  render() {
    return (
      <THREEView
        style={{ flex: 1 }}
        scene={this.scene}
        camera={this.camera}
        tick={this.tick}
        onTouchStart={this._handleTouchStart}>
      </THREEView>
    );
  }
}

Expo.registerRootComponent(InteractiveGrid);
