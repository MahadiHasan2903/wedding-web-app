import { ZodSchema } from "zod";

export function fetchZodTyped<T>(
  url: string,
  config: RequestInit = {},
  schema: ZodSchema<T>,
  timeoutMs = 12000 // default timeout 2 minutes
): Promise<T> {
  // Check if the URL already contains a version number
  const versionRegex = /\/v\d\//;
  const hasVersion = versionRegex.test(url);

  // If no version found, prepend v1 to the URL
  if (!hasVersion) {
    const urlSegments = url.split("/");
    urlSegments.splice(3, 0, "v1");
    url = urlSegments.join("/");
  }

  // console.log('Url:', url); //For debugging purpose
  // console.log('Config:', config); //For debugging purpose

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const uConfig: RequestInit = {
    ...config,
    signal: controller.signal,
    headers: { ...config.headers, Accept: "application/json" },
  };

  return fetch(url, uConfig)
    .then(async (response) => {
      clearTimeout(timeout);
      const data = await response.json();

      console.log("Raw response:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        // Use server message if available
        throw new Error(data?.message || `HTTP Error: ${response.status}`);
      }

      if (data.success === false || data.status === false) {
        const serverError =
          data?.error || data?.message || "Unknown server error";
        throw new Error(serverError);
      }

      const result = schema.safeParse(data);
      if (!result.success) {
        throw new Error(`Validation error: ${result.error.message}`);
      }

      return result.data;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error(`The request timed out. Please try again later.`);
      }
      throw error;
    });
}
