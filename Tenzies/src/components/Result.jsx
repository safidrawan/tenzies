import Button from "./Button";
export default function Result(props) {
  return <div className="result"><h1 > completed in: <br /> {props.count} Rolls</h1>
  <Button btnDisable={!props.btnDisable} onClick={props.onClick} text="Restart" />
  </div>
}
