import { ZodSchema } from "zod";
import { redirect } from "next/navigation";

export async function zodApiMutation<T>(
  url: string,
  config: RequestInit = {},
  schema: ZodSchema<T>
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

  const uConfig: RequestInit = {
    ...config,
    headers: { ...config.headers, Accept: "application/json" },
  };

  // console.log('uConfig:', JSON.stringify(uConfig, null, 2)); //Using for debugging purpose

  const response = await fetch(url, uConfig);

  // If unauthorized, redirect to login
  if (response.status === 401) {
    redirect("/login");
  }

  const data = await response.json();

  console.log("Raw response:", JSON.stringify(data, null, 2)); //Using for debugging purpose

  if (data?.success === false) {
    const serverError = data?.error || data?.message || "Unknown server error";
    throw new Error(serverError);
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Validation error: ${result.error.message}`);
  }

  return result.data;
}
