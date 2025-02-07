import Button from "./Button";
export default function Result(props) {
  return <div className="result"><h1 > completed in {props.count} tries.</h1>
  <Button btnDisable={!props.btnDisable} onClick={props.onClick} text="Restart" />
  </div>
}
