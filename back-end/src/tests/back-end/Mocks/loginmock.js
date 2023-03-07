const user = {
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer'
};

const wrongEmail = {
    name: 'Cliente Zé Birita',
    email: 'blebleble@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer'
};

const wrongPassword = {
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: 'blebleble',
    role: 'customer'
};

module.exports = {
    user,
    wrongEmail,
    wrongPassword
};
