import React, {useState} from 'react';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
const MediaUploader = ({icon, className, multiple = false, types, onChange, text}) => {
    const [image, setImage] = useState(null)
    function handleChange(event) {
        setImage(URL.createObjectURL(event.target.files[0]));
        onChange(event);
      }
    return (
        <div align="center">
      <label htmlFor="upload-button">
        {
          image ? <img src={ image } width="300" height="300" /> : (
            <>
              <AccountBoxRoundedIcon style={{ fontSize: 200 }}/>
            </>
          )
        }
      </label>
      <input onChange={handleChange} type="file" id="upload-button" style={{ display: 'none' }} />
      <br />
      <button onClick={onChange}>Upload Image</button>
    </div>

    );
 };
 export default MediaUploader;