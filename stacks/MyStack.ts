import { StackContext, Api, Auth } from "sst/constructs";
import { Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const secrets = Config.Secret.create(
    stack,
    "SPOTIFY_CLIENT_ID",
    "SPOTIFY_CLIENT_SECRET"
  );

  const auth = new Auth(stack, "auth", {
    authenticator: "packages/functions/src/authenticator.handler"
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [...Object.values(secrets)]
      }
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });

  auth.attach(stack, {
    api,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
