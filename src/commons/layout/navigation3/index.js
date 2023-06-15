import styled from '@emotion/styled';

const PageWrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 97vh;
  overflow-y: hidden;
`;

const Header = styled.header`
  background-color: #333;
  padding: 1rem;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  flex-grow: 1;
  max-width: calc(100% - 200px);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-size: 1.5rem;
`;

const TestBox = styled.div`
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.2rem;
  text-align: center;
  color: #333;
  margin-top: 1rem;
`;

export default function HomePage() {
  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title>ex) 핸드라이팅 연습</Title>
          <TestBox>핸드라이팅 연습</TestBox>
        </Header>
        <Content>
          <Heading>Welcome to My Website</Heading>
          <Subheading>Enjoy the beautiful design and functionality!</Subheading>
        </Content>
      </Container>
    </PageWrapper>
  );
}