module.exports = ({ res }) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Not found",
    })
  );
};
