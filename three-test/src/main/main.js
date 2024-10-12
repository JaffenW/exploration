import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// 创建场景
const screne = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// 设置相机位置
camera.position.set(10, 10, 10);

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
screne.add(cube);

// 创建灯光
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(-1, 2, 4);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(screne, camera);

// 添加坐标辅助
const axesHelper = new THREE.AxesHelper(50);
screne.add(axesHelper);

// 添加箭头
// const dir = new THREE.Vector3(-1, 1, 1);
// dir.normalize();
// const origin = new THREE.Vector3(2, 2 ,2);
// const vectorHelper = new THREE.ArrowHelper(dir, origin, 2, 0xffffff);
// screne.add(vectorHelper)

// 添加轨道控制器
const controller = new OrbitControls(camera, renderer.domElement);
console.log(Math.PI)
function render() {
    cube.rotation.x += Math.PI/180
    cube.rotation.y += 0.01
    controller.update();
    renderer.render(screne, camera);
    requestAnimationFrame(render);
}
render();