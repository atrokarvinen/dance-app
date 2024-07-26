import "./styles.css";
import { parseYoutubeUrl } from "./youtube-video-utils";

type Props = {
  url: string;
};

export const Video = ({ url }: Props) => {
  const youtubeUrl = parseYoutubeUrl(url);
  if (!youtubeUrl) {
    return <div>Invalid youtube url</div>;
  }
  return (
    <div className="video-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeUrl}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
