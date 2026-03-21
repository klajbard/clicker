import styled from "styled-components";

export const StatsContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Section = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
    padding-bottom: 12px;
    margin-bottom: 8px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

export const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 0.9rem;
  font-weight: 600;
`;
