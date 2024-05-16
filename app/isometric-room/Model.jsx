import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

import {
  Html,
  useGLTF,
  useTexture,
  useCursor,
  shaderMaterial,
} from "@react-three/drei";

// custom hook for texture loading
function useLoadedTexture() {
  const loadedTexture = useTexture("/isometric-room/3d-model/baked.jpg");
  if (loadedTexture) {
    loadedTexture.colorSpace = THREE.SRGBColorSpace; // Set the correct encoding
    loadedTexture.flipY = "false";
  }
  return loadedTexture;
}

export default function Model({ ...props }) {
  //loading the model
  const { nodes, materials } = useGLTF(
    "/isometric-room/3d-model/room-components.glb"
  );
  //load texture calling the custom hook
  const loadedTexture = useLoadedTexture();
  const bakedTexture = new THREE.MeshStandardMaterial({ map: loadedTexture });

  //make sure the texture is properly loaded before rendering the model
  if (!loadedTexture) return null;

  return (
    <group {...props} dispose={null}>
      {/* tv screen shader material  */}
      <mesh position={[-0.257, 1.248, -1.838]}>
        <planeGeometry args={[1.29, 0.78]} />
        <meshBasicMaterial />
      </mesh>

      {/* down | irlo painting */}
      <mesh
        geometry={nodes.paintingIrlo.geometry}
        material={bakedTexture}
        position={[1.986, 1.638, -0.502]}
      ></mesh>
      {/* up | irlo painting */}

      {/* DESK GROUP FOR CLICK TO ZOOM */}

      <group>
        {/* displays with iframe on it */}
        <mesh
          position-x={1.5}
          position-y={1.1}
          position-z={-0.5}
          rotation={[0, 0, 0]}
          visible={false}
        >
          <boxGeometry args={[0.7, 0.8, 1.2]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        {/* macbook */}
        <mesh
          geometry={nodes.macbookScreen.geometry}
          material={new THREE.MeshBasicMaterial({ color: "black" })}
          position={[1.551, 0.885, -0.502]}
          rotation={[Math.PI / 2, -0.254, Math.PI / 2]}
        >
          <Html
            transform
            wrapperclass="htmlLaptopScreen"
            distanceFactor={0.107}
            position={[0, 0, -0.001]}
            rotation-x={-1.57}
          >
            <div wrapperclass="iframe--div">
              <iframe src="https://punctoranj.ro/" />
            </div>
          </Html>
        </mesh>

        {/* monitor */}
        <mesh
          geometry={nodes.monitorScreen.geometry}
          material={new THREE.MeshBasicMaterial({ color: "black" })}
          position={[1.773, 0.943, -0.502]}
          rotation={[0, 1.571, 0]}
        >
          <Html
            transform
            wrapperclass="htmlScreen"
            distanceFactor={0.19}
            position={[0.0, 0.241, -0.03]}
            rotation-x={Math.PI}
            rotation-z={Math.PI}
            flipZ="true"
          >
            <iframe src="https://iso-room.netlify.app/" />
          </Html>
        </mesh>
        {/* displays with iframe on it */}
        <mesh
          geometry={nodes.appleMacbookpro.geometry}
          material={bakedTexture}
          position={[1.449, 0.782, -0.502]}
          rotation={[0, -1.571, 0]}
        />
        {/* ipad
        <mesh
          geometry={nodes.ipadScreen.geometry}
          material={new THREE.MeshBasicMaterial({ color: "black" })}
          position={[1.438, 0.997, -0.04]}
          rotation={[0, 0, 1.194]}
        />
        <mesh
          geometry={nodes.appleIpad.geometry}
          material={bakedTexture}
          position={[1.444, 0.997, -0.042]}
          rotation={[0, 0, 1.194]}
        />
        <mesh
          geometry={nodes.appleIphone.geometry}
          material={bakedTexture}
          position={[1.437, 0.93, -0.862]}
          rotation={[0, 0, 1.288]}
        /> */}
        <mesh
          geometry={nodes.appleMonitor.geometry}
          material={bakedTexture}
          position={[1.773, 0.943, -0.502]}
          rotation={[0, 1.571, 0]}
        />
      </group>
      {/* up| DESK GROUP FOR CLICK TO ZOOM */}

      <mesh
        geometry={nodes.plantVase.geometry}
        material={bakedTexture}
        position={[1.705, 0.81, -1.02]}
        scale={0.077}
      ></mesh>

      {/* down| OBJECT WITH DESCRIPTIONS */}
      <mesh
        geometry={nodes.eamsChair.geometry}
        material={bakedTexture}
        position={[0.85, 0.556, -0.515]}
      ></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.eamsChairBottom.geometry}
        material={bakedTexture}
        position={[0.916, 0.046, -0.514]}
      />
      {/* iphone */}
      {/* <mesh
        geometry={nodes.iphoneScreen.geometry}
        material={bakedTexture}
        position={[1.427, 0.893, -0.862]}
        rotation={[0, 0, 1.288]}
      ></mesh> */}
      {/* tv description*/}

      <mesh
        geometry={nodes.tv.geometry}
        material={bakedTexture}
        position={[-0.257, 1.248, -1.841]}
      ></mesh>

      {/* up | tv */}
      {/* down | couch area */}
      <mesh
        geometry={nodes.ikeaBedsideTable.geometry}
        material={bakedTexture}
        position={[-1.849, 0.097, 1.422]}
        rotation={[0, Math.PI / 2, 0]}
      ></mesh>
      <mesh
        geometry={nodes.appleRemote.geometry}
        material={bakedTexture}
        position={[-1.862, 0.541, 1.347]}
        rotation={[0, 0.093, 0]}
      />
      <mesh
        geometry={nodes.sofa.geometry}
        material={bakedTexture}
        position={[0.087, 0.65, 2.024]}
        rotation={[1.889, 0, 0]}
        scale={[0.401, 0.221, 0.276]}
      />
      <mesh
        geometry={nodes.cup.geometry}
        material={bakedTexture}
        position={[-1.771, 0.568, 1.355]}
      />
      {/* up | couch area */}
      {/* down | bookshelf area */}
      <mesh
        geometry={nodes.enetriShelf.geometry}
        material={bakedTexture}
        position={[-2.021, 0.829, -0.526]}
      ></mesh>
      <mesh
        geometry={nodes.ikeaLamp.geometry}
        material={bakedTexture}
        position={[-2.057, 1.536, -0.356]}
      />
      <mesh
        geometry={nodes.enetriBooks.geometry}
        material={bakedTexture}
        position={[-2.03, 0.566, -0.487]}
        rotation={[0, 1.571, 0]}
      ></mesh>
      <mesh
        geometry={nodes.decor.geometry}
        material={bakedTexture}
        position={[-2.017, 0.75, -0.337]}
        rotation={[0, 0.426, 0]}
      />
      {/* up | bookshelf area */}
      {/* down | ikea donut */}
      <mesh
        geometry={nodes.ikeaDonut.geometry}
        material={bakedTexture}
        position={[-1.326, 1.924, -1.933]}
        rotation={[Math.PI / 2, 0, 0]}
      ></mesh>
      {/* up | ikea donut */}
      {/* down | snowboarding setup */}
      <mesh
        geometry={nodes.bataleon.geometry}
        material={bakedTexture}
        position={[-1.902, 1.325, -1.963]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      ></mesh>
      {/* up | snowboarding setup */}
      {/* down | chessboard  */}
      <mesh
        geometry={nodes.chessBoard002.geometry}
        material={bakedTexture}
        position={[1.199, 1.768, -1.939]}
        rotation={[1.432, 0, 0]}
      ></mesh>
      <mesh
        geometry={nodes.chessBoard.geometry}
        material={bakedTexture}
        position={[1.199, 1.768, -1.939]}
        rotation={[1.432, 0, 0]}
      />
      {/* up | chessboard  */}
      {/* down | chessbooks */}
      <mesh
        geometry={nodes.booksChess.geometry}
        material={bakedTexture}
        position={[1.356, 1.243, -1.708]}
      ></mesh>
      {/* up | chessbooks */}

      {/* down | architecture books */}
      <mesh
        geometry={nodes.booksArchitecture.geometry}
        material={bakedTexture}
        position={[1.216, 0.924, -1.707]}
      ></mesh>
      {/* up | architecture books */}

      {/* down | philosofy,biofrafy books */}
      <mesh
        geometry={nodes.booksPhilosofy.geometry}
        material={bakedTexture}
        position={[1.178, 0.54, -1.708]}
      ></mesh>
      <mesh
        geometry={nodes.booksBiographies.geometry}
        material={bakedTexture}
        position={[1.167, 0.201, -1.708]}
      />
      {/* up | philosofy, biography books  */}

      {/* down | turntable  */}
      <mesh
        geometry={nodes.turntable.geometry}
        material={bakedTexture}
        position={[-1.34, 0.837, -1.849]}
      ></mesh>

      <mesh
        geometry={nodes.vinyls.geometry}
        material={bakedTexture}
        position={[-1.32, 0.38, -1.76]}
      />
      {/* up | turntable  */}

      {/* down | apple homepod */}
      <mesh
        geometry={nodes.appleHomepod.geometry}
        material={bakedTexture}
        position={[-0.693, 0.449, -1.846]}
      ></mesh>
      <mesh
        geometry={nodes.appleTV.geometry}
        material={bakedTexture}
        position={[-0.864, 0.416, -1.856]}
      />

      {/* up | apple homepod */}

      {/* down | f1 lego */}
      <mesh
        geometry={nodes.legoF1.geometry}
        material={bakedTexture}
        position={[-0.038, 0.46, -1.817]}
        rotation={[0, -1.571, 0]}
      ></mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.legof1Tires.geometry}
        material={bakedTexture}
        position={[-0.122, 0.445, -1.742]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.045, 0.022, 0.045]}
      />
      {/* up | f1 lego */}

      {/* down | catan */}
      <mesh
        geometry={nodes.catan.geometry}
        material={bakedTexture}
        position={[1.028, 1.257, -1.688]}
      ></mesh>
      {/* up | catan */}

      <mesh geometry={nodes.paintingsPacea.geometry} material={bakedTexture} />

      <mesh
        geometry={nodes.ikeaTable.geometry}
        material={bakedTexture}
        position={[-0.224, 0.023, 0.408]}
        rotation={[0.132, -0.445, -0.121]}
      ></mesh>

      <mesh
        geometry={nodes.legoVan.geometry}
        material={bakedTexture}
        position={[-0.346, 0.071, -1.65]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.021}
      />
      <mesh
        geometry={nodes.boardgames.geometry}
        material={bakedTexture}
        position={[-0.211, 0.191, -1.733]}
        rotation={[0, Math.PI / 2, 0]}
      ></mesh>

      <mesh
        geometry={nodes.oziCat.geometry}
        material={bakedTexture}
        position={[-0.579, 0.174, -0.477]}
        rotation={[0, -0.557, 0]}
      ></mesh>

      <mesh
        geometry={nodes.floor.geometry}
        material={bakedTexture}
        position={[0, 0, 0.021]}
      />
      <mesh
        geometry={nodes.walls.geometry}
        material={bakedTexture}
        position={[-0.151, 1.503, -2.083]}
        scale={[1, 1, 1.022]}
      />
      <mesh
        geometry={nodes.enetriShelf001.geometry}
        material={bakedTexture}
        position={[-2.021, 1.75, -0.526]}
      />

      <mesh
        geometry={nodes.ikeaDoubleShelf008.geometry}
        material={bakedTexture}
        position={[1.19, 0.75, -1.801]}
      ></mesh>
      <mesh
        geometry={nodes.turntableSpeakers.geometry}
        material={bakedTexture}
        position={[0.257, 0.184, -1.606]}
      />

      <mesh
        geometry={nodes.ikeaSimpleShelf.geometry}
        material={bakedTexture}
        position={[-0.311, 0.2, -1.772]}
      />

      <mesh
        geometry={nodes.blueLamp.geometry}
        material={bakedTexture}
        position={[1.759, 1.08, 0.083]}
      />
      <mesh
        geometry={nodes.desk.geometry}
        material={bakedTexture}
        position={[1.794, 0.053, 0.129]}
      ></mesh>
      <mesh
        geometry={nodes.ikeaMonitorStand.geometry}
        material={bakedTexture}
        position={[1.692, 0.827, -0.502]}
      />
      <mesh
        geometry={nodes.smallPlant.geometry}
        material={bakedTexture}
        position={[1.706, 0.831, -1.02]}
      />
      <mesh
        geometry={nodes.carpet.geometry}
        material={bakedTexture}
        position={[-0.464, 0.004, -0.497]}
      />

      <mesh
        geometry={nodes.darts001.geometry}
        material={bakedTexture}
        position={[1.973, 1.836, 0.744]}
      ></mesh>

      <mesh
        geometry={nodes.sectionPlanes002.geometry}
        material={bakedTexture}
        position={[2.097, 1.448, 0.062]}
      />
      <mesh
        geometry={nodes.darts.geometry}
        material={bakedTexture}
        position={[1.973, 1.836, 0.744]}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ikeaVase.geometry}
        material={bakedTexture}
        position={[0.142, 0.605, 0.696]}
        rotation={[-Math.PI, 0.546, -Math.PI]}
      ></mesh>
      <mesh
        geometry={nodes.tableBooks.geometry}
        material={bakedTexture}
        position={[-0.062, 0.529, 0.634]}
        rotation={[-Math.PI, 0.016, -Math.PI]}
      />
      <mesh
        geometry={nodes.legoFlowers.geometry}
        material={bakedTexture}
        position={[0.15, 0.781, 0.661]}
        rotation={[2.679, 1.315, -2.894]}
      />
      <mesh
        geometry={nodes.monstera.geometry}
        material={bakedTexture}
        position={[1.587, 0.222, 1.673]}
      />
      <mesh
        geometry={nodes.coffeeShader.geometry}
        material={bakedTexture}
        position={[-1.771, 0.586, 1.355]}
      />

      <mesh
        geometry={nodes.emissivePaintingLamp.geometry}
        material={bakedTexture}
        position={[1.854, 2.636, -0.503]}
      />
      <mesh
        geometry={nodes.donutCable.geometry}
        material={bakedTexture}
        position={[-1.306, 0.712, -1.98]}
        rotation={[0, 0, -1.58]}
      />

      <mesh
        geometry={nodes.dartsArrows.geometry}
        material={bakedTexture}
        position={[1.781, 1.824, 0.806]}
        rotation={[-Math.PI / 2, -1.52, 0]}
      />
      <mesh
        geometry={nodes.turntableStand.geometry}
        material={bakedTexture}
        position={[-1.34, 0.147, -1.76]}
      ></mesh>
      <mesh
        geometry={nodes.plinta.geometry}
        material={bakedTexture}
        position={[1.989, 0.12, 2.14]}
      />

      <mesh
        geometry={nodes.blueLampLight.geometry}
        material={bakedTexture}
        position={[1.759, 1.117, 0.083]}
      />
      <mesh
        geometry={nodes.emissivePaintingLamp.geometry}
        material={bakedTexture}
        position={[1.854, 2.636, -0.503]}
      />

      <mesh
        geometry={nodes.lamp.geometry}
        material={bakedTexture}
        position={[1.953, 2.649, -0.503]}
      />
    </group>
  );
}

useGLTF.preload("/isometric-room/3d-model/room-components.glb");