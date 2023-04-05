const app = require("./app");
const { dbConnection } = require("./sevices/connectMongo");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbConnection();
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Database connection ERROR!");
    process.exit(1);
  }
};

module.exports = startServer;
