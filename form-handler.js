// Form validation and submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const fields = ['name', 'company', 'requirement', 'quantity'];
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('active');
    });

    // Validate fields
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            const errorElement = document.querySelector(`[data-field="${field}"]`);
            if (errorElement) {
                errorElement.classList.add('active');
            }
        }
    });

    if (isValid) {
        submitFormToGoogleSheets(form);
    }
}

function submitFormToGoogleSheets(form) {
    const formData = new FormData(form);
    const data = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        requirement: document.getElementById('requirement').value,
        quantity: document.getElementById('quantity').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        timestamp: new Date().toLocaleString()
    };

    // Replace with your deployed Google Apps Script URL
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbz2EZ_Enwu7Y2s5f3bFi75PPvhx8Uhn-sc364r4u-YPrmNlIilmNkWquuPHhHu72nCVmw/exec';

    fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showFormSuccess();
            form.reset();
        } else {
            showFormError();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormError();
    });
}

function showFormSuccess() {
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
        successMsg.classList.add('active');
        setTimeout(() => {
            successMsg.classList.remove('active');
        }, 5000);
    }
}

function showFormError() {
    const errorMsg = document.getElementById('formError');
    if (errorMsg) {
        errorMsg.classList.add('active');
        setTimeout(() => {
            errorMsg.classList.remove('active');
        }, 5000);
    }
}

// WhatsApp contact
function openWhatsApp() {
    const phoneNumber = '919876543210';
    const message = 'Hi, I\'d like to discuss my textile sourcing requirements with Indiloom.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
