(function() {
    if (localStorage.getItem("activar_pez") === "true") {
        localStorage.removeItem("activar_pez"); // Evita bucles infinitos

        function esperarPecera(callback) {
            let intento = 0;
            let intervalo = setInterval(function() {
                let pecera = document.getElementById("aca-drop");
                if (pecera) {
                    clearInterval(intervalo);
                    callback(pecera);
                }
                intento++;
                if (intento > 50) { // Espera hasta 5 segundos
                    clearInterval(intervalo);
                    console.log("❌ No se encontró la pecera.");
                }
            }, 100);
        }

        esperarPecera(function(pecera) {
            console.log("✅ Pecera encontrada. Insertando pez...");
            pecera.style.overflow = "visible";

            let peix = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            peix.setAttribute("width", "120px");
            peix.setAttribute("height", "60px");
            peix.setAttribute("viewBox", "0 0 200 100");
            peix.style.position = "absolute";
            peix.style.left = "40%";
            peix.style.top = "62%";
            peix.style.transform = "translate(-50%, 0%)";
            peix.style.transition = "left 5s linear, top 3s ease-in-out";
            peix.style.zIndex = "9999";
            peix.style.filter = "drop-shadow(0px 0px 20px #00bfff) brightness(0.85) contrast(1.1)";

            peix.innerHTML = `
                <g>
                    <ellipse cx="60" cy="50" rx="50" ry="30" fill="darkorange" stroke="brown" stroke-width="2"/>
                    <polygon points="110,50 150,20 150,80" fill="darkorange" stroke="brown" stroke-width="2"/>
                    <circle cx="40" cy="40" r="5" fill="black"/>
                    <path d="M20 50 Q30 60 40 50" stroke="black" stroke-width="2" fill="none"/>
                </g>
            `;

            pecera.appendChild(peix);

            let posX = 40, posY = 62, direccionX = 1, direccionY = 1;
            function nadar() {
                if (posX >= 75 || posX <= 15) direccionX *= -1;
                posX += 0.2 * direccionX;
                peix.style.left = posX + "%";
                peix.style.transform = `translate(-50%, 0%) scaleX(${direccionX})`;

                if (posY >= 70 || posY <= 55) direccionY *= -1;
                posY += 0.1 * direccionY;
                peix.style.top = posY + "%";

                requestAnimationFrame(nadar);
            }
            nadar();
        });
    }
})();
