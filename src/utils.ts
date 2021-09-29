import isUrl from "is-url-superb";

export * from "@lib";

export const cs = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

export { isUrl };

export const isBrowser = typeof window !== "undefined";
export const isServer = typeof window === "undefined";
