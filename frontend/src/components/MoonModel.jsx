import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

const MODEL_URL = process.env.PUBLIC_URL + "/models/moon.geo.gltf"; // GLTF exportado com animações

export default function MoonModel() {
    const mountRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 400;
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        mountRef.current.innerHTML = "";
        mountRef.current.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(0, 50, 50);
        scene.add(dirLight);

        camera.position.set(0, 7, 40); // sobe a câmera para focar a parte de cima ampliada

        let model = null;
        let mixer = null;
        let action1 = null;
        let action2 = null;
        let timeoutId = null;
        let kbody = null, ear1 = null, ear2 = null, leftArmDown = null;
        let kbodyBaseY = 0, kbodyBaseRotX = 0;
        let ear1BaseRotX = 0, ear2BaseRotX = 0;

        const loader = new GLTFLoader();
        loader.load(
            MODEL_URL,
            (gltf) => {
                model = gltf.scene;
                // Aumenta o tamanho vertical e ajusta a posição para mostrar só a parte de cima
                model.scale.set(22, 22, 22); // scale.y maior para "esticar" verticalmente
                model.position.set(0, -24, 0); // centraliza verticalmente
                model.rotation.y = Math.PI;
                scene.add(model);

                // Pegue referências para bones que você quer animar dinamicamente
                kbody = model.getObjectByName("Kbody");
                ear1 = model.getObjectByName("ear1");
                ear2 = model.getObjectByName("ear2");
                leftArmDown = model.getObjectByName("LeftArmDown");

                if (kbody) {
                    kbodyBaseY = kbody.position.y;
                    kbodyBaseRotX = kbody.rotation.x;
                }
                if (ear1) {
                    ear1BaseRotX = ear1.rotation.x;
                    console.log("ear1BaseRotX (deg):", THREE.MathUtils.radToDeg(ear1BaseRotX));
                }
                if (ear2) {
                    ear2BaseRotX = ear2.rotation.x;
                    console.log("ear2BaseRotX (deg):", THREE.MathUtils.radToDeg(ear2BaseRotX));
                }

                if (gltf.animations && gltf.animations.length > 0) {
                    mixer = new AnimationMixer(model);
                    action1 = mixer.clipAction(gltf.animations.find(a => a.name === "animation.moon.acenando"));
                    action2 = mixer.clipAction(gltf.animations.find(a => a.name === "animation.moon.acenando2"));
                    if (action1) action1.play();
                    if (action2) {
                        timeoutId = setTimeout(() => {
                            if (action1) action1.stop();
                            action2.play();
                        }, 2500);
                    }
                }
            },
            undefined,
            (error) => {
                console.error("Erro ao carregar modelo:", error);
            }
        );

        let animId;
        let clock = new THREE.Clock();
        function animate() {
            const delta = clock.getDelta();
            const t = clock.getElapsedTime();

            if (mixer) mixer.update(delta);

            // Exemplo: animação dinâmica (seno/cosseno) para bones específicos
            if (action2 && action2.isRunning()) {
                if (kbody) {
                    kbody.position.y = kbodyBaseY + Math.cos(t * 2) * 0.01;
                    kbody.rotation.x = kbodyBaseRotX + Math.cos(t * 2) * -0.01;
                }
                if (ear1) {
                    // Tente inverter o sinal ou subtrair 180 graus se necessário
                    ear1.rotation.x = ear1BaseRotX + THREE.MathUtils.degToRad(-15 + (Math.cos(t * 4) * -7.5 + 3.3));
                }
                if (ear2) {
                    ear2.rotation.x = ear2BaseRotX + THREE.MathUtils.degToRad(-15 + (Math.cos(t * 4) * -7.5 + 3.3));
                }
                if (leftArmDown) {
                    leftArmDown.rotation.x = THREE.MathUtils.degToRad(30);
                    leftArmDown.rotation.y = THREE.MathUtils.degToRad(5 - (Math.cos(t * 2) * 4) * 3);
                }
            }

            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            if (timeoutId) clearTimeout(timeoutId);
            renderer.dispose();
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="model-minecraft" ref={mountRef}></div>
    );
}