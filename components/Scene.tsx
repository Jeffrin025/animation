"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, lazy } from "react";
import { useProgress, Html, ScrollControls } from "@react-three/drei";


const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
        <p>{progress.toFixed(1)}% loaded</p>
      </div>
    </Html>
  );
};

const Model = lazy(() => import("./Model"));

const Scene = () => {
  return (
    <div style={{ overflow: 'hidden', height: '100vh', width: '100vw', margin: 0, padding: 0, backgroundColor: 'black' }}> {/* Set background color to black */}
      <Canvas
        gl={{ antialias: false }}  
        dpr={[1, 1.25]}          
        camera={{ position: [0, 2, 10], near: 0.1, far: 1000 }}
        style={{ background: "black", overflow: "hidden" }} 
        className="relative"
      >
        <directionalLight position={[-5, -5, 5]} intensity={1} /> 
        <Suspense fallback={<Loader />}>
          <ScrollControls damping={0.5} pages={3}>
            <Model />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
