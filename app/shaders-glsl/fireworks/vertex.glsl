uniform float uSize; 
uniform vec2 uResolution; 
uniform float uProgress; 

attribute float aSize; 
attribute float aTimeMultiplier; 

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() 
{ 
    //can't work with the actual position because it's an attributee => make a copy
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position; 

    //exploding 
    float explodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0); 
    explodingProgress = clamp (explodingProgress, 0.0, 1.0); 
    explodingProgress = 1.0 - pow (1.0 - explodingProgress, 3.0); 
    newPosition *= explodingProgress; 

    //falling 
    float fallingProgress = remap (progress, 0.1, 1.0, 0.0, 1.0); 
    fallingProgress = clamp (fallingProgress, 0.0, 1.0); 
    fallingProgress = 1.0 - pow (1.0 - fallingProgress, 3.0);
    newPosition.y -= fallingProgress * 0.2; 

    // Scaling
    float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp (sizeProgress, 0.0, 1.0); 

    //twinkle 
    float twinkleProgress = remap (progress, 0.2, 0.8, 0.0, 1.0); 
    twinkleProgress = clamp (twinkleProgress, 0.0, 1.0); 
    float sizeTwinkling = sin (progress * 30.0) * 0.5 + 0.5; 
    sizeTwinkling = 1.0 - sizeTwinkling * twinkleProgress; 
    

    //final position of the geometry 
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0); 
    vec4 viewPosition = viewMatrix * modelPosition; 

    gl_Position = projectionMatrix * viewPosition; 

    //final size 
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling; 

    //perspective effect of the particles
    gl_PointSize *= 1.0 / - viewPosition.z;

    if(gl_PointSize < 1.0)
    gl_Position = vec4(9999.9);


}