const fs = require("fs/promises");

const readFile = async ({ path }) => {
  try {
    return await fs.readFile(path, "utf8");
  } catch (error) {
    console.log(`Can't read the file by path ${path}! ERROR message: ${error}`);
  }
};

const writeFile = async ({ path, data }) => {
  try {
    await fs.writeFile(path, JSON.stringify(data), "utf8");
  } catch (error) {
    console.log(
      `Can't write the file by path ${path}! ERROR message: ${error}`
    );
  }
};

module.exports = { readFile, writeFile };
