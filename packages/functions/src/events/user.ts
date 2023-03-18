import { Bus } from "@sqr/core/bus";

export const created = Bus.subscribe("user.login", async (evt) => {
  console.log(evt);
});
