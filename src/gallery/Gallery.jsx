import React, { useState } from 'react';
import Frames from './Frames';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';

const images = [
  // Back
  {
    position: [-12, 10, 5],
    rotation: [0, 0, 0],
    url: './photos/mmexport1689910736872.jpg',
    title: 'Suzhou river',
  },
  {
    position: [12, 10, 5],
    rotation: [0, 0, 0],
    url: './photos/mmexport1689910070987.jpg',
    title: 'The tree in winter',
  },
  // Left Side 1 (近)
  ...[...Array(10)].map((_, i) => ({
    position: [-38 - i * 4, 8, 10 + i * 8],
    rotation: [0, Math.PI / 2.8, 0],
    url: './photos/3M5A9169.png',
    title: `Left Near ${i + 1}`,
  })),
  // Left Side 2 (远)
  ...[...Array(10)].map((_, i) => ({
    position: [-35 - i * 4, 8, 40 + i * 8],
    rotation: [0, Math.PI / 2.9, 0],
    url: './photos/3M5A8385.png',
    title: `Left Far ${i + 1}`,
  })),
  // Right Side 1 (近)
  ...[...Array(10)].map((_, i) => ({
    position: [38 + i * 4, 8, 10 + i * 8],
    rotation: [0, -Math.PI / 2.8, 0],
    url: './photos/mmexport1689910425322.jpg',
    title: `Right Near ${i + 1}`,
  })),
  // Right Side 2 (远)
  ...[...Array(12)].map((_, i) => ({
    position: [35 + i * 4, 8, 40 + i * 8],
    rotation: [0, -Math.PI / 2.9, 0],
    url: './photos/mmexport1689910497995.jpg',
    title: `Right Far ${i + 1}`,
  })),
];

const Gallery = () => {
  const { progress } = useProgress();
  const [times, setTimes] = useState([]);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (progress == 100) {
      if (times.length == 0) setTimes([elapsedTime]);
      let delay = 8 + times[0];
      if (elapsedTime < delay) {
        state.camera.position.z = elapsedTime * (100 / delay);
        state.camera.rotation.x =
          -Math.PI * 0.5 + (elapsedTime / delay) * Math.PI * 0.5;
      }
    }
  });

  return (
    <group position={[0, -0.6, 0]} rotation-x={Math.PI * 0.02}>
      <Frames images={images} />
    </group>
  );
};

export default Gallery;