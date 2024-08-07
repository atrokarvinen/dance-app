export const parseYoutubeId = (url: string) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const urlParamsId = urlParams.get("v");
  if (urlParamsId) {
    return urlParamsId;
  }
  return getMobileSharedId(url);
};

const getMobileSharedId = (url: string) => {
  try {
    const splitUrl = url.split("/");
    const lastPart = splitUrl[splitUrl.length - 1];
    const splitLastPart = lastPart.split("?");
    return splitLastPart[0];
  } catch (error) {}
  return undefined;
};

export const parseYoutubeUrl = (url: string) => {
  const embedId = parseYoutubeId(url);
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const start = urlParams.get("t");

  if (start) {
    const time = parseTime(start);
    return `${embedId}?start=${time}`;
  }
  return embedId;
};

const parseTime = (time: string) => {
  if (!time.includes("m") && !time.includes("s")) {
    const totalTime = parseInt(time);
    return totalTime;
  }

  const minutes = time.match(/\d+m/g);
  const seconds = time.match(/\d+s/g);
  const totalMinutes = minutes ? parseInt(minutes[0].slice(0, -1)) : 0;
  const totalSeconds = seconds ? parseInt(seconds[0].slice(0, -1)) : 0;
  return totalMinutes * 60 + totalSeconds;
};

export const getYoutubeThumbnail = (url: string | undefined) => {
  if (!url) return undefined;
  const embedId = parseYoutubeId(url);
  return `https://i3.ytimg.com/vi/${embedId}/hqdefault.jpg`;
};
