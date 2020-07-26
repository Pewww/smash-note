import styled from 'styled-components';

export const StyledNote = styled.button`
  padding: 8px 8px 5px 8px;
  border-radius: 10px;
  margin-bottom: 10px;

  img {
    width: 46px;
  }

  @media all and (max-height: 710px) {
    img {
      width: 40px;
    }
  }
`;
