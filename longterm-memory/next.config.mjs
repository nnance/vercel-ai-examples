/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PROVIDER: "local",
        GROQ_API_KEY: "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",
        GROQ_MODEL: "llama3-groq-70b-8192-tool-use-preview",
        LOCAL_MODEL: "llama3.1",
    }
};

export default nextConfig;
