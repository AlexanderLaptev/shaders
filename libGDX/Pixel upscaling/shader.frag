/*
    Pixel upscaling & antialiasing shader (fragment) for libGDX.

    Original code (public domain) for LÖVE engine by RNavega    https://github.com/RNavega/PixelArt-Antialias-Love2D/blob/master/main.lua
    Adapted for libGDX by Alexander Laptev.

    License: CC0.
*/

const float SMOOTH_SIZE = 1.0;
const float HALF_SMOOTH_SIZE = SMOOTH_SIZE / 2.0;

uniform sampler2D u_texture;
uniform vec2 u_size;
uniform vec2 u_scale;

varying vec4 v_color;
varying vec2 v_texCoords;

void main() {
    float scale= abs(u_scale);

    vec2 texel = v_texCoords * u_size;
    vec2 nearestEdge = floor(texel + 0.5);
    vec2 distance = (texel - nearestEdge) * scale;
    vec2 factor = clamp(distance / vec2(HALF_SMOOTH_SIZE), -1.0, 1.0);
    vec2 antialiasedUv = clamp((nearestEdge + 0.5 * factor) / u_size, 0.0, 1.0);

    vec2 centerOffset = abs(v_texCoords - vec2(0.5));
    vec2 halfSize = u_size / 2.0 * scale;
    vec2 refSize = halfSize - HALF_SMOOTH_SIZE;
    distance = ((centerOffset - 0.5) * u_size * scale - refSize) / SMOOTH_SIZE;

    float alpha = clamp(1.0 - max(distance.x, distance.y), 0.0, 1.0);
    vec4 textureColor = texture2D(u_texture, antialiasedUv);
    vec4 newColor = vec4(textureColor.rgb, alpha * textureColor.a);

    gl_FragColor = newColor * v_color;
}