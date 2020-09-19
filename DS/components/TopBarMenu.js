import styled from "styled-components";

export default function TMB({ itemsLeft, itemsRight, selection, select }) {
  return (
    <TopBarMenu>
      <ItemsBloc>
        {itemsLeft &&
          itemsLeft.map((item, index) => {
            return (
              <div key={index}>
                <Item
                  onClick={() => {
                    select({ part: "left", index });
                  }}
                >
                  {item.name}
                </Item>
                {selection.part === "left" && selection.index === index && (
                  <SelectedBar />
                )}
              </div>
            );
          })}
      </ItemsBloc>
      <ItemsBloc>
        {itemsRight &&
          itemsRight.map((item, index) => {
            return (
              <div key={index}>
                <Item
                  onClick={() => {
                    select({ part: "right", index });
                  }}
                >
                  {item.name}
                </Item>
                {selection.part === "right" && selection.index === index && (
                  <SelectedBar />
                )}
              </div>
            );
          })}
      </ItemsBloc>
      <ProgressionBar />
    </TopBarMenu>
  );
}

const TopBarMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  position: relative;
`;

const ProgressionBar = styled.div`
  width: 100%;
  height: 2px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color3};
  position: absolute;
  bottom: 0px;
`;

const ItemsBloc = styled.div`
  display: flex;
`;

const Item = styled.div`
  cursor: pointer;
  font-size: 0.8em;
  min-width: 85px;
  padding: 0px 5px;
  text-align: center;
  position: relative;
`;

const SelectedBar = styled.div`
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 95px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color2};
  z-index: 99;
`;
