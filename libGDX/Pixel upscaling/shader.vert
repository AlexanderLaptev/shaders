/*
    Pixel upscaling & antialiasing shader (vertex) for libGDX.

    Original code (public domain) for LÖVE engine by RNavega    https://github.com/RNavega/PixelArt-Antialias-Love2D/blob/master/main.lua
    Adapted for libGDX by Alexander Laptev.

    License: CC0.
*/

const float SMOOTH_SIZE = 1.0;
const float HALF_SMOOTH_SIZE = SMOOTH_SIZE / 2.0;

attribute vec4 a_position;
attribute vec4 a_color;
attribute vec2 a_texCoord0;

uniform mat4 u_projTrans;
uniform sampler2D u_texture;
uniform vec2 u_size;
uniform vec2 u_scale;

varying vec4 v_color;
varying vec2 v_texCoords;

void main() {
    vec2 cornerDirection = (a_texCoord0 - 0.5) / 2.0;
    vec4 vertexPosition = a_position;
    vertexPosition.xy += cornerDirection * HALF_SMOOTH_SIZE;
    vec2 pixelUvSize = HALF_SMOOTH_SIZE / u_size;
    vec2 textureCoords = a_texCoord0;
    textureCoords += pixelUvSize * cornerDirection / u_scale;

    v_color = a_color;
    v_texCoords = textureCoords;
    gl_Position = u_projTrans * vertexPosition;
}