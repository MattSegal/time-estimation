import styled from '@emotion/styled';

const HomePage = () => {
  return (
    <Container>
      <h1>Time Estimation</h1>
    </Container>
  );
};

export default HomePage;



const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  
  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

