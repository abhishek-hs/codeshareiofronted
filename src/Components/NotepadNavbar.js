import React from "react";
import Logo from "../images/logo.svg";
import styled from "styled-components";
import { IoIosPeople } from "react-icons/io";

const SaveButton = styled.button`
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-transform: capitalize;
  outline: none;
  background-color: #ec3360;
  border-color: #ec3360;
  margin: 0 2px;
  margin-left: 5px;
  padding: 2px 10px;
  &:hover,
  &:focus {
    background-color: #ea1c4e;
    border-color: #ea1c4e;
    color: #fff;
  }
`;

const SecondaryButtton = styled.button`
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-transform: capitalize;
  outline: none;
  margin: 0 2px;
  padding: 2px 10px;
  &:hover,
  &:focus {
    background-color: #fff;
    border-color: #fff;
    color: #4d76ba;
    text-decoration: none;
  }
`;

export default function NotepadNavbar() {
  return (
    <div
      className="d-flex notepadnav justify-content-between align-items-center"
      style={{ height: 40 }}
    >
      <img src={Logo} height={18} className="ps-3" />
      <div className="navlink d-flex align-items-center">
        <div className="text-light">Expires in 24 hours</div>
        <SaveButton>Save Codeshare</SaveButton>
        <SecondaryButtton>
          <IoIosPeople size={20} /> Share
        </SecondaryButtton>
        <SecondaryButtton>Log In</SecondaryButtton>
      </div>
    </div>
  );
}
