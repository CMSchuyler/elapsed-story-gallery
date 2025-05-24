import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { useState } from 'react';

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
		</group>
	);
};

export default Gallery;