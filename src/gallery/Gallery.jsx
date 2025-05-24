import React, { useState } from 'react';
import Frames from './Frames';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';

const images = [
  // 第一列
  { position: [-160, 8, 10], rotation: [0, Math.PI / 2.8, 0], url: './photos/3M5A9169.png', title: '照片 1' },
  { position: [-160, 8, 40], rotation: [0, Math.PI / 2.8, 0], url: './photos/3M5A8385.png', title: '照片 2' },
  { position: [-160, 8, 70], rotation: [0, Math.PI / 2.8, 0], url: './photos/3M5A7916-1k.png', title: '照片 3' },
  { position: [-160, 8, 100], rotation: [0, Math.PI / 2.8, 0], url: './photos/mmexport1689910736872.jpg', title: '照片 4' },
  
  // 第二列
  { position: [-120, 12, 20], rotation: [0, Math.PI / 2.9, 0], url: './photos/3M5A9169.png', title: '照片 5' },
  { position: [-120, 12, 50], rotation: [0, Math.PI / 2.9, 0], url: './photos/3M5A8385.png', title: '照片 6' },
  { position: [-120, 12, 80], rotation: [0, Math.PI / 2.9, 0], url: './photos/3M5A7916-1k.png', title: '照片 7' },
  { position: [-120, 12, 110], rotation: [0, Math.PI / 2.9, 0], url: './photos/mmexport1689910736872.jpg', title: '照片 8' },
  
  // 第三列到第十一列(重复图片模式)
  ...Array(36).fill(0).map((_, i) => ({
    position: [-80 + (i % 9) * 40, 8 + Math.sin(i * 0.5) * 4, 30 + Math.floor(i / 9) * 30],
    rotation: [0, (i % 2 === 0 ? 1 : -1) * Math.PI / 3, 0],
    url: [
      './photos/3M5A9169.png',
      './photos/3M5A8385.png',
      './photos/3M5A7916-1k.png',
      './photos/mmexport1689910736872.jpg',
      './photos/mmexport1689910070987.jpg',
      './photos/mmexport1689910425322.jpg',
      './photos/mmexport1689910497995.jpg',
      './photos/mmexport1689910576643.jpg'
    ][i % 8],
    title: `照片 ${i + 9}`
  }))
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
        state.camera.rotation.x = -Math.PI * 0.5 + (elapsedTime / delay) * Math.PI * 0.5;
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