varying vec3 vColor;

uniform vec2 uResolution;
uniform sampler2D uPictureTexture; 
uniform sampler2D uDisplacementTexture; 

void main()
{
    // Final position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture(uDisplacementTexture, uv).r;

    
  // Point size
    gl_PointSize = 0.10 * pictureIntensity * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

  // Varyings
  vColor = vec3(pow(pictureIntensity, 2.0));
}