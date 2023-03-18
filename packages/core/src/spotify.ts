export * as Spotify from "./spotify";
import Spotify from "spotify-api.js";
import { Config } from "sst/node/config";

export interface Credentials {
  access: string;
  refresh: string;
}

export async function client(input: Credentials) {
  return await Spotify.Client.create({
    token: {
      token: input.access,
      refreshToken: input.refresh,
      clientID: Config.SPOTIFY_CLIENT_ID,
      clientSecret: Config.SPOTIFY_CLIENT_SECRET,
    },
    userAuthorizedToken: true,
  });
}