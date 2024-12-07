const isLoggedIn = async () => {
    try {
        const response = await fetch('/api/isLoggedIn', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
            main();
        } else {
            location.href = './login.html';
        }
    } catch (err) {
        console.log(err);
        location.href='./404.html';
    }
}

const main = document.addEventListener('DOMContentLoaded', () => {
    const NAME = document.querySelector('#name');
    const URL = document.querySelector('#url');
    const USERNAME = document.querySelector('#username');
    const PASSWORD = document.querySelector('#password');
    const SUGGEST = document.querySelector('#suggest');
    const SUGGESTION = document.querySelector('#suggestion');
    const CHECKBOXES = document.querySelector('#checkboxes');
    const CHECKBOXMSG = document.querySelector('#checkboxMsg');
    const LOWERCASE = document.querySelector('#lowercase');
    const UPPERCASE = document.querySelector('#uppercase');
    const NUMBERS = document.querySelector('#numbers');
    const SYMBOLS = document.querySelector('#symbols');
    const LENGTH = document.querySelector('#length');
    const CONFIRM = document.querySelector('#confirm');
    const SUBMIT = document.querySelector('#submit');

    let passwordLen;
    let params = [];

    SUGGEST.onclick = () => {
        // Makes checkboxes visible
        CHECKBOXES.style.visibility = 'initial';    
    }

    CONFIRM.onclick = async () => {
        // password suggestion function

        if (LOWERCASE.checked) {
            params.push('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
        }
        if (UPPERCASE.checked) {
            params.push('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        }
        if (NUMBERS.checked) {
            params.push('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
        }
        if (SYMBOLS.checked) {
            params.push('!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '<', '>', '?', '~');
        }
        if (LENGTH.value == '') {
            SUGGESTION.style.visibility = 'initial';
            SUGGESTION.innerHTML = `Please select a valid length.`;
        } else {
            passwordLen = LENGTH.value;
        }

        try {
            const response = await fetch('/api/suggestPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ params, passwordLen })
            });

            const data = await response.json();

            if (response.ok) {
                // send back password suggestion
                SUGGESTION.style.visibility = 'initial';
                SUGGESTION.innerHTML = data.password;
            } else {
                SUGGESTION.style.visibility = 'initial';
                SUGGESTION.innerHTML = data.message;
                return 4;
            }
        } catch (err) {
            console.log(err);
            SUGGESTION.style.visibility = 'initial';
            SUGGESTION.innerHTML = `An error occurred. Please try again later.`;
            return 4;
        }
    }

    SUBMIT.onclick = async () => {
        // Submit function
        // On submit, encrypt and store inputs (routes.js)
        
        if (URL.value == '' || USERNAME.value == '' || PASSWORD.value == '') {
            SUGGESTION.style.visibility = 'initial';
            SUGGESTION.innerHTML = 'One of the required fields is empty. Please try again.';
        } else {
            try {
                const name = NAME.value;
                const url = URL.value;
                const username = USERNAME.value;
                const password = PASSWORD.value;

                const response = await fetch('/api/addCredentials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, url, username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    SUGGESTION.style.visibility = 'initial';
                    SUGGESTION.innerHTML = data.message;
                } else {
                    SUGGESTION.style.visibility = 'initial';
                    SUGGESTION.innerHTML = data.message;
                    return 4;
                }
            } catch (err) {
                console.log(err);
                SUGGESTION.style.visibility = 'initial';
                SUGGESTION.innerHTML = `An error occurred. Please try again later.`;
                return 4;
            }
        }
    }
});

isLoggedIn();
