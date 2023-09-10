import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    require: [true, "El nombre es requerido"],
    unique: true,
  },
  state: {
    type: Boolean,
    require: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export const Category = model("Category", CategorySchema);
