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
