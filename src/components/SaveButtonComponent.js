import classes from "./SaveButtonComponent.module.css";

const SaveButtonComponent = (props) => {
  return (
    <div className={classes.buttonsBox}>
      <button onClick={props.onPost} className={classes.saveBtn}>
        save changes
      </button>
      <button onClick={props.onFetch} className={classes.saveBtn}>
        discard changes
      </button>
    </div>
  );
};

export default SaveButtonComponent;
