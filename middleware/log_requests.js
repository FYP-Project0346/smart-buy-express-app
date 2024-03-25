const log = (req, res, next) => {
  const http = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(http);
  next();
};

module.exports = {log}
