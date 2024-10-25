// Copyright 2017-2024 @polkadot/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/api-augment/substrate';

import type { ParaId } from '@polkadot/types/interfaces';

import React from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useApi, useCall } from '@polkadot/react-hooks';

import Auctions from './Auctions/index.js';
import Crowdloan from './Crowdloan/index.js';
import Overview from './Overview/index.js';
import Parathreads from './Parathreads/index.js';
import Proposals from './Proposals/index.js';
import useActionsQueue from './useActionsQueue.js';
import useAuctionInfo from './useAuctionInfo.js';
import useFunds from './useFunds.js';
import useLeasePeriod from './useLeasePeriod.js';
import useOwnedIds from './useOwnedIds.js';
import useProposals from './useProposals.js';
import useUpcomingIds from './useUpcomingIds.js';
import useWinningData from './useWinningData.js';

interface Props {
  basePath: string;
  className?: string;
}

function ParachainsApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const { pathname } = useLocation();
  const auctionInfo = useAuctionInfo();
  const campaigns = useFunds();
  const leasePeriod = useLeasePeriod();
  const ownedIds = useOwnedIds();
  const winningData = useWinningData(auctionInfo);
  const proposals = useProposals();
  const actionsQueue = useActionsQueue();
  const upcomingIds = useUpcomingIds();
  const paraIds = useCall<ParaId[]>(api.query.paras.parachains);

  return (
    <main className={className}>
      <Routes>
        <Route path={basePath}>
          <Route
            element={
              <Auctions
                auctionInfo={auctionInfo}
                campaigns={campaigns}
                ownedIds={ownedIds}
                winningData={winningData}
              />
            }
            path='auctions'
          />
          <Route
            element={
              <Crowdloan
                auctionInfo={auctionInfo}
                campaigns={campaigns}
                leasePeriod={leasePeriod}
                ownedIds={ownedIds}
              />
            }
            path='crowdloan'
          />
          <Route
            element={
              <Proposals proposals={proposals} />
            }
            path='proposals'
          />
        </Route>
      </Routes>
      <Overview
        actionsQueue={actionsQueue}
        className={pathname === basePath ? '' : '--hidden'}
        leasePeriod={leasePeriod}
        paraIds={paraIds}
        proposals={proposals}
        threadIds={upcomingIds}
      />
      <Parathreads
        actionsQueue={actionsQueue}
        className={pathname === `${basePath}/parathreads` ? '' : '--hidden'}
        ids={upcomingIds}
        leasePeriod={leasePeriod}
        ownedIds={ownedIds}
      />
    </main>
  );
}

export default React.memo(ParachainsApp);
