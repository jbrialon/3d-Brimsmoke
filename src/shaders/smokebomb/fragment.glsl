varying vec2 vUv;

uniform float uTime;
uniform float uAlpha;
uniform float uXSpeed;
uniform float uYSpeed;
uniform float uScale;
uniform vec3 uColor;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

void main() {
    vec2 smokeUv = vUv * uScale;
    smokeUv.x -= uTime * uXSpeed;
    smokeUv.y -= uTime * uYSpeed;

    vec3 textureOne = texture(uTextureOne, smokeUv).rgb;
    float textureTwo = texture(uTextureTwo, smokeUv).r;

    vec3 color = uColor * textureOne;
    float alpha = uAlpha == 1.0 ? uAlpha : textureTwo;
    gl_FragColor = vec4(color, alpha);
}
