import * as THREE from "three";
import Experience from "../Experience";

import vertexShader from "../../shaders/smokebomb/vertex.glsl";
import fragmentShader from "../../shaders/smokebomb/fragment.glsl";

export default class Smokebomb {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    this.textureOne = this.resources.items.smokeTextureOne;
    this.textureOne.wrapS = THREE.RepeatWrapping;
    this.textureOne.wrapT = THREE.RepeatWrapping;

    this.textureTwo = this.resources.items.smokeTextureTwo;

    this.textureTwo.wrapS = THREE.RepeatWrapping;
    this.textureTwo.wrapT = THREE.RepeatWrapping;

    // Options
    this.options = {
      uColorInner: new THREE.Color(0xcd9366),
      uColorOuter: new THREE.Color(0xab734c),
    };

    // Setup
    this.setMaterial();
    this.setModel();

    // Debug
    this.setDebug();
  }

  setMaterial() {
    this.innerSmokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: new THREE.Uniform(0),
        uAlpha: new THREE.Uniform(1),
        uScale: new THREE.Uniform(1),
        uXSpeed: new THREE.Uniform(-0.2),
        uYSpeed: new THREE.Uniform(0.1),
        uColor: new THREE.Uniform(this.options.uColorInner),
        uTextureOne: new THREE.Uniform(this.textureOne),
        uTextureTwo: new THREE.Uniform(this.textureTwo),
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthWrite: false,
      wireframe: false,
      transparent: false,
    });

    this.outerSmokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: new THREE.Uniform(0),
        uAlpha: new THREE.Uniform(0),
        uScale: new THREE.Uniform(1),
        uXSpeed: new THREE.Uniform(-0.3),
        uYSpeed: new THREE.Uniform(0.2),
        uColor: new THREE.Uniform(this.options.uColorOuter),
        uTextureOne: new THREE.Uniform(this.textureOne),
        uTextureTwo: new THREE.Uniform(this.textureTwo),
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthWrite: false,
      wireframe: false,
      transparent: true,
    });
  }

  setModel() {
    this.smoke = new THREE.Group();
    this.innerSphere = new THREE.SphereGeometry(1, 32, 16);
    this.innerSmoke = new THREE.Mesh(this.innerSphere, this.innerSmokeMaterial);
    this.innerSmoke.scale.set(0.97, 0.97, 0.97);
    this.smoke.add(this.innerSmoke);

    this.outerSphere = new THREE.SphereGeometry(1, 32, 16);
    this.outerSmoke = new THREE.Mesh(this.outerSphere, this.outerSmokeMaterial);
    this.smoke.add(this.outerSmoke);

    this.smoke.scale.set(5, 5, 5);
    this.scene.add(this.smoke);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Smoke");
      this.debugFolder
        .addColor(this.options, "uColorInner")
        .name("inner Smoke color")
        .onChange(() => {
          this.innerSmokeMaterial.uniforms.uColor.value =
            this.options.uColorInner;
        });
      this.debugFolder
        .addColor(this.options, "uColorOuter")
        .name("outer Smoke color")
        .onChange(() => {
          this.outerSmokeMaterial.uniforms.uColor.value =
            this.options.uColorOuter;
        });
    }
  }

  update() {
    // Smoke animation
    this.innerSmokeMaterial.uniforms.uTime.value = this.time.elapsedTime * 0.5;
    this.outerSmokeMaterial.uniforms.uTime.value = this.time.elapsedTime * 0.5;
  }
}
