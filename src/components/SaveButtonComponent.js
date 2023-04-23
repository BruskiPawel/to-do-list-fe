import classes from "./SaveButtonComponent.module.css";

const SaveButtonComponent = (props) => {
  return (
    <div className={classes.buttonsBox}>
      <button onClick={props.onSave} className={classes.saveBtn}>
        save changes
      </button>
      <button onClick={props.onDiscard} className={classes.saveBtn}>
        discard changes
      </button>
    </div>
  );
};

export default SaveButtonComponent;
