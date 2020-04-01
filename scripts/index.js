const EMAIL_REGEX = /^\S+@\S+\.\S+$/; // custom email regex (not precise)

const $form = document.getElementById('form');
$form.setAttribute('novalidate', '');

const fields = {
    name: {
        label: 'First name',
        $input: $form.elements.namedItem('name')
    },

    surname: {
        label: 'Last name',
        $input: $form.elements.namedItem('surname')
    },

    email: {
        label: 'Email',
        $input: $form.elements.namedItem('email')
    },

    password: {
        label: 'Password',
        $input: $form.elements.namedItem('password')
    }
};

$form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData($form);
    for (const [name, value] of data.entries()) {
        const { label, $input } = fields[name];

        if (value.trim() === '') {
            showError($input, `${label} cannot be empty`);
        } else if (name === 'email' && !EMAIL_REGEX.test(value)) {
            showError($input, 'Looks like this is not an email');
        } else {
            hideError($input);
        }
    }
});

function showError($input, error) {
    $input.classList.add('invalid');
    $input.nextElementSibling.textContent = error;
}

function hideError($input) {
    $input.classList.remove('invalid');
}
