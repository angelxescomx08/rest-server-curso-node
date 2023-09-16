import { Schema, model } from "mongoose";

const RolSchema = new Schema({
  rol: {
    type: String,
    required: [true, "El rol es requerido"],
  },
});

export const Rol = model("rol", RolSchema);
