import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { Form, FormGroup, Label, Input } from "reactstrap";
// import ImgCrop from "antd-img-crop";

const UploadImage = ({ images, setImages }) => {
  const [fileList, setFileList] = useState(
    images?.map((image) => ({
      uid: Math.random() * 10000 + "",
      name: "image.png",
      status: "done",
      url: image,
    })) || []
  );
  React.useEffect(() => {
    console.log(images);
    // setFileList(
    //   images?.map((image) => ({
    //     uid: Math.random() * 10000 + "",
    //     name: "image.png",
    //     status: "done",
    //     url: image,
    //   })) || []
    // );
  }, [images]);
  // const fillFileList = () =>
  //   images?.map((image) => ({
  //     uid: Math.random() * 10000 + "",
  //     name: "image.png",
  //     status: "done",
  //     url: image,
  //   })) || [];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [linkImage, setLinkImage] = useState("");

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  React.useEffect(() => {
    setImages(fileList.map((file) => file.url));
  }, [fileList, setImages]);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onOpenAddImage = () => {
    setIsModalVisible(true);
  };

  const onAddLinkImageOK = () => {
    setIsModalVisible(false);
    setFileList((currentState) => [
      ...currentState,
      {
        uid: Math.random() * 1000 + "",
        name: "image.png",
        status: "done",
        url: linkImage,
      },
    ]);
    setImages([...images, linkImage]);
  };

  const onAddLinkImageModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleLinkChange = (e) => {
    setLinkImage(e.target.value);
  };
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        openFileDialogOnClick={false}
        beforeUpload={false}
        transformFile={false}
      >
        {images && images.length < 4 && (
          <div onClick={onOpenAddImage}>+ Upload</div>
        )}
      </Upload>
      <Modal
        title="Add Link Image"
        visible={isModalVisible}
        onOk={onAddLinkImageOK}
        onCancel={onAddLinkImageModalCancel}
      >
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder=""
              value={linkImage}
              onChange={handleLinkChange}
            />
          </FormGroup>
        </Form>
      </Modal>
    </>
  );
};

export default UploadImage;
