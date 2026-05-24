// Wait for the entire page to load before running scripts
window.addEventListener('load', () => {
    
    /* =========================================
       1. Preloader Logic (Typing + Line Fill)
    ========================================= */
    const preloader = document.getElementById('preloader');
    const typeContainer = document.getElementById('typewriter-text');
    const progressBar = document.getElementById('progress-bar');
    const body = document.body;
    
    const textToType = "SHADOW15";
    let charIndex = 0;
    const typingSpeed = 120; // Speed of typing

    function typeWriter() {
        if (charIndex < textToType.length) {
            typeContainer.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    let progress = 0;
    const loadingSpeed = 20; // Speed of the loading line
    
    function fillProgressBar() {
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 2; 
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                // Fade out preloader when loading is 100%
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        body.style.overflow = 'auto'; // Restore scrolling
                        body.classList.remove('loading');
                    }, 600); 
                }, 500); 
            }
            progressBar.style.width = `${progress}%`;
        }, loadingSpeed);
    }

    // Start both preloader animations shortly after load
    setTimeout(() => {
        typeWriter();
        fillProgressBar();
    }, 300);


    /* =========================================
       14. ScrollSpy (Auto-Active Navigation Links)
    ========================================= */
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        // Determine which section is currently on screen
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // The '200' offset ensures the active state changes slightly before the section hits the absolute top of the screen
            if (scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update the navigation links based on the current section
        navLinksList.forEach(link => {
            link.classList.remove('active');
            
            // If the href matches the current section ID, make it active
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });
    /* =========================================
       2. Advanced Corporate Navbar Scroll
    ========================================= */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       3. Mobile Hamburger Menu Logic
    ========================================= */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navItemsList = document.querySelectorAll('.nav-item');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent background scrolling when menu is open
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when a link is clicked
    navItemsList.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    /* =========================================
       4. Magnetic Hover Effect (Desktop Only)
    ========================================= */
    // Only apply on devices with a mouse cursor
    if (window.matchMedia("(hover: hover)").matches) {
        navItemsList.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const position = item.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                item.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translate(0px, 0px)';
                item.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                setTimeout(() => {
                    item.style.transition = 'color 0.3s ease'; 
                }, 400);
            });
        });
    }

    /* =========================================
       5. Smooth Scrolling for Anchor Links
    ========================================= */
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if(targetId === "") return; 
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       6. Interactive 3D Hero Effect (Desktop)
    ========================================= */
    const heroSection = document.getElementById('home');
    const hero3DContainer = document.getElementById('hero-3d-container');

    if (window.matchMedia("(hover: hover)").matches && hero3DContainer && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45; // Adjust division for tilt intensity
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            
            hero3DContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            hero3DContainer.style.transition = 'transform 0.5s ease';
            hero3DContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
            
            setTimeout(() => {
                hero3DContainer.style.transition = 'transform 0.1s ease-out';
            }, 500);
        });
    }

    /* =========================================
       7. Advanced Particle Network Canvas
    ========================================= */
    const canvas = document.getElementById('tech-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        // Adjust the denominator to increase/decrease particle density
        const numberOfParticles = (canvas.width * canvas.height) / 12000; 

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                // Speed and direction
                this.speedX = (Math.random() * 1) - 0.5;
                this.speedY = (Math.random() * 1) - 0.5;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Bounce off edges of the screen
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = 'rgba(0, 229, 255, 0.5)'; // Cyan colored particles
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                // Draw connecting lines between close particles
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) { // Connect if within 120px
                        ctx.beginPath();
                        // Lines fade out as particles get further apart. Colored Deep Blue.
                        ctx.strokeStyle = `rgba(0, 82, 255, ${1 - distance/120})`; 
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        // Handle window resizing to redraw the canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        initParticles();
        animateParticles();
    }
});

/* =========================================
       8. Custom Tech Cursor Logic
    ========================================= */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const interactiveElements = document.querySelectorAll('a, button, .nav-item, .service-card');

    if (window.matchMedia("(hover: hover)").matches && cursorDot && cursorRing) {
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Ring follows with a tiny, smooth delay (achieved via CSS transition)
            cursorRing.style.left = `${posX}px`;
            cursorRing.style.top = `${posY}px`;
        });

        // Add hover effects when mouse enters clickable elements
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* =========================================
       9. Scroll Reveal Animations (Intersection Observer)
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it has animated
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================
       10. Animated Number Counters (About Section)
    ========================================= */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false; // Prevents the animation from running multiple times

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Total animation time in milliseconds
            const increment = target / (duration / 16); // 16ms is roughly 1 frame at 60fps
            
            let currentCount = 0;

            const updateCounter = () => {
                currentCount += increment;
                
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target; // Ensure it ends exactly on the target number
                }
            };
            
            updateCounter();
        });
    };

    // Use Intersection Observer to trigger the count ONLY when the stats become visible
    const statsSection = document.querySelector('.about-bento-grid');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                runCounters();
                hasCounted = true;
            }
        }, { threshold: 0.5 }); // Triggers when 50% of the grid is visible

        statsObserver.observe(statsSection);
    }

    /* =========================================
       12. 3D Tilt Effect for Team Cards
    ========================================= */
    const teamCards = document.querySelectorAll('.team-card');

    // Only apply on desktop devices with a mouse
    if (window.matchMedia("(hover: hover)").matches) {
        teamCards.forEach(card => {
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (Adjust the '10' to make the tilt more or less extreme)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                // Apply the 3D transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.zIndex = '10'; // Brings the hovered card forward
            });

            // Remove CSS transition while moving for instant mouse tracking
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; 
            });

            // Smoothly snap back to original position when the mouse leaves
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.zIndex = '1';
            });
        });
    }

/* =========================================
       13. Advanced Hologram & Terminal Boot Logic
    ========================================= */
    const orbitWrapper = document.querySelector('.tech-orbit-wrapper');
    const logEntries = document.querySelectorAll('.log-entry');
    const dataTerminal = document.querySelector('.data-terminal');

    // --- Feature A: Holographic 3D Mouse Tracking ---
    if (window.matchMedia("(hover: hover)").matches && orbitWrapper) {
        
        orbitWrapper.addEventListener('mousemove', (e) => {
            // Remove transition for instant 1:1 mouse tracking
            orbitWrapper.style.transition = 'none';
            
            const rect = orbitWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate a dramatic 3D tilt
            const rotateX = ((y - centerY) / centerY) * -20; 
            const rotateY = ((x - centerX) / centerX) * 20;
            
            // Apply perspective to the entire orbit system
            orbitWrapper.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        orbitWrapper.addEventListener('mouseleave', () => {
            // Smoothly snap back to center when the mouse leaves
            orbitWrapper.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            orbitWrapper.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // --- Feature B: Sequential Terminal Boot-Up ---
    if (dataTerminal && logEntries.length > 0) {
        
        // Observer to watch when the terminal comes into view
        const terminalObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                
                // Boot up each log sequentially with a 300ms delay
                logEntries.forEach((log, index) => {
                    setTimeout(() => {
                        log.classList.add('booted');
                        
                        // Optional: Add a brief glitch or flash effect here if desired in the future
                        
                    }, index * 300); // 300ms, 600ms, 900ms, etc.
                });
                
                // Stop observing once booted
                observer.disconnect();
            }
        }, { 
            threshold: 0.4, // Trigger when 40% of the terminal is visible
            rootMargin: "0px 0px -50px 0px"
        });

        terminalObserver.observe(dataTerminal);
    }
    