import { redis } from "../db/redis";

const freezeTime = Number.parseInt(process.env.FREEZE_TIME!);

const calculateAttemptAmount = async (key: string, incrementStep: number) => {
  const attemptCount = await redis.incrementBy(key, incrementStep);
  const ttl = await redis.getTtl(key);

  console.log(ttl, attemptCount);

  if (ttl < 0) {
    await redis.setTtl(key, freezeTime);
  }

  return attemptCount;
};

export { calculateAttemptAmount };
