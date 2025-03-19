import { toast } from "sonner";

// Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions<TData, TResponse> {
  url: string;
  method?: HttpMethod;
  data?: TData;
  headers?: Record<string, string>;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: string) => void;
  silent?: boolean; // Add silent option to skip toast notifications
}

interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  error: string | null;
}

// Main API function
export function apiRequest<TData, TResponse>({
  url,
  method = "GET",
  data,
  headers = {},
  loadingMessage = "Loading...",
  successMessage = "Success",
  errorMessage = "An error occurred",
  onSuccess,
  onError,
  silent = false, // Default to showing toasts
}: ApiOptions<TData, TResponse>): Promise<ApiResponse<TResponse>> {
  // Create a promise that will be used for the actual API call
  const apiPromise = new Promise<ApiResponse<TResponse>>(
    async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: data ? JSON.stringify(data) : undefined,
        });

        // Try to parse the response as JSON
        let result: any;
        let errorMsg = "";

        try {
          result = await response.json();
        } catch (e) {
          // If response is not JSON, use status text
          result = null;
          errorMsg = response.statusText || "Failed to parse response";
        }

        // Handling cases where we have JSON but still need to check for error messages
        if (!response.ok) {
          // Try to extract error message from various server response formats
          errorMsg =
            (result && result.message) ||
            (result && result.error) ||
            (result && result.exception) ||
            errorMsg ||
            `Error: ${response.status} ${response.statusText}`;

          const apiResponse: ApiResponse<TResponse> = {
            data: null,
            success: false,
            error: errorMsg,
          };

          if (onError) onError(errorMsg);
          // Reject the promise for toast to show error
          reject(apiResponse);
          return;
        }

        const apiResponse: ApiResponse<TResponse> = {
          data: result,
          success: true,
          error: null,
        };

        if (onSuccess) onSuccess(result);
        resolve(apiResponse);
      } catch (error) {
        // Handle the unknown type error
        const errorMsg =
          error instanceof Error
            ? error.message
            : String(error || errorMessage);

        const apiResponse: ApiResponse<TResponse> = {
          data: null,
          success: false,
          error: errorMsg,
        };

        if (onError) onError(errorMsg);
        // Reject the promise for toast to show error
        reject(apiResponse);
      }
    },
  );

  // Create a wrapper promise that will always resolve with the result, even after rejection
  const wrappedPromise = apiPromise.catch((error) => {
    // Return the error result but don't throw
    return error;
  });

  // Show toast only if not silent
  if (!silent) {
    toast.promise(apiPromise, {
      loading: loadingMessage,
      success: (data) => ({
        message: successMessage,
        description:
          data.data && "message" in (data.data as any)
            ? (data.data as any).message
            : successMessage,
      }),
      error: (err) => ({
        message: "Error",
        description: err.error || errorMessage,
      }),
    });
  }

  // Return the wrapped promise that always resolves
  return wrappedPromise;
}
