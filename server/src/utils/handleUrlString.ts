const getUrlParams = (url: string) => {
  const [, queryString] = url.match(/\?(.*)$/) || [];

  const params = {};
  queryString.split('&').forEach((pair: string) => {
    const [key, value] = pair.split('=');
    Object(params)[key] = value;
  });

  return params;
};

const getUrlRoutes = (url: string) => {
  const [baseUrl, primaryRoute, id, secondaryRoute] = url.split('/');

  if (!id && !secondaryRoute) {
    return primaryRoute;
  } else {
    if (!id || !secondaryRoute) return new Error('Badly formatted route');

    return `${primaryRoute}/${secondaryRoute}?id=${id}`;
  }
};

export { getUrlParams };
