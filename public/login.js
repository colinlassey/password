const USERNAME = document.querySelector('#username');
const PASSWORD = document.querySelector('#password');
const SUBMIT = document.querySelector('#submit');
const msg = document.querySelector('#msg');

SUBMIT.onclick = submitFunc;

const submitFunc = async () => {
    const username = USERNAME.value;
    const password = PASSWORD.value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            msg.style.visibility = 'inline';
            msg.innerHTML = data.message;
            location.href = './viewPasswords.html';
        } else {
            msg.style.visibility = 'inline';
            msg.innerHTML = data.message;
        }
    } catch (error) {
        msg.style.visibility = 'inline';
        msg.innerHTML = `An error occurred. Please try again later.`;
        console.log(error);
        return 3;
    }
};
