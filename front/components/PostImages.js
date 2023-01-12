import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

const PostImages = ({ images }) => {
  return (
    <>
      <img
        width="100%"
        height="100%"
        style={{ objectFit: "cover", justifyContent: "center" }}
        alt="logo"
        src={`http://localhost:3065/${images[0].src}`}
      />
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
