const request = require("supertest");
const app = require("../../app");

describe("Checking app post", () => {
  it("Should post", async () => {
    const response = await request(app)
      .post("/api/shortUrls/new")
      .send({ url: "https://mondrianandme.com/" })
      .type("form");
    expect(response.status).toBe(200);
  });
});

describe("Checking app post when URL not exists", () => {
  it("Shouldn't post", async () => {
    const response = await request(app)
      .post("/api/shortUrls/new")
      .send({ url: "https://notRealyALinkJustForTheTest.com/" })
      .type("form");
    expect(response.status).toBe(400);
  });
});

describe("Checking app get", () => {
  it("Should get", async () => {
    const response = await request(app).get("/api/shortUrls/1");
    expect(response.status).toBe(302);
  });
});

describe("Checking app get", () => {
  it("Shouldn't get", async () => {
    const response = await request(app).get("/api/shortUrls/96845986");
    expect(response.status).toBe(404);
  });
});
