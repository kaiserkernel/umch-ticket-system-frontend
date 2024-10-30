import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Canvas from "./canvas";
import Default from "./default";
import StreamingPanopto from "./streaming-panopto";

const CampusIT = () => {
  const [selectedEffect, setSelectedEffect] = useState("default");

  // Define animation variants for each collapse effect
  const variants = {
    default: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 },
      visible: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
    canvas: {
      hidden: { height: 0, opacity: 0, originY: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        originY: 0,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },

    streaming_panopto: {
      hidden: { scaleY: 0, opacity: 0, originY: 1 }, // Starts from bottom
      visible: {
        scaleY: 1,
        opacity: 1,
        originY: 1,
        transition: { duration: 0.5 },
      },
      exit: {
        scaleY: 0,
        opacity: 0,
        originY: 0,
        transition: { duration: 0.5 },
      },
    },
  };

  const content = {
    default: <Default />,
    canvas: <Canvas />,
    streaming_panopto: <StreamingPanopto />,
  };

  return (
    <div className="pt-5">
      <h1 className="mt-2 mt-md-4 mb-0 mb-md-5">Campus IT</h1>
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Group>
            <Form.Label className="input-label">
              Campus IT
              <span className="ms-1 required-label">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedEffect(e.target.value)}
              value={selectedEffect}
              style={{
                appearance: "none", // Hides the default arrow
                MozAppearance: "none", // For Firefox
                WebkitAppearance: "none", // For Safari/Chrome
                backgroundColor: "white",
                color: "gray !important",
                // padding: "8px 12px",
                // border: "1px solid #007bff",
              }}
              className="custom-input"
            >
              <option value="default">– Select –</option>
              <option value="canvas">Canvas</option>
              <option value="streaming_panopto">Streaming / Panopto</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <AnimatePresence mode="wait">
        {selectedEffect === "default" ? (
          <motion.div
            key="default"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.default}
          >
            <div>{content[selectedEffect]}</div>
          </motion.div>
        ) : (
          <motion.div
            key={selectedEffect}
            initial="hidden"
            animate="visible"
            //   exit={selectedEffect === "default" ? "exit" : false}

            variants={variants[selectedEffect] || variants.default}
          >
            <div>{content[selectedEffect]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampusIT;
