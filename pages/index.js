import Head from "next/head";
import styled from "styled-components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hey, here's an awesome app to learn languages</title>
      </Head>
      <Content>
        <h2>Create, organize, share</h2>
        That's will be a beautiful home page
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h2 {
    margin-bottom: 6px;
  }
`;
