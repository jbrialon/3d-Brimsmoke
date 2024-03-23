import * as THREE from "three";

import Experience from "../Experience";
import Environment from "./Environment";
import Ground from "./Ground";
import Smokebomb from "./Smokebomb";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.ground = new Ground();
      this.smokebombOne = new Smokebomb({
        position: new THREE.Vector3(0, 0, 0),
      });
      this.smokebombTwo = new Smokebomb({
        position: new THREE.Vector3(-32, 0, 6),
      });
      this.smokebombThree = new Smokebomb({
        position: new THREE.Vector3(6, 0, -32),
      });
      this.environment = new Environment();
    });
  }

  update() {
    if (this.smokebombOne) this.smokebombOne.update();
    if (this.smokebombTwo) this.smokebombTwo.update();
    if (this.smokebombThree) this.smokebombThree.update();
  }
}
