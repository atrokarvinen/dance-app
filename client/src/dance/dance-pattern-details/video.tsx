import "./styles.css";

type Props = {
  url: string;
};

export const Video = ({ url }: Props) => {
  const parseYoutubeId = (url: string) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("v");
  };

  const embedId = parseYoutubeId(url);
  if (!embedId) {
    return <div>Invalid youtube url</div>;
  }
  return (
    <div className="video-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
