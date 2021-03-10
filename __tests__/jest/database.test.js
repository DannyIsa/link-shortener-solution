const dataBase = require("../../data-base/database");

async function clearUrlBin() {
  await dataBase.clearBin();
}

clearUrlBin();

const fullUrl = "https://9gag.com/";
async () => await dataBase.addNewUrl(fullUrl);

describe("Test the addNewUrl method", () => {
  test("returns short url", async () => {
    expect(await dataBase.addNewUrl(fullUrl)).toBe(1);
  });
  test("Return shortUrl when not exists", async () => {
    const notExistUrl = "https://www.netflix.com/browse";
    expect(await dataBase.addNewUrl(notExistUrl)).toBe(2);
  });
  test("Return shortUrl already exists", async () => {
    const existUrl = "https://www.netflix.com/browse";
    expect(await dataBase.addNewUrl(existUrl)).toBe(2);
  });
});

describe("Tests the returnShortUrl method", () => {
  test("returns short url", async () => {
    expect(await dataBase.returnShortUrl(fullUrl)).toBe(1);
  });
  test("returns short url", async () => {
    expect(await dataBase.returnShortUrl(fullUrl)).not.toBe(2);
  });
});
