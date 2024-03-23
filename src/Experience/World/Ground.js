import * as THREE from "three";
import Experience from "../Experience";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;

    // Options
    this.options = {
      color: new THREE.Color(0x646464),
    };

    // Setup
    this.setMaterial();
    this.setModel();
    this.setGrid();

    // Debug
    this.setDebug();
  }

  setMaterial() {
    this.material = new THREE.MeshLambertMaterial({
      color: this.options.color,
      side: THREE.DoubleSide,
    });
  }

  setModel() {
    this.geometry = new THREE.PlaneGeometry(10000, 10000);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }

  setGrid() {
    this.gridHelper = new THREE.GridHelper(500, 500, "#2c2c2c", "#2c2c2c");
    this.gridHelper.position.y = 0.02;
    this.scene.add(this.gridHelper);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Ground");
      this.debugFolder
        .addColor(this.options, "color")
        .name("Ground color")
        .onChange(() => {
          this.material.color = this.options.color;
        });
    }
  }

  update() {}
}
