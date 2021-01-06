import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { Form, FormGroup, Label, Input } from "reactstrap";
// import ImgCrop from "antd-img-crop";

const UploadImage = (props) => {
  // const [fileList, setFileList] = useState(
  //   props.images?.map((image) => ({
  //     uid: Math.random() * 10000 + "",
  //     name: "image.png",
  //     status: "done",
  //     url: image,
  //   })) || []
  // );

  const fillFileList = () =>
    props.images?.map((image) => ({
      uid: Math.random() * 10000 + "",
      name: "image.png",
      status: "done",
      url: image,
    })) || [];
  // [
  //   {
  //     uid: "0",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://ananas.vn/wp-content/uploads/pro_A61102_1-500x500.jpg",
  //   },
  //   {
  //     uid: "1",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://ananas.vn/wp-content/uploads/pro_A61102_2-500x500.jpg",
  //   },
  //   {
  //     uid: "2",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://ananas.vn/wp-content/uploads/pro_A61102_3-500x500.jpg",
  //   },
  //   {
  //     uid: "3",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://ananas.vn/wp-content/uploads/pro_A61102_4-500x500.jpg",
  //   },
  // ]

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [linkImage, setLinkImage] = useState("");

  const onChange = ({ fileList: newFileList }) => {
    // console.log(fileList, newFileList);
    // setFileList(newFileList);
  };

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
    // setFileList((currentState) => [
    //   ...currentState,
    //   {
    //     uid: Math.random() * 1000 + "",
    //     name: "image.png",
    //     status: "done",
    //     url: linkImage,
    //   },
    // ]);
    setLinkImage("");
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
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fillFileList()}
        onChange={onChange}
        onPreview={onPreview}
        openFileDialogOnClick={false}
        beforeUpload={false}
        transformFile={false}
      >
        {props.images && props.images.length < 4 && (
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
              // innerRef={nameRef}
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
