const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

const mockUserData = {
    blocked: 0,
    confirmed: 1,
    description: 'Default visitor role',
    email: "tester@strapi.com",
    firstname: "Test",
    gsn_jwt_cookie: null,
    gsn_sign_in_cookie: null,
    internal_note: null,
    is_active: 1,
    is_disc_agreed: 1,
    last_sign_in: 1723265100000,
    lastname: "User",
    name: "Test",
    provider: "local",
    password: "1234Abc",
    preferred_language: "en",
    role: 4, // "visitor"
    role_id: 4,
    user_discl_choice_date: 1722484800000,
    username: "tester@strapi.com",
};

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

it("should login a user and return a jwt token", async () => {
    await strapi.plugins["users-permissions"].services.user.add({
        ...mockUserData,
    });

    await request(strapi.server.httpServer)
        .post("/api/auth/local")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
            identifier: mockUserData.email,
            password: mockUserData.password,
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((data) => {
            expect(data.body.jwt).toBeDefined();
        });
});

it('should return users data for authenticated user', async () => {
    const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({}, []);

    const role = defaultRole ? defaultRole.id : null;
    const user = await strapi.plugins['users-permissions'].services.user.add({
        ...mockUserData,
    });

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
    });

    await request(strapi.server.httpServer)
        .get('/api/users/me')
        .set('accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + jwt)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(data => {
            expect(data.body).toBeDefined();
            expect(data.body.id).toBe(user.id);
            expect(data.body.username).toBe(user.username);
            expect(data.body.email).toBe(user.email);
        });
});
