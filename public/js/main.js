document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: contactForm.name.value,
                phone: contactForm.phone.value,
                description: contactForm.description.value
            };

            try {
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    alert('Sorry, there was an error sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        });
    }

    // Form validation
    const validateForm = () => {
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const descriptionInput = document.getElementById('description');

        if (nameInput) {
            nameInput.addEventListener('input', () => {
                nameInput.setCustomValidity('');
                nameInput.checkValidity();
            });

            nameInput.addEventListener('invalid', () => {
                if(nameInput.value === '') {
                    nameInput.setCustomValidity('Please enter your name');
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                phoneInput.setCustomValidity('');
                phoneInput.checkValidity();
            });

            phoneInput.addEventListener('invalid', () => {
                if(phoneInput.value === '') {
                    phoneInput.setCustomValidity('Please enter your phone number');
                }
            });
        }

        if (descriptionInput) {
            descriptionInput.addEventListener('input', () => {
                descriptionInput.setCustomValidity('');
                descriptionInput.checkValidity();
            });

            descriptionInput.addEventListener('invalid', () => {
                if(descriptionInput.value === '') {
                    descriptionInput.setCustomValidity('Please describe your issue');
                }
            });
        }
    };

    validateForm();
});
