document.addEventListener("DOMContentLoaded", function () {
    // 1. INITIALIZE EMAILJS
    emailjs.init("ILNJdBo1YFtfdIDrK");

    // 2. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Auto-close mobile menu after click
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 4. SKILL BAR ANIMATION LOGIC
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            // Check if we've already stored the target width
            const finalWidth = bar.getAttribute('data-width') || bar.style.width;
            
            // Store it in a data attribute if not already there
            if (!bar.getAttribute('data-width')) {
                bar.setAttribute('data-width', finalWidth);
            }

            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = finalWidth;
            }, 200);
        });
    };

    // 5. STAR RATING INTERACTION
    const stars = document.querySelectorAll('.stars span');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active', 'text-yellow-500');
                    s.classList.remove('text-gray-400');
                } else {
                    s.classList.remove('active', 'text-yellow-500');
                    s.classList.add('text-gray-400');
                }
            });
        });
    });

    // 6. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;

            // Loading state
            btn.innerHTML = 'Sending <span class="spinner"></span>';
            btn.disabled = true;

            const templateParams = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value
            };

            emailjs.send("service_wi2c8s8", "template_lk4bxca", templateParams)
                .then(() => {
                    const messageBox = document.getElementById("formMessage");

                    messageBox.classList.remove("hidden");
                    messageBox.innerText = "Message sent successfully!";

                    setTimeout(() => {
                        messageBox.classList.add("hidden");
                    }, 3000);
                    contactForm.reset();
                })
                .catch((error) => {
                    messageBox.classList.remove("hidden");
                    messageBox.innerText = "Error sending message!";
                    messageBox.classList.replace("text-green-600", "text-red-600");
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    btn.innerText = originalBtnText;
                    btn.disabled = false;
                });
        });
    }

    // 7. BOOK REVIEW FORM SUBMISSION
    const bookForm = document.getElementById('bookFeedbackForm');
    if (bookForm) {
        bookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = bookForm.querySelector('button');
            const rating = bookForm.querySelectorAll('.stars span.active').length;

            if (rating === 0) {
                alert("Please select a star rating!");
                return;
            }

            btn.innerText = "Posting Review...";
            btn.disabled = true;

            const reviewParams = {
                book_title: document.getElementById("title").value,
                reviewer_email: document.getElementById("remail").value,
                review: document.getElementById("review").value,
                rating: rating
            };

            emailjs.send("service_ydtwnrj", "template_ck5omwd", reviewParams)
                .then(() => {
                    alert("Thank you for your review!");
                    bookForm.reset();
                    // Reset stars visually
                    stars.forEach(s => s.classList.remove('active', 'text-yellow-500'));
                })
                .catch((err) => {
                    alert("Review failed to send.");
                    console.error(err);
                })
                .finally(() => {
                    btn.innerText = "Submit Review";
                    btn.disabled = false;
                });
        });
    }

    // 8. INTERSECTION OBSERVER (Scroll Animations)
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger general fade-in
                entry.target.classList.add('animate-fade-in');
                
                // If it's the skills section, trigger bar growth
                if (entry.target.id === 'skills' || entry.target.querySelector('.skill-progress')) {
                    animateSkills();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and animated elements
    document.querySelectorAll('section, .animate-fade-in').forEach(el => {
        observer.observe(el);
    });

    const thoughts = [
        "Reality is interpreted, not observed.",
        "Understanding is deeper than knowledge.",
        "Most people live in borrowed beliefs."
    ];

    let index = 0;
    const thoughtElement = document.getElementById("thought");

    if (thoughtElement) {
        setInterval(() => {
            thoughtElement.innerText = thoughts[index];
            index = (index + 1) % thoughts.length;
        }, 3000);
    }

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / height) * 100;

        document.getElementById("progressBar").style.width = progress + "%";
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("text-indigo-600");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("text-indigo-600");
            }
        });
    });

    const fadeSections = document.querySelectorAll(".fade-section");

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });
});