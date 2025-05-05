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

// PAGES //
it("should return a successful response from the home/global endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/global")
        .expect(200);

    expect(response.body.data.title).toBe("GMP Home Page");
    expect(response.body.data.heading).toBe("GMP Home Page");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the about endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/about")
        .expect(200);

    expect(response.body.data.title).toBe("About GMP");
    expect(response.body.data.heading).toBe("This About GMP page is an example page.");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the home/contact endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/contact")
        .expect(200);

    expect(response.body.data.title).toBe("Contact GMP");
    expect(response.body.data.heading).toBe("Contact GMP");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the sitemap endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/sitemap")
        .expect(200);

    expect(response.body.data.title).toBe("Sitemap");
    expect(response.body.data.heading).toBe("Sitemap");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the privacy policy endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/privacy-policy")
        .expect(200);

    expect(response.body.data.title).toBe("Privacy Policy");
    expect(response.body.data.heading).toBe("Privacy Policy");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the how to endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/how-to")
        .expect(200);

    expect(response.body.data.title).toBe("How To");
    expect(response.body.data.heading).toBe("How to use the app");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the FAQs endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/faq")
        .expect(200);

    expect(response.body.data.title).toBe("FAQs");
    expect(response.body.data.heading).toBe("FAQs");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the disclaimer endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/disclaimer")
        .expect(200);

    expect(response.body.data.title).toBe("Disclaimer");
    expect(response.body.data.heading).toBe("TBD");
    expect(response.body.data.description).toBe("You {choice} to the following disclaimer");
});

it("should return a successful response from the pricing endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/pricing")
        .expect(200);

    expect(response.body.data.title).toBe("Pricing");
    expect(response.body.data.heading).toBe("Pricing");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the sign in endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/sign-in")
        .expect(200);

    expect(response.body.data.title).toBe("Sign In");
    expect(response.body.data.heading).toBe("Sign In");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the terms and conditions endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/term-and-condition")
        .expect(200);

    expect(response.body.data.title).toBe("Terms and Conditions");
    expect(response.body.data.heading).toBe("Terms and Conditions");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the Cookie Policy endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/cookie-policy")
        .expect(200);

    expect(response.body.data.title).toBe("Cookie Policy");
    expect(response.body.data.heading).toBe("Cookie Policy");
    expect(response.body.data.description).toBe("TBD");
});

it("should return a successful response from the Services endpoint", async () => {
    const response = await request(strapi.server.httpServer)
        .get("/api/service")
        .expect(200);

    expect(response.body.data.title).toBe("Services");
    expect(response.body.data.heading).toBe("Services");
    expect(response.body.data.description).toBe("TBD");
});
