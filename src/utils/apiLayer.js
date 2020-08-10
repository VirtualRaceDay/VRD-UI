// API interaction layer
const apiHost = process.env['REACT_APP_API_LOCATION'] || 'http://localhost:3000';

export const endpointUri = (endpoint, queryParams = {}) => {
  const url = new URL(endpoint, apiHost);
  url.search = new URLSearchParams(queryParams);
  return url;
}

const responseObject = (data) => ({ data });
const errorResponse = (code, method, endpoint, message) => ({
  error: `${code} Error performing ${method} on ${endpoint}: ${message}`,
});

export const postToApi = async (endpoint, payload) => {
  try {
    const res = await fetch(endpointUri(endpoint), {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const { code, data } = await res.json();

    return res.ok ?
      responseObject(data) :
      errorResponse(code, 'POST', endpoint, data);

  } catch (e) {
    return errorResponse(500, 'POST', endpoint, e.message);
  }
}


export const putToApi = async (endpoint, payload) => {
  try {
    const res = await fetch(endpointUri(endpoint), {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const { code, data } = await res.json();

    return res.ok ?
      responseObject(data) :
      errorResponse(code, 'POST', endpoint, data);

  } catch (e) {
    return errorResponse(500, 'POST', endpoint, e.message);
  }
}

export const getFromApi = async (endpoint, queryParams) => {
  try {
    const res = await fetch(endpointUri(endpoint, queryParams), {
      method: 'GET'
    });

    const { code, data } = await res.json();

    return res.ok ?
      responseObject(data) :
      errorResponse(code, 'GET', endpoint, data);
  } catch (e) {
    return errorResponse(500, 'GET', endpoint, e.message);
  }
}
