import "./styles.css";
import { parseYoutubeId } from "./youtube-video-utils";

type Props = {
  url: string;
};

export const Video = ({ url }: Props) => {
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
