import { AuthHandler, OauthAdapter } from "sst/node/auth";
import { Config } from "sst/node/config";
import { Issuer } from "openid-client";

export const handler = AuthHandler({
  providers: {
    spotify: OauthAdapter({
      clientID: Config.SPOTIFY_CLIENT_ID,
      clientSecret: Config.SPOTIFY_CLIENT_SECRET,
      scope: "playlist-read-private",
      issuer: new Issuer({
        issuer: "https://accounts.spotify.com",
        authorization_endpoint: "https://accounts.spotify.com/authorize",
        token_endpoint: "https://accounts.spotify.com/api/token"
      }),
      onSuccess: async (tokenset, _client) => {
        return {
          statusCode: 200,
          body: JSON.stringify(tokenset),
        };
      },
    }),
  },
});
