import React, { useState } from "react";
import axios from "axios";
UploadFile.propTypes = {};

function UploadFile(props) {
  // const [err, setError] = useState(null);
  const [images, setImages] = useState([]);
  const uploadImage = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files.length);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let urlImages = [];
      const uploadCloud = (files) =>
        new Promise(async (resolve, reject) => {
          for (let i = 0; i < files.length; i++) {
            if (i === files.length) {
              resolve(urlImages);
            }
            const file = files[i];
            //   if (!file) return setError("No files were uploaded.");

            //   if (file.size > 1024 * 1024) return setError("Size too large.");

            //   if (file.type !== "image/jpeg" && file.type !== "image/png")
            //     return setError("File format is incorrect.");

            let formData = new FormData();
            formData.append("file", file);
            const res = await axios.post(
              "http://localhost:3001/api/upload_single",
              formData,
              config
            );
            console.log(res.data.url);
            urlImages.push(res.data.url);
          }
        })
          .then((result) => result)
          .catch((err) => console.log(err));
      const data = await uploadCloud(files);
      setImages(data);
      //   setImages(uploadCloud);
    } catch (err) {
      console.log(err);
      //   setError(err.response.data.msg);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        name="file"
        multiple
        onChange={uploadImage}
      />
      <div className="images">
        {images.map((ig, i) => (
          <img key={i} src={ig} alt={`product-${i}`} width={150} height={150} />
        ))}
      </div>
    </div>
  );
}

export default UploadFile;
