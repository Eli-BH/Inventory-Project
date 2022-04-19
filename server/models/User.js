const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const itemSchema = mongoose.Schema(
  {
    itemName: String,
    sku: String,
    Image: String,
    quantity: Number,
    alert: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const listSchema = mongoose.Schema(
  {
    id: String,
    listName: String,
    userEmail: String,
    category: String,
    items: [itemSchema],
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    id: String,
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      maxLength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    lists: [listSchema],
    alerts: [
      {
        item: String,
        alert: String,
        quantity: Number,
      },
    ],
  },
  {
    timestamps,
  }
);

//hash the password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (matchPass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(matchPass, this.password, (err, isMatch) => {
      if (err) return reject(err);

      if (!isMatch) return reject(false);

      resolve(true);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
