import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  padding: 0.2rem;
  transition: background-color 0.3s;

  :hover {
    background: rgba(0,0,0,0.05);
    cursor: pointer;
    border-radius: 0.25rem;
  }
`;
export const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Image = styled.img`
  height: 5.5rem;
  width: 5.5rem;
  object-fit: cover;
  border-radius: 0.25rem;
  box-shadow: 0.35rem 0.25rem rgba(0, 0, 0, 0.2);

  margin-right: 1.8rem;
`;
export const BusinessHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.85rem;
`;
export const Title = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 1rem;
`;
export const Status = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: #1EBF1B;
  border-radius: 0.5rem;

`;

export const OwnerName = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
`;
export const TypeBusiness = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
`;

export const Address = styled.div`
  margin-top: 0.6rem;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
`;
export const BusinessIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 24rem;

  svg {
    font-size: 1.5rem;
    color: #616161;
    font-weight: 500;

    :hover {
      cursor: pointer;

      :nth-child(1) {
        color: #1EBF1B;
      }

      :nth-child(2) {
        color: #547DE5;
      }

      :nth-child(3) {
        color: #EB1B2E;
      }
    }

  }
`;
