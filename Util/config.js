module.exports = (app, db, _) => {
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Bearer " + undefined
  };
  let options = {};
  options.host = "localhost:8080/v1/api/";
  options.port = 80;
  options.headers = headers;
}
