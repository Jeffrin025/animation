"use client";

import { useAnimations, useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three"; 

useGLTF.preload("./robot_playground.glb");

const Model: React.FC = () => {
  const group = useRef<Group>(null); 
  const { scene, animations } = useGLTF("/robot_playground.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      const animationNames = Object.keys(actions);
      if (animationNames.length > 0) {
        const animationName = animationNames[0];
        actions[animationName].play();
      }
    }
  }, [actions]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={group} scale={[3.7, 3.7, 3.7]} position={[0, -3.5, 0]}>
        <primitive object={scene} />
      </group>
    </>
  );
};

export default Model;
