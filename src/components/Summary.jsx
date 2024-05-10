import { useMemo } from "react";
import successImage from "../assets/images/success.png";
import useFatch from '../hooks/useFetch';
import classes from '../styles/Summary.module.css';


export default function Summary ({score, noq}){

  const getKeyword = useMemo(() => {
    if((score / (noq * 5)) * 100 < 50 ){
      return "failed"
    } else if (((score / (noq * 5)) * 100 < 75 )){
      return "Good"
    }else if (((score / (noq * 5)) * 100 < 100 )){
      return "very good";
    } else{
      return "excellent";
    }
  }, [score, noq]);
  const {loading, error, result} = useFatch(`https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`, "GET", {
    Authorization: import.meta.env.VITE_APP_PEXELS_API
  });

  const image = result ? result?.photos[0].src.medium : successImage;


  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Loading your badge..</div>}
      {error && <div className={classes.badge}>An error occurd!..</div>}

      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}