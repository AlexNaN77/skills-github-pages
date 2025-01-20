        // Efecto Paralax de la portada (efecto del fondo que no se mueve)
        window.addEventListener('scroll', function() {
            const desplazamiento = window.pageYOffset;
            const paralax = document.querySelector('.fondo-paralax');
            paralax.style.transform = 'translateY(' + (desplazamiento * 0.5) + 'px)';
        });

        // Animación al desplazarse por la pantalla
        function animarAlDesplazar() {
            const elementos = document.querySelectorAll('.tarjeta-auto');
            elementos.forEach(elemento => {
                const rect = elemento.getBoundingClientRect();
                if (rect.top < window.innerHeight - 0) {
                    elemento.classList.add('animar-deslizado');
                }
            });
        }

        window.addEventListener("load", () => {setTimeout(animarAlDesplazar, 200);});

        window.addEventListener('scroll', animarAlDesplazar);
        animarAlDesplazar();

        // Funcionalidad del Carrusel
        const diapositivas = document.querySelectorAll('.diapositiva');
        const indicadores = document.querySelectorAll('.indicador');
        const botonAnterior = document.querySelector('.boton-carrusel.anterior');
        const botonSiguiente = document.querySelector('.boton-carrusel.siguiente');
        let diapositivaActual = 0;
        let intervaloCarrusel;

        function mostrarDiapositiva(n) {
            diapositivas.forEach(diapositiva => diapositiva.classList.remove('activa'));
            indicadores.forEach(indicador => indicador.classList.remove('activo'));
            
            diapositivaActual = (n + diapositivas.length) % diapositivas.length;
            
            diapositivas[diapositivaActual].classList.add('activa');
            indicadores[diapositivaActual].classList.add('activo');
        }
        
        // Iniciar el carrusel
        diapositivas[0].classList.add('activa');
        iniciarPresentacion();

        // Detener el carrusel cuando el mouse está sobre él
        const carrusel = document.querySelector('.carrusel');
        carrusel.addEventListener('mouseenter', detenerPresentacion);
        carrusel.addEventListener('mouseleave', iniciarPresentacion);

        // Navegación por el carrusel
        botonAnterior.addEventListener('click', () => {
            diapositivas[diapositivaActual].classList.remove('activa');
            indicadores[diapositivaActual].classList.remove('activo');
            
            diapositivaActual = (diapositivaActual - 1 + diapositivas.length) % diapositivas.length;
            
            diapositivas[diapositivaActual].classList.add('activa');
            indicadores[diapositivaActual].classList.add('activo');
            
            detenerPresentacion();
            iniciarPresentacion();
        });

        botonSiguiente.addEventListener('click', () => {
            diapositivas[diapositivaActual].classList.remove('activa');
            indicadores[diapositivaActual].classList.remove('activo');
            
            diapositivaActual = (diapositivaActual + 1) % diapositivas.length;
            
            diapositivas[diapositivaActual].classList.add('activa');
            indicadores[diapositivaActual].classList.add('activo');
            
            detenerPresentacion();
            iniciarPresentacion();
        });

        // Control de indicadores
        indicadores.forEach((indicador, indice) => {
            indicador.addEventListener('click', () => {
                diapositivas[diapositivaActual].classList.remove('activa');
                indicadores[diapositivaActual].classList.remove('activo');
                
                diapositivaActual = indice;
                
                diapositivas[diapositivaActual].classList.add('activa');
                indicadores[diapositivaActual].classList.add('activo');
                
                detenerPresentacion();
                iniciarPresentacion();
            });
        });

        // Funciones para el carrusel
        function iniciarPresentacion() {
            intervaloCarrusel = setInterval(() => {
                diapositivas[diapositivaActual].classList.remove('activa');
                indicadores[diapositivaActual].classList.remove('activo');
                
                diapositivaActual = (diapositivaActual + 1) % diapositivas.length;
                
                diapositivas[diapositivaActual].classList.add('activa');
                indicadores[diapositivaActual].classList.add('activo');
            }, 5000);
        }

        function detenerPresentacion() {
            clearInterval(intervaloCarrusel);
        }