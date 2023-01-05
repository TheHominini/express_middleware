import { createClient, RedisClientType } from "redis";

class Redis {
  private driver: RedisClientType;

  constructor(host: string, port: number) {
    this.driver = createClient({ socket: { host, port } });

    this.driver.connect();
  }

  incrementBy(key: string, increment: number) {
    return this.driver.incrBy(key, increment);
  }
}

const { host, port } = JSON.parse(process.env.REDIS!);

const redis = new Redis(host, port);

export { redis };
