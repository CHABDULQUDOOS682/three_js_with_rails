import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    console.log("Hello stimulus...", this.element);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: false});

    this.originCube = this.createCube(0,0,0);

    this.scene.add(this.originCube);

    this.camera.position.z = 5;

    this.animate();


  }

  animate(){
    requestAnimationFrame(this.animate.bind(this));
    this.originCube.rotation.x += 0.01;
    this.originCube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera)
  }

  createCube(x,y,z){
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x,y,z);
    return cube;
  }
}
