// Define a guest user object
const guestUser = {
  sid: "guest-session",
  given_name: "Guest",
  family_name: "User",
  nickname: "guestuser",
  name: "Guest User",
  picture: "/images/default-guest.png", // You can set a default guest image here
  updated_at: new Date().toISOString(),
  email: "guest@example.com",
  email_verified: false,
  sub: "guest|anonymous",
};

module.exports = guestUser;
