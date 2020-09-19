import styled from "styled-components";

export default function BC({ menu, itemSelect }) {
  return (
    <BreadCrumbs>
      {menu.map((item, index) => {
        return (
          <Item
            key={index}
            onClick={() => {
              itemSelect(index);
            }}
          >
            {item.name}
            {index !== menu.length - 1 && " / "}
          </Item>
        );
      })}
    </BreadCrumbs>
  );
}

const BreadCrumbs = styled.menu`
  display: flex;
`;

const Item = styled.div`
  cursor: pointer;
  margin-right: 4px;
  color: ${(props) => props.theme.color3};
  &:last-child {
    color: ${(props) => props.theme.color1};
  }
`;
