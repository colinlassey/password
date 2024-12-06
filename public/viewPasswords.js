try {
    const response = await fetch('/api/getPasswords', {
        method: 'GET',
        body: JSON.stringify({ })
        // TODO: find some way to get userId during login and pass it to viewPasswords
    });

    const data = await response.json();

    if (response.ok) {
        // add all passwords to dict for display
    } else {

    }
} catch (err) {
    console.log(err);
    location.href='./404.html';
}
