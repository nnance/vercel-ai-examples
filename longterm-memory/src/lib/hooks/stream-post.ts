import { useRef, useEffect, use, useState } from "react";

/**
 * Generator function that streams the response body from a fetch request.
 */
async function* streamingFetch(input: RequestInfo | URL, init?: RequestInit) {
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

interface StreamPostProps {
  onNext: (value: string) => void;
}

export const useStreamPost = (url: string, props: StreamPostProps) => {
  const [payload, setPayload] = useState<string>();

  const onNext = useRef(props.onNext);

  useEffect(() => {
    onNext.current = props.onNext;
  }, [props.onNext]);

  useEffect(() => {
    async function fetchData(payload: string) {
      const it = streamingFetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      for await (let value of it) {
        onNext.current(value);
      }
    }
    if (payload) {
      fetchData(payload);
    }
  }, [url, payload]);

  return { setPayload };
};
