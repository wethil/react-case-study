import { routes, Route } from "@/routes";

/**
 * Returns route metadata for a given pathname.
 * Matches the first route whose path is a prefix of the pathname.
 */
export function getRouteMeta(pathname: string): Route {
  for (const meta of Object.values(routes)) {
    if (pathname.startsWith(meta.path)) return meta;
  }
  return routes.home;
}
