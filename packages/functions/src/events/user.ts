import { Bus } from "@sqr/core/bus";
import { Spotify } from "@sqr/core/spotify";
import { User } from "@sqr/core/user";

export const login = Bus.subscribe("user.login", async (evt) => {
  const user = await User.fromID(evt.userID);
  if (!user)
    throw new Error(`User [${evt.userID}] does not exist`);

  const { accessToken, refreshToken } = user;

  const client = await Spotify.client({
    access: accessToken,
    refresh: refreshToken
  });

  await Spotify.sync(client);
});
