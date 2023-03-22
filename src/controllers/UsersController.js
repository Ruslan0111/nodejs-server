const USERS = require("../db/users.json");

module.exports = ({ res, searchParams }) => {
  let users = [...USERS];

  searchParams.forEach((value, name) => {
    if (name in filters && users.length) {
      users = filters[name](value, users);
    }
  });

  if (users.length === 0) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message:
          "User data is missing or does not match the search and filter criteria",
      })
    );

    return;
  }

  const limit = parseInt(searchParams.get("limit"));

  if (limit >= 0) {
    users = users.slice(0, limit);
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

const filters = {
  fullNameSearch: (search, data) => {
    return data.filter(
      (item) => item.fullName.toLowerCase() === search.toLowerCase()
    );
  },

  minAge: (age, data) => {
    return data.filter((item) => item.age >= age);
  },

  maxAge: (age, data) => {
    return data.filter((item) => item.age <= age);
  },

  type: (type, data) => {
    return data.filter((item) => item.type === type);
  },
};
