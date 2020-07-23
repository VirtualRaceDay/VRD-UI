// API interaction layer
const apiHost = process.env['REACT_APP_API_LOCATION'] || 'http://localhost:3000';

export const endpointUri = (endpoint, queryParams = {}) => {
  const url = new URL(endpoint, apiHost);
  url.search = new URLSearchParams(queryParams);
  return url;
}

const responseObject = (data) => ({ data });
const errorResponse = (method, endpoint, message) => ({
  error: `Error performing ${method} on ${endpoint}: ${message}`,
});

export const postToApi = async (endpoint, data) => {
  try {
    const res = await fetch(endpointUri(endpoint), {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });

    return res.ok ?
      responseObject(await res.json()) :
      errorResponse('GET', endpoint, res.statusText);

  } catch (e) {
    return errorResponse('GET', endpoint, e.message);
  }
}

export const getFromApi = async (endpoint, queryParams) => {
  try {
    const res = await fetch(endpointUri(endpoint, queryParams), {
      method: 'GET'
    });

    return res.ok ?
      responseObject(await res.json()) :
      errorResponse('GET', endpoint, res.statusText);
  } catch (e) {
    return errorResponse('GET', endpoint, e.message);
  }
}
