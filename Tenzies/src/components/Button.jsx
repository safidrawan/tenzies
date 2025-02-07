export default function Button(props){
    return  <button
    disabled={props.btnDisable}
    className={`btn ${props.btnDisable ? "btn-disabled" : ""}`}
    onClick={props.onClick}
  >
    {props.text}
  </button>
}