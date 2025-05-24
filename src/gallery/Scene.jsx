import React from 'react';
import Gallery from './Gallery';
import Ocean from './Ocean';
import Fog from './Fog';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

const Scene = () => {
	return (
		<Canvas
			shadows
			camera={{
				fov: 90,
				position: [0, 15, -20],
				rotation: [-Math.PI * 0.2, 0, 0],
			}}
		>
			{/* <OrbitControls /> */}
			<color attach="background" args={['#191920']} />
			<Gallery />
			<Ocean />
			<Fog />
			<Environment files={'./textures/preller_drive_1k.hdr'} />
		</Canvas>
	);
};

export default Scene;