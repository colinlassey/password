const table = document.querySelector('#table');

const isLoggedIn = async () => {
    try {
        const response = await fetch('/api/isLoggedIn', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
            getPasswords();
        } else {
            location.href = './login.html';
        }
    } catch (err) {
        console.log(err);
        location.href='./404.html';
    }
}

const getPasswords = async () => {
    // add all passwords to dict for display
    const response = await fetch('/api/getPasswords', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (response.ok) {
        for (let i = 0; i < data.credentials.length; i++) {
            const NAME = data.credentials[i].siteName;
            const URL = data.credentials[i].siteURL;
            const USER = data.credentials[i].username;
            const PASS = data.credentials[i].password;

            let row = table.insertRow(i + 1);
            let siteName = row.insertCell(0);
            siteName.innerHTML = NAME;
            let siteURL = row.insertCell(1);
            siteURL.innerHTML = URL;
            let username = row.insertCell(2);
            username.innerHTML = USER;
            let password = row.insertCell(3);
            password.innerHTML = PASS;
            let showButton = document.createElement('button');
            showButton.setAttribute('onclick', showPassword);
            showButton.textContent = 'Show Password';
            row.appendChild(showButton);
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit Credentials';
            row.appendChild(editButton);
            editButton.onclick = async () => {
                const response = await fetch('/api/editPasswords', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ NAME, URL, USER, PASS })
                });

                const data2 = await response.json();
                console.log(response);

                if (response.ok) {
                    location.href = './editPasswords.html';
                } else {
                    console.log(data.message);
                    location.href = './404.html';
                }
            }
        }
    } else {
        console.log(data.message);
        location.href = './404.html';
    }
}

const showPassword = async () => {
    // take password from dots/asterisks to actual text
}

const main = document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn();
});
