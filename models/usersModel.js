const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [false, "Verify token is required"],
  },
});

usersSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);

    this.avatarURL = gravatar.url(this.email, {
      d: "retro",
      s: 250,
      protocol: "https",
    });

    this.verificationToken = uuid();
  }
});

const User = mongoose.model("user", usersSchema);

module.exports = { User };
