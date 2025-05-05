const { createStrapi, compileStrapi } = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
    if (!instance) {
        const app = await createStrapi({ distDir: "./dist" }).load();
        instance = app;

        await instance.server.mount();
    }

    return instance;
}

async function cleanupStrapi() {
    if (instance) {
        await instance.server.httpServer.close();
        await instance.db.connection.destroy();

        instance.destroy();

        const tmpDBFile = strapi.config.get("database.connection.connection.filename");

        if (fs.existsSync(tmpDBFile)) {
            fs.unlinkSync(tmpDBFile);
        }
    };

    return instance;
}

module.exports = { setupStrapi, cleanupStrapi };
