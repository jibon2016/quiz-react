import classes from "../styles/Illustration.module.css";


export default function Illustration ({image, altText}){
  return (
    <div className={classes.illustration}>
      <img src={image} alt={altText} />
    </div>
  );
}