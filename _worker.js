/**
 * Cloudflare Pages worker.
 * Host rules in _redirects are ignored, so www is folded here.
 * Old .html and index.html addresses forward to the short public address.
 */
const TOP = new Set(["about", "contact", "privacy", "terms", "cookies"]);

function publicPath(pathname) {
  if (pathname === "/index.html") return "/";
  const top = pathname.match(/^\/(about|contact|privacy|terms|cookies)(?:\.html|\/)$/);
  if (top && TOP.has(top[1])) return "/" + top[1];
  const category = pathname.match(/^\/categories\/([a-z0-9-]+)(?:\.html|\/)$/);
  if (category) return "/categories/" + category[1];
  const gameIndex = pathname.match(/^\/games\/([a-z0-9-]+)\/index\.html$/);
  if (gameIndex) return "/games/" + gameIndex[1] + "/";
  const gameBare = pathname.match(/^\/games\/([a-z0-9-]+)$/);
  if (gameBare) return "/games/" + gameBare[1] + "/";
  return pathname;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const nextPath = publicPath(url.pathname);
    const www = url.hostname === "www.solitairefelt.com";
    if (www || nextPath !== url.pathname) {
      if (www) {
        url.hostname = "solitairefelt.com";
        url.protocol = "https:";
      }
      url.pathname = nextPath;
      return Response.redirect(url.href, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
