# Getting started with ThreeJS, React Native, and Expo.io on OSX

![preview](https://cloud.githubusercontent.com/assets/310223/24178400/1a3d1298-0e66-11e7-90b3-c2b96060f67c.gif)

This tutorial will guide you through building the game above. Afterwards you will probably go on to build something better.

**Features:**

* Collision detection for overlapping objects.
* Adding an object through a touch event handler.
* Animating a set of objects within an interval.

This tutorial will cover how to build a [React Native](https://facebook.github.io/react-native/) game using [Expo.io](https://expo.io/) and [ThreeJS](https://threejs.org/). If these are new concepts for you, **don't worry**! We'll work through the process step by step together.

Do whatever you like with the code.

#### Tutorial Requirements:
* [NodeJS 7+](https://nodejs.org/en/)
* Git

#### Run the complete version of this project:
```sh
git clone git@github.com:jimmylee/threejs-react-native-demo.git
cd threejs-react-native-demo
npm install

# open the project in exponent.
```

#### Expo direct link
```sh
exp://wv-sif.jimmylee.threejs-react-native-demo.exp.direct
```
<br />
<br />
<br />
<br />

## Prelude: Get Expo
1. Download Expo from their website. [Click here to download the OSX link](https://xde-updates.exponentjs.com/download/mac).
2. Drag and drop Expo into the Applications folder.

![screen shot 2017-03-21 at 4 57 48 pm](https://cloud.githubusercontent.com/assets/310223/24176136/7416776e-0e57-11e7-88c4-46f202f1c9f4.png)

* Select **new project**.

![screen shot 2017-03-21 at 5 02 36 pm](https://cloud.githubusercontent.com/assets/310223/24176262/1d1c5450-0e58-11e7-9ddd-edd70b5b79a6.png)

* Give it a name :)
* Aside: you can specify a directory in case you want to organize your projects with other projects.

![screen shot 2017-03-21 at 5 03 45 pm](https://cloud.githubusercontent.com/assets/310223/24176285/42800af2-0e58-11e7-8b9a-a2cc851f2587.png)

* Clicking the device icon will open up iOS or Android simulators.

![screen shot 2017-03-21 at 5 06 52 pm](https://cloud.githubusercontent.com/assets/310223/24176374/cdea8554-0e58-11e7-9ad9-f6b1bfc509fa.png)
<br />
<br />
<br />
<br />
## 1. Integrating ThreeJS
You're going to need to add ThreeJS the `package.json` file in your project.

<img width="875" alt="screen shot 2017-03-21 at 5 14 02 pm" src="https://cloud.githubusercontent.com/assets/310223/24176527/bb8f7bca-0e59-11e7-8552-c1538fc3a3c9.png">

A really great way to add ThreeJS is via the command line:

```sh
npm install --save three
```

And after you're finished, your terminal should look like this on OSX.

<img width="655" alt="screen shot 2017-03-21 at 5 19 34 pm" src="https://cloud.githubusercontent.com/assets/310223/24176663/952df50a-0e5a-11e7-9aec-ec02c35f6e63.png">

In the future, I will try to contribute a template/skeleton project for getting started with ThreeJS.
<br />
<br />
<br />
<br />

## 2. Getting ThreeJS Running.

Open up `main.js` and take a look.

<img width="1005" alt="screen shot 2017-03-21 at 5 22 48 pm" src="https://cloud.githubusercontent.com/assets/310223/24176712/eb936074-0e5a-11e7-9bc8-99cc6b98badf.png">

Copy and paste the code below to replace the contents of `main.js`.

#### Skeleton for an react native app using THREEView:

```js
import Expo from 'expo';
import React, { Component, PropTypes } from 'react';
import * as THREE from 'three';

const THREEView = Expo.createTHREEViewClass(THREE);

class YourGame extends Component {
  componentWillMount() {
    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
    this.camera.position.x = 300;
    this.camera.position.z = 0;
    this.camera.position.y = 800;

    this.camera.lookAt(new THREE.Vector3());
    this.scene = new THREE.Scene();
  }

  _handleTouchStart = (e) => {

  }

  tick = (dt) => {

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

Expo.registerRootComponent(YourGame);
```

Overview:

* `Expo.createTHREEViewClass(THREE);` - the method required in order to create a THREEView.
* `THREEView` takes [many arguments](https://github.com/jimmylee/threejs-react-native-demo). The props `scene` and `camera` are required if you want to see anything.
* `style={{ flex: 1 }}` ensures that the `THREEView` takes up the full screen.
* `onTouchStart` is available because THREEView also accepts `View` component props. For our case it will handle retrieving coordinates from the `nativeEvent`.

Your screen should look like this:

![screen shot 2017-03-21 at 5 32 54 pm](https://cloud.githubusercontent.com/assets/310223/24176913/595b0c50-0e5c-11e7-9d4d-f9229cfdde70.png)

* Aside: dismiss the warnings by clicking on them, then clicking `dismiss all`.
* Please let me know if you know how to hide these warnings.

**Checkpoint**: Now, you are running ThreeJS within React Native on an iOS Simulator.
<br />
<br />
<br />
<br />

## 3. Animate a mesh for me or I am totally bailing on this tutorial.

Okay okay I get it, you want to see some cool stuff.

The next steps will render a mesh to the screen and rotate it over an interval.

Setting up utility methods:

1. Create a folder called `utilities`.
2. Add file called `mesh.js`
3. Imported all imports from `utilities/meshes` and put them under the variable name `Meshes`

<img width="994" alt="screen shot 2017-03-21 at 5 42 06 pm" src="https://cloud.githubusercontent.com/assets/310223/24177179/e2a7b228-0e5d-11e7-9f65-e0dfab391dae.png">

Now we can add a method to create a cube.

```js
import * as THREE from 'three';

export const createCube = () => {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
    wireframeLinewidth: 2
  });

  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
```

Then after that, we can use the `createCube` method in `componentWillMount`

<img width="1049" alt="screen shot 2017-03-21 at 5 48 32 pm" src="https://cloud.githubusercontent.com/assets/310223/24177282/a37e089e-0e5e-11e7-9349-b2c547dc63c9.png">

Your screen should look like this:

<img width="356" alt="screen shot 2017-03-21 at 6 46 57 pm" src="https://cloud.githubusercontent.com/assets/310223/24178507/b9af7e92-0e66-11e7-89f6-b0ec172a3555.png">

To animate this Mesh, lets declare an array to keep track of the `ids` of objects we want to animate.

```js
this.animatingIds = [];
const cube = Meshes.createCube();
this.scene.add(cube);
this.animatingIds.push(cube.id);
```

By pushing the `cube.id` into the array, we have added the id to an easy variable to reference when animating. Now we can add lines of code to our `tick` method.

```js
this.animatingIds.forEach(id => {
  const object = this.scene.getObjectById(id);
  object.rotation.z += 2 * dt;
  object.rotation.x += 2 * dt;
});
```

* `dt` is provided as the first argument from the callback of `tick`.
* `dt` is used as a modifier for the rate of rotation.
* Later we will use `dt` as a modifier for the rate at which a cube changes position.

**Checkpoint: you should see a spinning cube in your iOS simulator.**

![preview](https://cloud.githubusercontent.com/assets/310223/24177749/e0f79d86-0e61-11e7-8113-182c7892334e.gif)
<br />
<br />
<br />
<br />

## Hey Jim, how do we actually make the game you advertised earlier?

Lets sumrise what we've accomplished first:

* You can use ThreeJS and React Native together. Woah!
* You animated a geometry using a callback method that is fired on an interval.
* You set up a perspective camera! [Here is some documentation in case you are curious about changing it](https://threejs.org/docs/?q=camera#Reference/Cameras/PerspectiveCamera).

Next, we will:

* Create a method that will determine if the objects are overlapping.
* Animate multiple objects at the same time.
* Create a method for placing an object on the screen if its aligned to the grid.
* Add a grid and more geometries to the scene.
* Destroy elements that touch blue box.

Feel free to copy and paste or write the code from scratch.
<br />
<br />
<br />

#### Geometries:

Lets create `utilities/utils.js` and add the following methods:

```js
import * as THREE from 'three';

export const isInside = (target, candidate) => {
  const a = new THREE.Box3().setFromObject(target);
  const b = new THREE.Box3().setFromObject(candidate);

  return a.intersectsBox(b);
}
```

* Checks if the candidate's bounding box intersects the targets bounding box.
* `a.intersectsBox(b)` will return true if the two objects are overlapping in anyway.
* This method acts as our basic collision detection.


```js
import * as THREE from 'three';
import Dimensions from 'Dimensions';

export const getIntersects = (x, y, camera, objects) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const raycaster = new THREE.Raycaster();
  const position = new THREE.Vector2();

  position.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
  raycaster.setFromCamera(position, camera);

  return raycaster.intersectObjects(objects);
}
```

* `x` and `y` represent the 2d coordinates of the last place you touched.
* `camera` represents the current state of the camera object.
* `objects` represents an array containing the plane that was added to the scene.
* The return value is an Array of the objects that intersect the last click location.
* We use this method to determine if we should add a cube ot a screen.

Next lets add some more geometries to the scene. You can just copy and paste these into your `utilities/meshes.js`

```js
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
```

* This method will create an object that represents a grid with red colored lines.
* The surface area of each square is determined by `step`.
* The entire surface area is determined by `size`.


```js
export const createPlane = (width, length) => {
  const planeGeometry = new THREE.PlaneBufferGeometry(width, length);
  planeGeometry.rotateX(-Math.PI / 2);

  return new THREE.Mesh(
    planeGeometry,
    new THREE.MeshBasicMaterial({ visible: false })
  );
}
```

* Creates the object that acts as a reference object for whether or not a cube is allowed to be placed.
* Gets passed into `getIntersects` through an array.


```js
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
```

* creates the blue cube that moves back and forth.
* Aside: this code example exposes that the color property can be a string name.
<br />
<br />
<br />

#### Animation:

Next we will create `utilities/animate.js`, where we will add some simple methods for animating objects with different ids, and clean up after collision.


```js
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
```

* mutate the `userData.animDirection` property if the mesh's position hits a certain bound.
* Used for the blue `catcher` object on the screen.


```js
export const animateCatcher = (mesh, dt) => {
  mesh.userData.animDirection = getNextDirection(mesh);

  if (mesh.userData.animDirection === 'left') {
    mesh.position.z += mesh.userData.animRate * dt;
  }
  if (mesh.userData.animDirection === 'right') {
    mesh.position.z -= mesh.userData.animRate * dt;
  }
}
```

* animates the object based on the `userData.animDirection`, otherwise doesn't animate the object at all.


```js
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
```

* `getAnimatableIds` will filter out ids that should not be animated.
* `removal` represents an array of `id` that should have their corresponding object removed from the scene.


```js
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
```

* Updates the animation for each of the cubes.
* If there is a collision between a cube and the blue cube, we add the normal cube's `id` to the `removalArray`.
<br />
<br />
<br />

#### Putting it all together:

Finally we update `main.js`, here is the final product.


```js
import Expo from 'expo';
import React, { Component, PropTypes } from 'react';
import * as Meshes from './utilities/meshes';
import * as Utils from './utilities/utils';
import * as Animate from './utilities/animate';
import * as THREE from 'three';

const THREEView = Expo.createTHREEViewClass(THREE);

class YourGame extends Component {
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

Expo.registerRootComponent(YourGame);
```

* I added `propTypes` and `defaultProps`, but they are not necessary! You may want to dynamically create those values based on the size of the viewport.

You should now end up with this:

![preview](https://cloud.githubusercontent.com/assets/310223/24178396/15fc28f4-0e66-11e7-9050-879505f820dd.gif)

Congrats! You are done. Go forth and extend, modify, and do whatever you please with the code :)

[Say Things On Twitter](https://www.twitter.com/meanjim)
<br />
<br />
<br />
<br />
<br />

The MIT License (MIT)

Copyright (c) 2017 Jimmy Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
