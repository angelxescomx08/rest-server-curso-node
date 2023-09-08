import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es requerido"],
  },
  estado: {
    type: Boolean,
    require: true,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

export const Category = model("Category", CategorySchema);
