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
        console.log('response is ok');
        console.log('data.data', data.data);
        console.log('data.data.length', data.data.length);
        for (let i = 0; i < data.data.length; i++) {
            console.log(i);
            let row = table.insertRow(i + 1);
            let siteName = row.insertCell(0);
            siteName.innerHTML = data.data[i].siteName;
            let siteURL = row.insertCell(1);
            siteURL.innerHTML = data.data[i].siteURL;
            let username = row.insertCell(2);
            username.innerHTML = data.data[i].username;
            let password = row.insertCell(3);
            password.innerHTML = data.data[i].password;
        }
        console.log(data.data);
    } else {
        console.log(data.message);
    }
}

const main = document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn();
});
