import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

import wrapper from "../store/configureStore";

const reactSNS = ({ Component }) => {
  return (
    <>
      <Head>
        <title>reactSNS</title>
      </Head>
      <Component />
    </>
  );
};

reactSNS.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(reactSNS);
