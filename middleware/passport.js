const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
let allUsers = JSON.parse(fs.readFileSync("users.json", "utf8"));
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "1234",
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      const isUser = allUsers.findIndex((user) => user.id == payload.id);
      if (isUser) {
        done(null, isUser);
      } else {
        done(null, false);
      }
    })
  );
};
