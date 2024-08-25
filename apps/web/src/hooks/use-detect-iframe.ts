export const useDetectIframe = () => {
  return typeof window !== "undefined" && window.self !== window.top;
};
