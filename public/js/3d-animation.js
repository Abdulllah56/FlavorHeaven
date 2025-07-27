// Import Three.js from CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/geometries/TextGeometry.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all 3D elements
    initLogoSpinner();
    initFoodModels();
    init3DHeading();
});

// Logo Spinner Animation
function initLogoSpinner() {
    const canvas = document.getElementById('spinningLogo');
    if (!canvas) {
        console.error('Could not find spinner canvas element');
        return;
    }

    // Initialize the renderer
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(150, 150);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Create the logo geometry
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    
    // Create dish-like object (plate)
    const plateGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const plateMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.2,
        metalness: 0.8
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    logoGroup.add(plate);
    
    // Create food toppings
    const foodGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const foodMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xe53e3e, 
        roughness: 0.7,
        metalness: 0.3
    });
    const food = new THREE.Mesh(foodGeometry, foodMaterial);
    food.position.y = 0.3;
    food.scale.y = 0.5;
    logoGroup.add(food);
    
    // Create garnish elements
    const garnishGeometry = new THREE.ConeGeometry(0.2, 0.6, 8);
    const garnishMaterial = new THREE.MeshStandardMaterial({ color: 0x22cc44 });
    
    for (let i = 0; i < 3; i++) {
        const garnish = new THREE.Mesh(garnishGeometry, garnishMaterial);
        const angle = (i / 3) * Math.PI * 2;
        garnish.position.x = Math.cos(angle) * 0.5;
        garnish.position.z = Math.sin(angle) * 0.5;
        garnish.position.y = 0.5;
        garnish.rotation.x = Math.random() * 0.5 - 0.25;
        garnish.rotation.z = Math.random() * 0.5 - 0.25;
        food.add(garnish);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add point light with color
    const pointLight = new THREE.PointLight(0xffaa00, 1, 10);
    pointLight.position.set(-3, 3, 2);
    scene.add(pointLight);

    // Add particles (steam effect)
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position particles in a circle above the food
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.8;
        posArray[i] = Math.cos(angle) * radius;  // x
        posArray[i+1] = 0.8 + Math.random() * 1.2; // y (above the food)
        posArray[i+2] = Math.sin(angle) * radius;  // z
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.6
    });
    
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
    logoGroup.add(particleMesh);

    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the logo
        logoGroup.rotation.y += 0.01;
        
        // Animate particles (steam rising)
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            // Move particles upward
            positions[i+1] += 0.01;
            
            // If a particle goes too high, reset it to the bottom
            if (positions[i+1] > 2.5) {
                positions[i+1] = 0.8;
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 0.8;
                positions[i] = Math.cos(angle) * radius;
                positions[i+2] = Math.sin(angle) * radius;
            }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Gently float the logo up and down
        logoGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        
        renderer.render(scene, camera);
    }

    // Start the animation
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(150, 150);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    });
}

// Initialize 3D food models for hero section
function initFoodModels() {
    // This function will be implemented to add 3D food models to the hero section
    const heroContainer = document.getElementById('hero3DContainer');
    if (!heroContainer) return;
    
    // Implementation for 3D food models will go here
}

// Initialize 3D heading
function init3DHeading() {
    // This function will be implemented to create 3D text headings
    const headingContainer = document.getElementById('heading3D');
    if (!headingContainer) return;
    
    // Implementation for 3D headings will go here
}
