export async function easyFetch<T>(
  url: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, init);
  if (response.ok) {
    return (await response.json()) as T;
  } else {
    throw Error(
      `Server responded with status ${response.status} ${response.statusText}`
    );
  }
}
