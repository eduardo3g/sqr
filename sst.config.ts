import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(input) {
    const profile: Record<string, string> = {
      dev: "default",
      production: "default"
    };

    return {
      name: "sqr",
      region: "us-east-1",
      profile: profile[input.stage || ""] || profile.dev
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
