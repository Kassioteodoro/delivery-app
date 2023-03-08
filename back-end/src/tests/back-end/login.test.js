const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const { user, wrongEmail, wrongPassword } = require('./Mocks/loginmock');

const app = require('../../api/app');

chai.use(chaiHttp);

describe('1 - Crie o endpoint POST `/login`', () => {
    describe('Será validado que é possível fazer login com sucesso', () => {
        it('Será validado que é possível fazer login com sucesso', async () => {
        const response = await chai.request(app).post('/login').send(user);
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('token');
        });
    });
    describe('Será validado que não é possível fazer login com email inválido', () => {
        it('Será validado que não é possível fazer login com email inválido', async () => {
        const response = await chai.request(app).post('/login').send(wrongEmail);
        expect(response).to.have.status(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Not found');
        });
    });
    describe('Será validado que não é possível fazer login com senha inválida', () => {
        it('Será validado que não é possível fazer login com senha inválida', async () => {
        const response = await chai.request(app).post('/login').send(wrongPassword);
        expect(response).to.have.status(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Incorrect password');
        });
    });
});
