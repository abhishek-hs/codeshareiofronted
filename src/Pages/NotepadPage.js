import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import NotepadNavbar from "../Components/NotepadNavbar";
import SideNavbar from "../Components/SideNavbar";
import { useParams } from "react-router-dom";
import VideoCall from "../Components/VideoCall";
import { SocketContext } from "../Components/SocketContext";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const Textarea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  caret-color: #fff;
  line-height: 15pt;
  margin-right: 30px;
  bottom: 0;
  color: transparent;
  background: transparent;
  overflow-y: scroll;
  z-index: 10;
`;

const CodePadDiv = styled.div`
  background: #090300;
  color: #fff;
  line-height: 15pt;
  white-space: pre-wrap;
  position: absolute;
  top: 0;
  margin-right: 30px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow-y: scroll;
  z-index: 0;
`;

export default function NotepadPage() {
  const [textAreaValue, settextAreaValue] = useState("");
  const [SelectedLanguage, setSelectedLanguage] = useState("javascript");
  const { gropid } = useParams();
  const rightDivRef = useRef();
  const leftDivRef = useRef();
  const codePad = useRef();
  const { socketRef,fontSizeProvider } = useContext(SocketContext);

  useEffect(() => {
    socketRef.current?.on("send dataTextValue", (data) => {
      if(data.message){
      HighLighttext(data.message);
      settextAreaValue(data.message);
      }
    });
  }, []);

  const HighLighttext = (valueforHighlight = textAreaValue) => {
    try {
      const highVal = hljs.highlight(valueforHighlight, {
        language: SelectedLanguage,
      }).value;
      codePad.current.innerHTML = highVal;
    } catch (e) {
      alert("This Langage Not available");
    }
  };

  useEffect(() => {
    HighLighttext();
  }, [SelectedLanguage]);

  return (
    <>
      <NotepadNavbar />
      <div className="d-flex" style={{ height: "calc(100vh - 40px)" }}>
        <div
          style={{
            overflow: "scroll",
            textAlign: "end",
            width: 30,
            background: "#090300",
            color: "#5c5855",
            lineHeight: "15pt",
            paddingRight: 5,
          }}
          id="left"
          ref={leftDivRef}
          className="HideScrollBar d-flex flex-column"
        >
          {textAreaValue.split("\n").map((item, index) => (
            <div style={{fontSize:fontSizeProvider}} key={index}>{index + 1}</div>
          ))}
        </div>
        <div className="position-relative  w-100">
          <Textarea
            placeholder="Write or paste code here then share. Anyone you share with will see code as it is typed!"
            ref={rightDivRef}
            value={textAreaValue}
            style={{fontSize:fontSizeProvider}}
            onChange={({ target }) => {
              var value = target.value;
              socketRef.current.emit("receive dataText", {
                data: target.value,
                roomID: gropid,
              });
              settextAreaValue(value);
              if (value[value.length - 1] === "\n") {
                value += " ";
              }
              HighLighttext(value);
              codePad.current.scrollTop = target.scrollTop;
            }}
            onScroll={({ target }) => {
              leftDivRef.current.scrollTop = target.scrollTop;
              codePad.current.scrollTop = target.scrollTop;
            }}
            id="CodePadTextArea"
          ></Textarea>

          <CodePadDiv style={{fontSize:fontSizeProvider}} id="CodePadDiv" ref={codePad}></CodePadDiv>
        </div>
        <VideoCall />
        <SideNavbar setSelectedLanguage={setSelectedLanguage} />
      </div>
    </>
  );
}
