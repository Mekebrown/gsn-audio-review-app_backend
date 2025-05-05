const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

let strapi;

beforeAll(async () => {
    strapi = await setupStrapi();
});

afterAll(async () => {
    strapi = await cleanupStrapi();
});

it("has a strapi setup object defined", () => {
    expect(strapi).toBeDefined();
});

it("should return a successful response from the example endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/contact")
        .expect(200);

    expect(response.body.data.title).toBe("Contact GMP");
});
