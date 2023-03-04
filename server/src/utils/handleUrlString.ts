const getUrlParams = (url?: string) => {
  const [, queryString] = url?.match(/\?(.*)$/) || [];

  const params = {} as Record<string, string>;
  queryString &&
    queryString.split('&').forEach((pair: string) => {
      const [key, value] = pair.split('=');
      Object(params)[key] = value;
    });

  return params;
};

const formatUrl = (url?: string) => {
  const [, primaryRoute, id, secondaryRoute] = url?.split('/') || [];

  if (!id && !secondaryRoute) {
    return `/${primaryRoute}`;
  }

  if (!id || !secondaryRoute) return new Error('Badly formatted route');

  return `/${primaryRoute}/${secondaryRoute}?id=${id}`;
};

const getUrlRoutes = (url?: string) => {
  const [, primaryRoute, id, secondaryRoute] = url?.split('/') || [];

  if (!id && !secondaryRoute) {
    return `${primaryRoute}`;
  } else {
    if (!id || !secondaryRoute) return new Error('Badly formatted route');

    return `${primaryRoute}/${secondaryRoute}?id=${id}`;
  }
};

export { getUrlParams, formatUrl, getUrlRoutes };
