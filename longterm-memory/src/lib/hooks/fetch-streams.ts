/**
 * Generator function that streams the response body from a fetch request.
 */
export async function* streamingFetch(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const response = await fetch(input, init);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    try {
      yield decoder.decode(value);
    } catch (e: any) {
      console.warn(e.message);
    }
  }
}

interface FetchStreamsProps {
  onNext: (value: string) => void;
  fetchOptions?: RequestInit;
}

export const streamFetch = (
  url: string,
  { onNext, fetchOptions }: FetchStreamsProps
) => {
  const fetchStreams = async () => {
    const it = streamingFetch(url, fetchOptions);

    for await (let value of it) {
      try {
        onNext(value);
      } catch (e: any) {
        console.warn(e.message);
      }
    }
  };

  return { fetchStreams };
};
