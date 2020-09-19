import styled from "styled-components";

export default function ThemeSwitcher({ theme, themeChange }) {
  return (
    <ThemeSwitch>
      {Object.keys(theme).map((item, index) => {
        return (
          <Item key={index}>
            <p>{item} : </p>
            <input
              value={theme[item]}
              onChange={(ev) => {
                let newTab = { ...theme };
                newTab[item] = ev.target.value;
                themeChange(newTab);
              }}
            />
          </Item>
        );
      })}
    </ThemeSwitch>
  );
}

const ThemeSwitch = styled.div`
  position: fixed;
  right: 0px;
  top: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;
