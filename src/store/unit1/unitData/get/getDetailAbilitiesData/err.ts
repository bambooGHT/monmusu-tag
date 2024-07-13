import { message } from "@/message";

export const err = (id: number | string): Error => {
  const error = `id ${id} does not exist`;
  message.add({ type: "error", message: error });
  return new Error(error);
};