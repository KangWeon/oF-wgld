#version 150
precision mediump float;

uniform sampler2DRect tex0;
uniform sampler2DRect tex1;
uniform float height;

in vec4 vColor;
in vec2 vTexCoord;
in vec3 vEyeDirection;
in vec3 vLightDirection;

out vec4 outputColor;

void main(){
    
    vec3  light     = normalize(vLightDirection);
    vec3  eye       = normalize(vEyeDirection);
    float hScale    = texture(tex1, vTexCoord).r * height;
    vec2  hTexCoord = vTexCoord - hScale * eye.xy;
    vec3  mNormal   = (texture(tex0, hTexCoord) * 2.0 - 1.0).rgb;
    vec3  halfLE    = normalize(light + eye);
    float diffuse   = clamp(dot(mNormal, light), 0.1, 1.0);
    float specular  = pow(clamp(dot(mNormal, halfLE), 0.0, 1.0), 100.0);
    vec4  destColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0);
    outputColor    = destColor;
}
