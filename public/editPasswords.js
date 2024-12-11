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
let data = {};

const loginCheck = async () => {
    try {
        const response = await fetch('/api/isLoggedIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        data = await response.json();

        if (response.ok) {
            NAME.value = data.credentials.NAME;
            URL.value = data.credentials.URL;
            USERNAME.value = data.credentials.USER;
            PASSWORD.value = data.credentials.PASS;
            editPassword();
        } else {
            location.href = './login.html';
        }
    } catch (err) {
        console.log(err);
    }
}

const editPassword = async () => {
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

            const data2 = await response.json();

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
                const beforeName = data.credentials.NAME;
                const beforeUrl = data.credentials.URL;
                const beforeUsername = data.credentials.USER;
                const beforePassword = data.credentials.PASS;
                const changeName = NAME.value;
                const changeUrl = URL.value;
                const changeUsername = USERNAME.value;
                const changePassword = PASSWORD.value;

                const response = await fetch('/api/editCredentials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ beforeName, beforeUrl, beforeUsername, beforePassword, changeName, changeUrl, changeUsername, changePassword })
                });

                const data2 = await response.json();

                if (response.ok) {
                    SUGGESTION.style.visibility = 'initial';
                    SUGGESTION.innerHTML = data2.message;
                } else {
                    SUGGESTION.style.visibility = 'initial';
                    SUGGESTION.innerHTML = data2.message;
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

}

const main = document.addEventListener('DOMContentLoaded', () => {
    loginCheck();
});
