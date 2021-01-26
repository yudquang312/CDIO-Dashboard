import React, { useState } from "react";
import axios from "axios";
import Image from "./Image";

function UploadFile(props) {
  const [url, setUrl] = useState(
    "https://res.cloudinary.com/thaovan/image/upload/v1610009745/Dinosuar_shop/products/stu_basas_A61017_3_rsiihg.jpg"
  );
  const uploadImage = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const uploadCloud = (files) =>
        new Promise(async (resolve, reject) => {
          const file = files[0];
          let formData = new FormData();
          formData.append("file", file);
          const res = await axios.post(
            "http://localhost:3001/api/upload_single",
            formData,
            config
          );
          resolve(res.data.url);
        })
          .then((result) => result)
          .catch((err) => console.log(err));
      const data = await uploadCloud(files);
      console.log(data);
      setUrl(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input type="file" id="file" name="file" onChange={uploadImage} />
      <Image imageUrl={url} />
    </div>
  );
}

export default UploadFile;
