import { ulid } from "ulid";

/**
 * 現在時刻をseedにしてulidを返却する
 * @returns
 */
export const createUlid = () => {
  const seed = new Date().getTime();

  return ulid(seed);
};
