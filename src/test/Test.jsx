import { useState } from "react";

export default function Test() {
  const [images, setImages] = useState([])
  const imageNumber = images.length
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const sxOfContainer = () => {
    if(imageNumber === 1)
      return{
        objectFit:'cover',
        border:'solid red 1px',
        overflow:'hidden',
      }
    

    if(imageNumber === 2)
      return{
        display:'grid',
        gridTemplateColumns:'repeat(2, 1fr)'
      }

    if(imageNumber >= 3){
      return{
        display:'grid',
        gridTemplateColumns:'repeat(3, 1fr)'
      }
    }
  }
  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleChange(e)}
      />
      <div style={{height:'500px', border:'solid green 1px', width:'300px', paddingTop:'3rem'}}>
        <div style={sxOfContainer()}>
          {images.map((img) => (
            <img style={{
              width:'100%',
              height:'100%',
            }} src={URL.createObjectURL(img)} />
          ))}
        </div>
      </div>
    </div>
  );
}
