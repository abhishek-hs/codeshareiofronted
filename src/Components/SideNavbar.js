import React, { useState, useContext } from "react";
import {
  IoMdSettings,
  IoMdVideocam,
  IoIosInformationCircle,
} from "react-icons/io";
import { FaDownload, FaPlus,FaSearchMinus,FaSearchPlus } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Components/SocketContext";
import { IoClose } from "react-icons/io5";
import { MdOutlineCallEnd } from "react-icons/md";

const TopIcon = styled.div`
  display: block;
  padding: 7px 15px;
  border: none;
  border-bottom: 1px solid #222;
  color: ${({ active }) => (active ? "#555" : "hsla(0, 0%, 100%, 0.6)")};
  font-size: 24px;
  width: 100%;
  cursor: pointer;
  background: ${({ active, index }) =>
    active && index === 0 ? "#fff" : "none"};
  &:hover {
    color: ${({ active, index }) => (active && index === 0 ? "#555" : "#fff")};
  }
`;

const SideNavWrap = styled.div`
  background: #30353e;
  position: relative;
`;

const BottomIcon = styled.div`
  position: absolute;
  bottom: 0;
  display: block;
  padding: 0 15px;
  line-height: 50px;
  border: none;
  border-top: 1px solid #222;
  color: hsla(0, 0%, 100%, 0.6);
  background: none;
  font-size: 18px;
  width: 100%;
`;

const SideNavSubDrawer = styled.div`
  width: 250px;
  padding: 20px;
  background: "#fff";
  display: ${(props) => (props.active ? "block" : "none")};
`;

export default function SideNavbar({ setSelectedLanguage }) {
  const [drawerOPen, setdrawerOPen] = useState(false);
  const Navigate = useNavigate();
  const { VideoCallStart, CallOnline, VideoCallEnd ,setfontSizeProvider} =
    useContext(SocketContext);

  return (
    <>
      <SideNavWrap>
        {[
          {
            icons: <IoMdSettings size={16}  />,
            onClick: () => setdrawerOPen(true),
            tooltip: "Editor settings",
          },
          {
            icons: CallOnline ? <MdOutlineCallEnd size={16}/> : <IoMdVideocam size={16}  />,
            tooltip: "Start Videochat",
            onClick: () => (CallOnline ? VideoCallEnd() : VideoCallStart()),
          },
          { icons: <FaDownload size={16}  />, tooltip: "Download" },
          {
            icons: <FaPlus size={16}  />,
            onClick: () => {
              Navigate(`/${(Math.random() + 1).toString(36).substring(6)}`);
              window.location.reload(true);
            },
            tooltip: "Create New Codeshare",
          },
          {
            icons:<FaSearchPlus size={16}  />,
             onClick: () => {
              setfontSizeProvider(old=>old+=1)
            },
            tooltip: "increase Font Size",
          },{
            icons:<FaSearchMinus size={16}  />,
            onClick: () => {
              setfontSizeProvider(old=>old-=1)
            },
            tooltip: "decrease Font Size",
          }
        ].map((item, index) => (
          <TopIcon
            key={index}
            active={drawerOPen}
            index={index}
            className="custom-tooltip"
            onClick={item.onClick}
          >
            {item?.icons}
            <span className="tooltiptext">{item?.tooltip}</span>
          </TopIcon>
        ))}
        <BottomIcon>
          <IoIosInformationCircle />
        </BottomIcon>
      </SideNavWrap>
      <SideNavSubDrawer active={drawerOPen}>
        <div className="d-flex justify-content-between">
          <h3 style={{ fontWeight: 200 }}>Settings</h3>
          <IoClose
            style={{ cursor: "pointer" }}
            onClick={() => setdrawerOPen(false)}
          />
        </div>
        <div>
          <div className="form-field">
            <label htmlFor="modeName">Syntax</label>
            <select
              name="modeName"
              className="w-100"
              type="select"
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="C++">C++</option>
              <option value="Clojure">Clojure</option>
              <option value="CMake">CMake</option>
              <option value="CSS">CSS</option>
              <option value="D">D</option>
              <option value="Dart">Dart</option>
              <option value="diff">diff</option>
              <option value="Django">Django</option>
              <option value="Dockerfile">Dockerfile</option>
              <option value="Dylan">Dylan</option>
              <option value="EBNF">EBNF</option>
              <option value="Elm">Elm</option>
              <option value="F#">F#</option>
              <option value="Gherkin">Gherkin</option>
              <option value="Go">Go</option>
              <option value="Groovy">Groovy</option>
              <option value="HAML">HAML</option>
              <option value="Haxe">Haxe</option>
              <option value="HTML">HTML</option>
              <option value="HTTP">HTTP</option>
              <option value="HXML">HXML</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="JSON">JSON</option>
              <option value="Kotlin">Kotlin</option>
              <option value="LaTeX">LaTeX</option>
              <option value="LESS">LESS</option>
              <option value="LiveScript">LiveScript</option>
              <option value="Lua">Lua</option>
              <option value="Markdown">Markdown</option>
              <option value="Mathematica">Mathematica</option>
              <option value="Nginx">Nginx</option>
              <option value="Objective C">Objective-C</option>
              <option value="OCaml">OCaml</option>
              <option value="PGP">PGP</option>
              <option value="PHP">PHP</option>
              <option value="PlainText">Plain Text</option>
              <option value="PowerShell">PowerShell</option>
              <option value="Puppet">Puppet</option>
              <option value="Python">Python</option>
              <option value="Q">Q</option>
              <option value="R">R</option>
              <option value="Ruby">Ruby</option>
              <option value="Rust">Rust</option>
              <option value="SAS">SAS</option>
              <option value="Scala">Scala</option>
              <option value="Scheme">Scheme</option>
              <option value="SCSS">SCSS</option>
              <option value="Shell">Shell</option>
              <option value="Smalltalk">Smalltalk</option>
              <option value="SQL">SQL</option>
              <option value="Swift">Swift</option>
              <option value="Tcl">Tcl</option>
              <option value="TOML">TOML</option>
              <option value="Tornado">Tornado</option>
              <option value="troff">troff</option>
              <option value="Twig">Twig</option>
              <option value="VBScript">VBScript</option>
              <option value="Verilog">Verilog</option>
              <option value="XQuery">XQuery</option>
              <option value="YAML">YAML</option>
            </select>
          </div>
        </div>
      </SideNavSubDrawer>
    </>
  );
}
