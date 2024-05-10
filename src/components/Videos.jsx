import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos () {
  const [page, setPaage] = useState(1);
  const {loading, error, videos, hasMore} = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
      <InfiniteScroll 
      dataLength={videos.length} 
      hasMore={hasMore} 
      next={() => setPaage(page + 8)}
      loader="loding.."
      >
        { videos.map((video) => 
        video.noq > 0 ?(
          <Link to={`/quiz/${video.youtubeID}`} key={video.youtubeID} >
          <Video title={video.title} id={video.youtubeID} noq={video.noq} />
        </Link>
        ) : (
          <Video key={video.youtubeID} title={video.title} id={video.youtubeID} noq={video.noq} />
        )
        )}
      </InfiniteScroll>
        )}
      {!loading && videos.length === 0 && (<div>No data found</div>)}
      {error && (<div>There was an error</div>)}
      {loading && (<div>Loding...</div>)}
    </div>
  );
}