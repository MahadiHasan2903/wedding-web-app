import { redirect } from "next/navigation";

export function fetchTyped<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}

  // This function is async, it will return a Promise:
): Promise<TResponse> {
  // Check if the URL already contains a version number
  const versionRegex = /\/v\d\//;
  const hasVersion = versionRegex.test(url);

  // If no version found, prepend v1 to the URL
  if (!hasVersion) {
    const urlSegments = url.split("/");
    urlSegments.splice(3, 0, "v1");
    url = urlSegments.join("/");
  }

  // Inside, we call the `fetch` function with
  // a URL and config given:

  const uConfig: RequestInit = {
    ...config,
    headers: { ...config.headers, Accept: "application/json" },
  };

  return fetch(url, uConfig).then(async (response) => {
    if (response.status === 401) {
      redirect("/login");
    }

    const data = await response.json();

    // console.log('Raw response:', JSON.stringify(data, null, 2)); //Using for debugging purpose

    // return the result data.
    return data as TResponse;
  });
}
