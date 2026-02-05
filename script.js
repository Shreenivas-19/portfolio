document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("_uWI1weQ2wYR38GBH");


    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });

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

                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });


    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };


    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        emailjs.send(

            "service_9i727ej",

            "template_6vtljjl",

            templateParams,

            "_uWI1weQ2wYR38GBH"
        )
        .then(function(response) {
            alert("Email sent successfully!");
            console.log("SUCCESS", response);
            contactForm.reset();
        })
        .catch(function(error) {
            alert("Failed to send email. Check console.");
            console.error("ERROR", error);
        });
    });


    document.querySelectorAll('.stars span').forEach((star, index, stars) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    document.getElementById('bookFeedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your book review!');
        this.reset();
    });


    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');

                if (entry.target.classList.contains('skill-progress')) {
                    animateSkills();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in').forEach(el => {
        observer.observe(el);
    });

});
