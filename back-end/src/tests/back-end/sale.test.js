const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const { saleMock, wrongSale } = require('./Mocks/salemock');

const app = require('../../api/app');

chai.use(chaiHttp);

describe('2 - Crie o endpoint POST `/sales`', () => {
    describe('Será validado que é possível criar uma nova venda com sucesso', () => {
        it('Será validado que é possível criar uma nova venda com sucesso', async () => {
        const response = await chai.request(app).post('/sales').send(saleMock);
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Sale has been created successfully');
        });
    });
    describe('Será validado que não é possível criar uma nova venda com um produto inexistente', () => {
        it('Será validado que não é possível criar uma nova venda com um produto inexistente', async () => {
        const response = await chai.request(app).post('/sales').send(wrongSale);
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Product not found');
        });
    });
});