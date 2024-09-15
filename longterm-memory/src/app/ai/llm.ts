import { createOpenAI } from "@ai-sdk/openai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { createOpenAI as createOllama } from "@ai-sdk/openai";

type ModleMode = "fast" | "accurate" | "local";
type Provider = "groq" | "openai" | "ollama";

function getProviderName(mode: ModleMode): Provider {
  if (mode === "fast" && process.env.FAST_PROVIDER) {
    return process.env.FAST_PROVIDER as Provider;
  } else if (mode === "accurate" && process.env.ACCURATE_PROVIDER) {
    return process.env.ACCURATE_PROVIDER as Provider;
  } else {
    return "ollama";
  }
}

function getProvider(provider: Provider) {
  if (provider === "openai") {
    return createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } else if (provider === "groq") {
    return createGroq({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });
  } else {
    return createOllama({
      baseURL: "http://127.0.0.1:11434/v1",
      apiKey: "ollama",
    });
  }
}

function getModelName(providerName: Provider, mode: ModleMode) {
  return process.env[
    `${providerName.toUpperCase()}_${mode.toUpperCase()}_MODEL`
  ];
}

export const getModel = (mode: ModleMode) => {
  const providerName = getProviderName(mode);
  const modelName = getModelName(providerName, mode);
  const provider = getProvider(providerName);
  return provider(modelName!);
};
