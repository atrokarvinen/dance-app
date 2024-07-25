export const parseYoutubeId = (url: string) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("v");
};

export const getYoutubeThumbnail = (url: string | undefined) => {
  if (!url) return undefined;
  const embedId = parseYoutubeId(url);
  return `https://i3.ytimg.com/vi/${embedId}/hqdefault.jpg`;
};
