const USERNAME = document.querySelector('#username');
const PASSWORD = document.querySelector('#password');
const SUBMIT = document.querySelector('#submit');
const MSG = document.querySelector('#msg');
const GOBACK = document.querySelector('#goBack');
let sql;

const submitFunc = async () => {
    const usernameSaved = USERNAME.value;
    const passwordSaved = PASSWORD.value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameSaved, passwordSaved })
        });

        const data = await response.json();
        
        if (response.ok) {
            MSG.style.visibility = 'inline';
            MSG.innerHTML = data.message;
            GOBACK.style.visibility = 'inline';
        } else {
            msg.style.visibility = 'inline';
            msg.innerHTML = data.message;
            return 2;
        }
    } catch(err) {
        console.log(err);
        MSG.style.visibility = 'inline';
        MSG.innerHTML = `An error occurred. Please try again later.`;
        return 3;
    }
}

SUBMIT.onclick = submitFunc;
GOBACK.onclick = () => { location.href = './login.html'; };
