export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // If request arrives on any *.pages.dev domain, issue a permanent 301 redirect to primary custom domain
    if (url.hostname.endsWith('.pages.dev')) {
      url.hostname = 'freeiqexam.com';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // Otherwise, serve static assets normally
    return env.ASSETS.fetch(request);
  }
};
