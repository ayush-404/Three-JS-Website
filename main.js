import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const rendeder = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})
rendeder.setPixelRatio(window.devicePixelRatio);
rendeder.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(document.body.getBoundingClientRect().top);

rendeder.render(scene, camera)

const geom = new THREE.TorusGeometry(5, 1, 16, 30);

const material = new THREE.MeshStandardMaterial({ color: 0xDC6162 });
const torus = new THREE.Mesh(geom, material);

const pointlight = new THREE.PointLight(0xffffff, 0.8, 100);
pointlight.position.set(5, 5, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);


const controls = new OrbitControls(camera, rendeder.domElement);

scene.add(pointlight, ambientLight)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const randColor = THREE.MathUtils.randFloatSpread(100);
  var starColor
  if(randColor < 0)
    starColor = 0xF7E96C;
  else if(randColor >= 0)
    starColor = 0xFFFFFF
  const material = new THREE.MeshStandardMaterial({color: starColor});
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

const abstractBackground = new THREE.TextureLoader().load('Abstract.jpg');
scene.background = abstractBackground;

const tubbyTexture = new THREE.TextureLoader().load('Tubby.jpg');
const tubby = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: tubbyTexture})
)
scene.add(tubby)

const Moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 20, 20),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('Moon.jpg'),
    normalMap: new THREE.TextureLoader().load('NormalMap.png')
  })
);
Moon.position.setX(-10);
Moon.position.z = 10;
scene.add(Moon)
tubby.position.set(3, 0, -3)
var starCount =0
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  //Moon.rotation.x += 0.05;
  Moon.rotation.y += 0.075;
  //Moon.rotation.z += 0.05;
  tubby.rotation.y += 0.05;
  tubby.rotation.z += 0.05;

  camera.position.z = t * -0.015;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  starCount++;
  if (starCount < 200)
    addStar()
}
animate()
moveCamera();
document.body.onscroll = moveCamera;
// GAME LOOP BELOW
function animate() {
  requestAnimationFrame(animate);
 torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
 torus.rotation.z += 0.01;

  controls.update();

  rendeder.render(scene, camera);
}
