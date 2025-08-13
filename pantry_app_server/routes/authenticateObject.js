import * as z from "zod";

export const CardObject = z.object({
  name: z.string(),
  userId: z.number(),
});

export const ItemObject = z.object({
  title: z.string(),
  type: z.string(),
  quantity: z.number(),
  cardId: z.number(),
  inCart: z.boolean(),
  cartId: z.number(),
  purchaseQuantity: z.number(),
  userId: z.number(),
});

export const UserObject = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});
