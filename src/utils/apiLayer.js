// API interaction layer
const apiHost = process.env['REACT_APP_API_LOCATION'] || 'http://localhost:3000';

export const endpointUri = (endpoint, queryParams = {}) => {
  const url = new URL(endpoint, apiHost);
  url.search = new URLSearchParams(queryParams);
  return url;
}

export const postToApi = async (endpoint, data) => {
  try {
    const response = await fetch(endpointUri(endpoint), {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  } catch (e) {
    console.error(`Error performing POST to ${endpoint}: ${e.message}`);
    return {};
  }
}

export const getFromApi = async (endpoint, queryParams) => {
  try {
    const response = await fetch(endpointUri(endpoint, queryParams), {
      method: 'GET'
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  } catch (e) {
    console.error(`Error performing GET to ${endpoint}: ${e.message}`);
    return {};
  }
}
