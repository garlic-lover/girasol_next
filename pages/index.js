import Head from "next/head";
import styled from "styled-components";

export default function Home() {
  /* useEffect(() => {
    if (process.browser) {
      import("locomotive-scroll").then((locomotiveModule) => {
        console.log(locomotiveModule);
        const scroll = new locomotiveModule.default({
          el: document.querySelector("[data-scroll-container]"),
          smooth: true,
        });
      });
    }
  }, []); */

  return (
    <div>
      <Head>
        <title>Hey, here's an awesome app to learn languages</title>
      </Head>
      <Wrapper data-scroll-container>
        <First data-scroll-section>
          <h2>Create, organize, share</h2>
          <p>That will be a beautiful home page</p>
        </First>
        <Second>
          <PriceCard>
            <h4>Formule gratuite</h4>
            <ul>
              <li>Création d'exercices</li>
              <li>Création de ressources sauf audio</li>
              <li>Partage par lien</li>
            </ul>
            <h5>0€/mois</h5>
          </PriceCard>
          <PriceCard>
            <h4>Formule 1</h4>
            <ul>
              <li>Création d'exercices</li>
              <li>Création de ressources sauf audio</li>
              <li>Partage par lien</li>
            </ul>
            <h5>0€/mois</h5>
          </PriceCard>
          <PriceCard>
            <h4>Formule 2</h4>
            <ul>
              <li>Création d'exercices</li>
              <li>Création de ressources sauf audio</li>
              <li>Partage par lien</li>
            </ul>
            <h5>0€/mois</h5>
          </PriceCard>
        </Second>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  height: 400vh;
`;

const First = styled.div`
  display: flex;
  height: calc(100vh - 220px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h2 {
    margin-bottom: 6px;
  }
`;

const Second = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin: auto;
  margin-top: 100px;
`;

const PriceCard = styled.div`
  flex: 1;
  margin-right: 12px;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  align-self: start;
  background-color: ${(props) => (props.unconfirmed ? "white" : "white")};
  color: ${(props) => (props.unconfirmed ? "lightgrey" : "")};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  transition: ease-in-out 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 38px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
  }
  & h4 {
    font-size: 1rem;
    text-align: center;
    width: 85%;
    border-bottom: solid 1px;
    padding-bottom: 12px;
    margin-bottom: 16px;
    color: ${(props) => props.theme.color2};
  }
  & ul {
    text-align: center;
  }
  & ul li {
    margin-bottom: 12px;
    font-size: 0.9rem;
  }
  & h5 {
    font-size: 1.5rem;
    margin-top: 12px;
    color: ${(props) => props.theme.color2};
  }
`;
