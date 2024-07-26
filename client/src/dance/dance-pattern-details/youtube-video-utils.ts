export const parseYoutubeId = (url: string) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const embedId = urlParams.get("v");
  const start = urlParams.get("t");

  if (start) {
    const trimmedStart = start.replace("s", "");
    return `${embedId}?start=${trimmedStart}`;
  }
  return embedId;
};

export const getYoutubeThumbnail = (url: string | undefined) => {
  if (!url) return undefined;
  const embedId = parseYoutubeId(url);
  return `https://i3.ytimg.com/vi/${embedId}/hqdefault.jpg`;
};
