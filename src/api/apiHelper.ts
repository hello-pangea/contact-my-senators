export function get<ResultType>(url: string): Promise<ResultType> {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-API-Key": process.env.NEXT_PUBLIC_PROPUBLICA_API_KEY ?? "",
    },
  })
    .catch(() => {
      throw new Error(`Network error: could not get at url: ${url}`);
    })
    .then((response) => {
      if (response.ok) {
        return response.json().catch(() => {
          return undefined;
        });
      } else {
        throw new Error(`Could not get at url: ${url}`);
      }
    });
}
