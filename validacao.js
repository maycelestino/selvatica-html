document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const fields = {
            nome: { element: document.getElementById('nome'), error: document.getElementById('nomeError'), minLength: 3 },
            email: { element: document.getElementById('email'), error: document.getElementById('emailError') },
            telefone: { element: document.getElementById('telefone'), error: document.getElementById('telefoneError'), pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/, optional: true },
            assunto: { element: document.getElementById('assunto'), error: document.getElementById('assuntoError') },
            mensagem: { element: document.getElementById('mensagem'), error: document.getElementById('mensagemError'), minLength: 10, maxLength: 500 },
            aceiteTermos: { element: document.getElementById('aceiteTermos'), error: document.getElementById('aceiteTermosError') }
        };

        const showMessage = (element, message, isError = true) => {
            element.textContent = message;
            element.style.display = message ? 'block' : 'none';
            if (element.previousElementSibling) {
                if (isError) {
                    element.previousElementSibling.classList.add('input-error');
                } else {
                    element.previousElementSibling.classList.remove('input-error');
                }
            }
        };

        const validateField = (fieldKey) => {
            const field = fields[fieldKey];
            let isValid = true;
            let errorMessage = '';

            field.element.classList.remove('input-error');

            if (!field.optional && !field.element.value.trim()) {
                errorMessage = 'Este campo é obrigatório.';
                isValid = false;
            } else if (field.element.type === 'email' && field.element.value.trim() && !/\S+@\S+\.\S+/.test(field.element.value)) {
                errorMessage = 'Por favor, insira um e-mail válido.';
                isValid = false;
            } else if (field.element.type === 'tel' && field.element.value.trim() && field.pattern && !field.pattern.test(field.element.value)) {
                errorMessage = 'Formato de telefone inválido (Ex: (XX) XXXXX-XXXX).';
                isValid = false;
            } else if (field.minLength && field.element.value.trim().length < field.minLength) {
                errorMessage = `Mínimo de ${field.minLength} caracteres.`;
                isValid = false;
            } else if (field.maxLength && field.element.value.trim().length > field.maxLength) {
                errorMessage = `Máximo de ${field.maxLength} caracteres.`;
                isValid = false;
            } else if (field.element.type === 'checkbox' && !field.element.checked) {
                errorMessage = 'Você deve aceitar os termos.';
                isValid = false;
            } else if (field.element.tagName === 'SELECT' && field.element.value === '') {
                errorMessage = 'Por favor, selecione um assunto.';
                isValid = false;
            }

            showMessage(field.error, errorMessage, !isValid);
            return isValid;
        };

        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                const field = fields[key];
                field.element.addEventListener('blur', () => validateField(key));
                if (field.element.type === 'checkbox' || field.element.tagName === 'SELECT') {
                    field.element.addEventListener('change', () => validateField(key));
                }
            }
        }

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let allValid = true;
            for (const key in fields) {
                if (fields.hasOwnProperty(key)) {
                    if (!validateField(key)) {
                        allValid = false;
                    }
                }
            }

            const formStatusMessage = document.getElementById('formStatusMessage');
            if (allValid) {
                showMessage(formStatusMessage, 'Formulário enviado com sucesso!', false);
                formStatusMessage.classList.remove('error');
                formStatusMessage.classList.add('success');
                setTimeout(() => {
                    contactForm.submit();
                }, 1500);
            } else {
                showMessage(formStatusMessage, 'Por favor, corrija os erros no formulário.', true);
                formStatusMessage.classList.remove('success');
                formStatusMessage.classList.add('error');
            }
        });
    }
});