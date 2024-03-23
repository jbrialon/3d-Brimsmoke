import * as THREE from "three";
import { gsap } from "gsap";
import Experience from "../Experience";

import smokebombMaterial from "../Materials/smokebombMaterial.js";

export default class Smokebomb {
  constructor(options) {
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
      position: options.position,
      uColorInner: new THREE.Color(0xcd9366),
      uColorOuter: new THREE.Color(0xab734c),
    };

    // Setup
    this.setMaterial();
    this.setModel();
    this.setAnimation();
    // Debug
    this.setDebug();
  }

  setMaterial() {
    this.innerSmokeMaterial = smokebombMaterial({
      uTime: 0,
      uInner: true,
      uAlpha: 1,
      uScale: 0.1,
      uXSpeed: -0.2,
      uYSpeed: 0.1,
      uColor: this.options.uColorInner,
      uTextureOne: this.textureOne,
      uTextureTwo: this.textureTwo,
    });

    this.outerSmokeMaterial = smokebombMaterial({
      uTime: 0,
      uInner: false,
      uAlpha: 1,
      uScale: 0.1,
      uXSpeed: -0.3,
      uYSpeed: 0.2,
      uColor: this.options.uColorOuter,
      uTextureOne: this.textureOne,
      uTextureTwo: this.textureTwo,
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

    // this.smoke.scale.set(5, 5, 5);
    this.smoke.scale.set(0, 0, 0);
    this.smoke.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );
    this.scene.add(this.smoke);
  }

  setAnimation() {
    this.tl = gsap.timeline({ delay: Math.random() * 2, repeat: -1 });
    this.tl
      .addLabel("launch")
      .to(
        this.smoke.scale,
        {
          x: 5,
          y: 5,
          z: 5,
          duration: 1.25,
          // ease: "power3.in",
        },
        "launch"
      )
      .to(
        this.outerSmokeMaterial.uniforms.uScale,
        {
          value: 1,
          duration: 1.25,
          // ease: "power3.in",
        },
        "launch"
      )
      .to(
        this.innerSmokeMaterial.uniforms.uScale,
        {
          value: 1,
          duration: 1.25,
          // ease: "power3.in",
        },
        "launch"
      );

    // Second Step: "fade"
    // Adding the label "fade" at the start of these animations
    // You can control the start time of "fade" relative to "launch" by adjusting the position parameter
    // For example, to start "fade" immediately after "launch", you can use "+=0" as the position parameter
    this.tl
      .addLabel("fade", `+=${4 + Math.random() * 6}`)
      .to(
        this.outerSmokeMaterial.uniforms.uAlpha,
        {
          value: 0,
          duration: 2,
          // ease: "power3.in",
        },
        "fade"
      )
      .to(
        this.innerSmokeMaterial.uniforms.uAlpha,
        {
          value: 0,
          duration: 2,
          // ease: "power3.in",
        },
        "fade"
      );
  }
  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Smoke");
      this.debugFolder
        .add(
          {
            button: () => {
              gsap.to(this.smoke.scale, {
                x: 5,
                y: 5,
                z: 5,
                duration: 1.25,
                // ease: "power3.in",
              });
              gsap.to(this.outerSmokeMaterial.uniforms.uScale, {
                value: 1,
                duration: 1.25,
                // ease: "power3.in",
              });
              gsap.to(this.innerSmokeMaterial.uniforms.uScale, {
                value: 1,
                duration: 1.25,
                // ease: "power3.in",
              });
            },
          },
          "button"
        )
        .name("launch");

      this.debugFolder
        .add(
          {
            button: () => {
              gsap.to(this.outerSmokeMaterial.uniforms.uAlpha, {
                value: 0,
                duration: 2,
                // ease: "power3.in",
              });
              gsap.to(this.innerSmokeMaterial.uniforms.uAlpha, {
                value: 0,
                duration: 2,
                // ease: "power3.in",
              });
            },
          },
          "button"
        )
        .name("fade");

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
