export default function DisplayField({ name, value, onChange = null, sx, allowFocus = true }) {
  return (
    <input
      style={{
        backgroundColor: "inherit",
        border: "solid #A6A6A6 1px",
        borderRadius: "5px",
        paddingLeft: "1rem",
        paddingRight:"1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        height:"fit-content",
        color:"white",
        width:"100%",
        ...sx
      }}
      name={name}
      value={value}
      onChange={onChange}
      onFocus = {(e) => {
        if(!allowFocus) e.target.blur()
      }}
      onCLick = {(e)=>{
        if(!allowFocus) e.preventDefault()
      }}
    />
  );
}
