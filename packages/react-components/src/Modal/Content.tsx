// Copyright 2017-2024 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { styled } from '../styled.js';

interface Props {
  className?: string;
  children: React.ReactNode;
}

function Content ({ children, className = '' }: Props): React.ReactElement<Props> {
  return (
    <StyledDiv className={`${className} ui--Modal-Content`}>
      {children}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export default React.memo(Content);
