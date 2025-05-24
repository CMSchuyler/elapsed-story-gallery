import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const GOLDENRATIO = 1.61803398875;

// 场景初始化
const scene = new THREE.Scene();
scene.background = new THREE.Color('#191920');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);
camera.rotation.x = -Math.PI * 0.5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 图片数据
const images = [
    {
        position: [-12, 10, 5],
        rotation: [0, 0, 0],
        url: './photos/mmexport1689910736872.jpg',
        title: 'Suzhou river'
    },
    {
        position: [12, 10, 5],
        rotation: [0, 0, 0],
        url: './photos/mmexport1689910070987.jpg',
        title: 'The tree in winter'
    },
    {
        position: [-38, 8, 10],
        rotation: [0, Math.PI / 2.8, 0],
        url: './photos/3M5A9169.png',
        title: 'Baoshan temple'
    },
    {
        position: [-35, 8, 40],
        rotation: [0, Math.PI / 2.9, 0],
        url: './photos/3M5A8385.png',
        title: 'Scenes from thirty years ago'
    },
    {
        position: [38, 8, 10],
        rotation: [0, -Math.PI / 2.8, 0],
        url: './photos/mmexport1689910425322.jpg',
        title: 'Huangshan mountains'
    },
    {
        position: [35, 8, 40],
        rotation: [0, -Math.PI / 2.9, 0],
        url: './photos/mmexport1689910497995.jpg',
        title: 'The winter in Donghua University'
    }
];

// 创建相框
function createFrame(imageData) {
    const group = new THREE.Group();
    
    // 底框
    const frameGeometry = new THREE.BoxGeometry();
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: '#151515',
        metalness: 0.5,
        roughness: 0.5
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.scale.set(15, 15 * 0.8 * GOLDENRATIO, 15 * 0.05);
    
    // 边框
    const borderGeometry = new THREE.BoxGeometry();
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.scale.set(13.5, 13.95, 13.5);
    border.position.z = 3;
    
    // 加载图片
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageData.url, (texture) => {
        const imageGeometry = new THREE.PlaneGeometry(12, 7.5);
        const imageMaterial = new THREE.MeshBasicMaterial({ 
            map: texture,
            side: THREE.DoubleSide
        });
        const image = new THREE.Mesh(imageGeometry, imageMaterial);
        image.position.z = 10.5;
        group.add(image);
    });
    
    group.add(frame, border);
    group.position.set(...imageData.position);
    group.rotation.set(...imageData.rotation);
    
    // 交互
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const contentDiv = document.getElementById('content');
    
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(frame);
        
        if (intersects.length > 0) {
            border.material.color.set('#a3df00');
            contentDiv.style.display = 'block';
            contentDiv.style.left = event.clientX + 'px';
            contentDiv.style.top = event.clientY + 'px';
            contentDiv.textContent = imageData.title;
        } else {
            border.material.color.set('white');
            contentDiv.style.display = 'none';
        }
    });
    
    return group;
}

// 创建海洋
function createOcean() {
    const waterGeometry = new THREE.PlaneGeometry(1000, 200);
    const textureLoader = new THREE.TextureLoader();
    const waterNormals = textureLoader.load('./textures/waternormals.jpeg', (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });
    
    const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: false
    });
    
    water.rotation.x = -Math.PI * 0.5;
    water.position.y = -2;
    
    return water;
}

// 添加场景元素
const ocean = createOcean();
scene.add(ocean);

images.forEach(imageData => {
    const frame = createFrame(imageData);
    scene.add(frame);
});

// 相机动画
let startTime = null;
const animationDuration = 8000; // 8秒

function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    
    if (elapsed < animationDuration) {
        const progress = elapsed / animationDuration;
        camera.position.z = progress * 100;
        camera.rotation.x = -Math.PI * 0.5 + progress * Math.PI * 0.5;
    }
    
    // 更新海水动画
    ocean.material.uniforms.time.value += 0.5 / 60.0;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// 窗口大小调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});