import { useEffect } from "react";
import styled from "styled-components";

export default function SB({ placeholder, value, change, enter }) {
  const enterPress = (ev) => {
    if (ev.key === "Enter") {
      enter();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (ev) => enterPress(ev));

    return document.removeEventListener("keydown", (ev) => enterPress(ev));
  });

  return (
    <SearchBar>
      <Input
        id="searchBar"
        placeholder={placeholder}
        value={value}
        onChange={(ev) => {
          change(ev.target.value);
        }}
      />
      <Icon src="/assets/search.svg" alt="search bar" />
    </SearchBar>
  );
}

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px ${(props) => props.theme.color2};
  justify-content: space-between;
  width: 288px;
  padding: 5px 10px;
  border-radius: 4px;
`;

const Input = styled.input``;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;
