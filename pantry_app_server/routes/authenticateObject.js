const z = require("zod");

const CardObject = z.object({
  name: z.string(),
  userId: z.number(),
});

const ItemObject = z.object({
  title: z.string(),
  quantity: z.number(),
  type: z.string(),
  cardId: z.number(),
  inCart: z.boolean(),
  cartId: z.number().nullable(),
  purchaseQuantity: z.number(),
  userId: z.number(),
});

const UserObject = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

module.exports = { CardObject, ItemObject, UserObject };
