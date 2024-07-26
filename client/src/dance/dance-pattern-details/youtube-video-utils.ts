export const parseYoutubeId = (url: string) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const embedId = urlParams.get("v");
  const start = urlParams.get("t");

  if (start) {
    const minutes = start.match(/\d+m/g);
    const seconds = start.match(/\d+s/g);
    const totalMinutes = minutes ? parseInt(minutes[0].slice(0, -1)) : 0;
    const totalSeconds = seconds ? parseInt(seconds[0].slice(0, -1)) : 0;
    const time = totalMinutes * 60 + totalSeconds;
    return `${embedId}?start=${time}`;
  }
  return embedId;
};

export const getYoutubeThumbnail = (url: string | undefined) => {
  if (!url) return undefined;
  const embedId = parseYoutubeId(url);
  return `https://i3.ytimg.com/vi/${embedId}/hqdefault.jpg`;
};
