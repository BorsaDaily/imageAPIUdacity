// importing supertest package to test End point
import supertest from "supertest";
import app from "../index";
// make instance from supertest
const request = supertest(app);
// tests
describe('Test endpoint responses', () => {
    it('gets the Home Page endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })
});