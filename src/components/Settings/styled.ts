import styled from "styled-components";

export const SettingsContainer = styled.div`
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

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const SettingLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const SettingDesc = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.75rem;
  display: block;
  margin-top: 2px;
`;

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.accent.primary};
  }

  input:checked + span::before {
    transform: translateX(20px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.border.subtle};
  border-radius: 24px;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: "";
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 50%;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
`;

export const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.accent.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 10px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.cardHover};
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const DangerButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.status.danger};
  border-color: ${({ theme }) => theme.colors.status.danger}40;

  &:hover {
    background: ${({ theme }) => theme.colors.status.danger}15;
    border-color: ${({ theme }) => theme.colors.status.danger};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: monospace;
  font-size: 0.8rem;
  resize: vertical;
  box-sizing: border-box;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;
