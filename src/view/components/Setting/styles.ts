import { css } from '@emotion/react';

export const actionContainerStyles = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;

  .float-left {
    flex: 1;
  }

  .locale-select {
    float: right;
  }
`;
