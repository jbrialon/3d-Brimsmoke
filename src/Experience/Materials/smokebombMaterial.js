import * as THREE from "three";

import vertexShader from "../../shaders/smokebomb/vertex.glsl";
import fragmentShader from "../../shaders/smokebomb/fragment.glsl";

const smokebombMaterial = (options) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: new THREE.Uniform(options.uTime),
      uInner: new THREE.Uniform(options.uInner),
      uAlpha: new THREE.Uniform(options.uAlpha),
      uScale: new THREE.Uniform(options.uScale),
      uXSpeed: new THREE.Uniform(options.uXSpeed),
      uYSpeed: new THREE.Uniform(options.uYSpeed),
      uColor: new THREE.Uniform(options.uColor),
      uTextureOne: new THREE.Uniform(options.uTextureOne),
      uTextureTwo: new THREE.Uniform(options.uTextureTwo),
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    depthWrite: false,
    wireframe: false,
    transparent: true,
  });
};

export default smokebombMaterial;
