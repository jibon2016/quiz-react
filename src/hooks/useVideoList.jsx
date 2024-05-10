import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHaseMore] = useState(true)

  useEffect(() => {
    async function fetchVideos(){
      //database related work
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videosQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(4)
      )
      try{
        setError(false);
        setLoading(true);
        //request firebase Database
        const snapshot = await get(videosQuery);
        setLoading(false);
        if(snapshot.exists()){
          setVideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshot.val())]
          });
        }else{
          setHaseMore(false)
        }
      } catch(err){
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    
    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore
  };
}