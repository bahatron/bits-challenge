import request from "supertest";
import { app } from "../../server";

describe("Ping Route", () => {
    it("returns http 200", async () => {
        await request(app).get("/ping").expect(200);
    });

    it("returns pong as body", async () => {
        await request(app)
            .get("/ping")
            .expect((res) => {
                expect(res.body).toBe("pong");
            });
    });
});
