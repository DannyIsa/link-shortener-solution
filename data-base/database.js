const fs = require("fs");
const path = require("path");

const urlsJsonFilePath = path.join(__dirname, "./urls-bin/urls.json");

class DataBase {
  //First checks if url exists, if not adds him
  addNewUrl(url) {
    return new Promise(async (res, rej) => {
      try {
        await this.isBinEmpty();
        if (await this.checkIfExists(url)) {
          res(this.returnShortUrl(url));
        } else {
          fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
            if (err) throw err;
            const json = JSON.parse(data);
            const urls = json.urls;
            urls.push({
              full: url,
              short: urls.length + 1,
              creationDate: new Date().toString(),
              clicks: 0,
            });
            fs.writeFile(
              urlsJsonFilePath,
              JSON.stringify(json, null, 2),
              (err) => {
                if (err) throw err;
                res(this.returnShortUrl(url));
              }
            );
          });
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    });
  }

  //Checks if the url already have been used
  checkIfExists(checkedUrl) {
    return new Promise((res, rej) => {
      fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
        const json = JSON.parse(data);
        const urls = json.urls;
        const isExist = urls.findIndex((url) => url.full === checkedUrl) !== -1;

        res(isExist);
      });
    });
  }

  isBinEmpty() {
    return new Promise((res, rej) => {
      fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
        if (!data) {
          fs.writeFile(
            urlsJsonFilePath,
            JSON.stringify({
              urls: [],
            }),
            (err) => {}
          );
        }
        res(console.log("Made Bin!"));
      });
    });
  }

  //Gives the full url
  returnFullUrl(shortUrl) {
    return new Promise((res, rej) => {
      try {
        fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
          const json = JSON.parse(data);
          const urls = json.urls;
          const fullUrl = urls.find((currentUrl) => {
            return currentUrl.short == shortUrl;
          });
          if (fullUrl === undefined) {
            rej("URL not found");
          } else {
            res(fullUrl.full);
          }
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    });
  }

  returnShortUrl(fullUrl) {
    return new Promise((res, rej) => {
      fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
        const json = JSON.parse(data);
        const urls = json.urls;
        let result = [];
        urls.forEach((url) => {
          if (url.full === fullUrl) result.push(url);
        });
        res(result[0].short);
      });
    });
  }

  addClick(url) {
    return new Promise((res, rej) => {
      fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
        const json = JSON.parse(data);
        const urls = json.urls;
        const findUrlIndex = urls.findIndex(
          (currentUrl) => currentUrl.full === url
        );
        urls[findUrlIndex].clicks++;
        fs.writeFile(urlsJsonFilePath, JSON.stringify(json, null, 2), (err) => {
          if (err) throw err;
          res(this.returnShortUrl(url));
        });
      });
    });
  }

  showClicks(url) {
    return new Promise((res, rej) => {
      fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
        const json = JSON.parse(data);
        const urls = json.urls;
        const findUrlIndex = urls.findIndex(
          (currentUrl) => currentUrl.full === url
        );
        res(urls[findUrlIndex].clicks);
      });
    });
  }
  showCreateDate(url) {
    return new Promise((res, rej) => {
      fs.readFile(urlsJsonFilePath, "utf8", (err, data) => {
        const json = JSON.parse(data);
        const urls = json.urls;
        const findUrlIndex = urls.findIndex(
          (currentUrl) => currentUrl.full === url
        );
        res(urls[findUrlIndex].creationDate);
      });
    });
  }

  clearBin() {
    return new Promise(async (res, rej) => {
      res(
        fs.writeFile(
          urlsJsonFilePath,
          JSON.stringify({
            urls: [],
          }),
          (err) => {}
        )
      );
    });
  }
}

const dataBaseUrls = new DataBase();
module.exports = dataBaseUrls;
