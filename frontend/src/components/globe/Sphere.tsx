import {useRef, Suspense} from 'react';
import {useFrame} from '@react-three/fiber';
import {Mesh} from 'three';
import {useTexture, OrbitControls} from '@react-three/drei';
import earthMap from '../../assets/images/earthmap.jpg';

export function Earth(props: JSX.IntrinsicElements['mesh']) {
  const mapImg = useTexture(earthMap);
  const mesh = useRef<Mesh>(null!);
  useFrame((state, delta) => (mesh.current.rotation.y += 0.007));
  return (
    <>
      <OrbitControls
        minPolarAngle={Math.PI / 4 - 0.14}
        maxPolarAngle={Math.PI - 0.78}
        maxDistance={22}
        minDistance={9}
        enablePan={false}
      />
      <Suspense fallback={null}>
        <mesh ref={mesh} scale={3} {...props}>
          <meshStandardMaterial map={mapImg} transparent />
          <sphereGeometry />
        </mesh>
      </Suspense>
    </>
  );
}
