uniform vec3 uColor;

varying vec3 vNormal; 
varying vec3 vPosition; 

// #include ./includes/ambientLight.glsl
// #include ./includes/directionalLight.glsl
// #include ./includes/pointLight.glsl


vec3 ambientLight (vec3 lightColor, float lightIntensity)
{
    return lightColor * lightIntensity;

}

vec3 directionalLight (vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{

    vec3 lightDirection = normalize (lightPosition); 
    vec3 lightReflection = reflect (-lightDirection, normal);

    //shading
    float shading =  dot (normal, lightDirection);
    shading = max (0.0, shading); 

    //specular 
    float specular = - dot(lightReflection, viewDirection); 
    //too strong => pow 
    specular = max (0.0, specular); 
    specular = pow (specular, specularPower); 

    return (lightColor * lightIntensity * shading) + (lightColor * lightIntensity * specular); 

}

vec3 pointLight (vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay)
{
    vec3 lightDelta = lightPosition - position; 
    float lightDistance = length(lightDelta); 
    vec3 lightDirection = normalize (lightDelta); 
    vec3 lightReflection = reflect (-lightDirection, normal);

    //shading
    float shading =  dot (normal, lightDirection);
    shading = max (0.0, shading); 

    //specular 
    float specular = - dot(lightReflection, viewDirection); 
    //too strong => pow 
    specular = max (0.0, specular); 
    specular = pow (specular, specularPower); 

    //decay 
    float decay = 1.0 - lightDistance * lightDecay; 
    decay = max (0.0, decay); 

    return lightColor * lightIntensity * decay * (shading + specular);
    

}


void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition); 
    vec3 color = uColor;

    //light => we start with no light (full black)

    vec3 light = vec3 (0.0); 
    
    //***AMBIENT LIGHT***
 
    light += ambientLight(
        vec3(1.0), //light color 
        0.03);     //light intensity

    //**DIRECTIONAL LIGHT***
    light += directionalLight(
        vec3(0.1, 0.1, 1.0),  //light color 
        1.0,                  //light intensity
        normal,               //normal 
        vec3 (0.1, 0.1, 3.0), //light position => we can use an uniform so we can tweak it
        viewDirection,        //view direction
        20.0                  //specular power
        );               

    //***POINT LIGHT
    light += pointLight(
        vec3(1.0, 0.1, 0.1),  //light color 
        1.0,                  //light intensity
        normal,               //normal 
        vec3 (0.0, 2.5, 0.0), //light position => we can use an uniform so we can tweak it
        viewDirection,        //view direction
        20.0,                 //specular power
        vPosition,            //position
        0.25                  //light decay
        );   

      light += pointLight(
        vec3(0.1, 1.0, 0.5),  //light color 
        1.0,                  //light intensity
        normal,               //normal 
        vec3 (2.0, 2.0, 2.0), //light position => we can use an uniform so we can tweak it
        viewDirection,        //view direction
        20.0,                 //specular power
        vPosition,            //position
        0.25                  //light decay
        );   

    
    //the light variable contains all the lights, added up => we multiply it with the material color
    color *= light; 
    
    // Final color
    gl_FragColor = vec4(color, 1.0);


    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}