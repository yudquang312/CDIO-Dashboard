import React from "react";
import {
  Modal,
  // message,
  // Popconfirm,
  // Select,
  // Tag,
  // Upload,
  // Form as FormAntd,
} from "antd";
const Image = ({ imageUrl, onDelete }) => {
  const [actionDisplay, setActionDisplay] = React.useState(false);
  const [previewHover, setPreviewHover] = React.useState(false);
  const [removeHover, setRemoveHover] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onPreview = async () => {
    setIsModalVisible(true);
  };

  return (
    <div
      style={{
        display: "inline-block",
        padding: "10px",
        margin: "5px",
        width: "170px",
        height: "170px",
        position: "relative",
        transitionDelay: "0.3s",
        cursor: "pointer",
        border: "1px solid #d9d9d9",
      }}
      onMouseEnter={() => setActionDisplay(true)}
      onMouseLeave={() => setActionDisplay(false)}
    >
      <img
        src={imageUrl}
        alt="cannotLoading"
        width="150"
        height="150"
        loading="lazy"
      ></img>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          display: !actionDisplay ? "none" : "block",
          background: "rgba(0,0,0,0.4)",
          transitionDelay: "0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: !actionDisplay ? "none" : "inline-block",
        }}
      >
        <span style={{ marginRight: "5px" }}>
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="eye"
            width="20px"
            height="20px"
            fill={
              previewHover
                ? "rgba(255, 255, 255, 1)"
                : "rgba(255, 255, 255, 0.8)"
            }
            aria-hidden="true"
            onMouseEnter={() => setPreviewHover(true)}
            onMouseLeave={() => setPreviewHover(false)}
            onClick={onPreview}
          >
            <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
          </svg>
        </span>
        <span style={{ marginLeft: "5px" }}>
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="delete"
            width="20px"
            height="20px"
            fill={
              removeHover
                ? "rgba(255, 255, 255, 1)"
                : "rgba(255, 255, 255, 0.8)"
            }
            aria-hidden="true"
            onMouseEnter={() => setRemoveHover(true)}
            onMouseLeave={() => setRemoveHover(false)}
            onClick={onDelete}
          >
            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
          </svg>
        </span>
      </div>
      <Modal
        title="Avatar"
        visible={isModalVisible}
        onOk={false}
        okText={null}
        onCancel={onCancel}
        width={548}
        footer={null}
      >
        {" "}
        <div
          style={{
            width: 500,
            height: 500,
            backgroundImage: "url(" + imageUrl + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </Modal>
    </div>
  );
};

export default Image;
