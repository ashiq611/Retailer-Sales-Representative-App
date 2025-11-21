import { createClient } from "redis";

let redis;

if (process.env.NODE_ENV === "test") {
  // mock redis for test env
  redis = {
    get: async () => null,
    set: async () => "OK",
    del: async () => 1
  };
} else {
  redis = createClient({ url: "redis://redis:6379" });
  redis.connect().catch(console.error);
}

export { redis };
