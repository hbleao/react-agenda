export async function handleResponse(response: Response) {
  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  }
  throw new Error(response.statusText);
}

export function handleBodyRequest(
  method: string,
  event: any,
  credentials: RequestCredentials = 'include'
) {
  return {
    method,
    credentials,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  };
}
