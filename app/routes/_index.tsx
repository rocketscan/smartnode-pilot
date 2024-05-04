import { json, useLoaderData } from '@remix-run/react'
import { load } from '~/loader.server'

export async function loader() {
  return json({
    auction: {
      lots: await load('/auction/lots'),
      status: await load('/auction/status')
    },
    minipool: {
      closeDetails: await load('/minipool/close/details'),
      delegateDetails: await load('/minipool/delegate/details'),
      dissolveDetails: await load('/minipool/dissolve/details'),
      distributeDetails: await load('/minipool/distribute/details'),
      exitDetails: await load('/minipool/exit/details'),
      promoteDetails: await load('/minipool/promote/details'),
      reduceBondDetails: await load('/minipool/reduce-bond/details'),
      refundDetails: await load('/minipool/refund/details'),
      rescueDissolvedDetails: await load('/minipool/rescue-dissolved/details'),
      stakeDetails: await load('/minipool/stake/details'),
      status: await load('/minipool/status')
    },
    network: {
      daoProposals: await load('/network/dao-proposals'),
      latestDelegate: await load('/network/latest-delegate'),
      depositContractInfo: await load('/network/deposit-contract-info'),
      nodeFee: await load('/network/node-fee'),
      rplPrice: await load('/network/rpl-price'),
      stats: await load('/network/stats'),
      timezones: await load('/network/timezone-map')
    },
    node: {
      balance: await load('/node/balance'),
      collateral: await load('/node/check-collateral'),
      // rewards: await load('/node/rewards'),
      rewardsInfo: await load('/node/get-rewards-info'),
      snapshotProposals: await load('/node/get-snapshot-proposals'),
      status: await load('/node/status')
    },
    odao: {
      members: await load('/odao/members'),
      proposals: await load('/odao/proposals'),
      settings: await load('/odao/settings'),
      status: await load('/odao/status')
    },
    pdao: {
      delegate: await load('/pdao/voting-delegate'),
      claimableBonds: await load('/pdao/get-claimable-bonds'),
      votingPower: await load('/pdao/get-voting-power'),
      rewardsPercentages: await load('/pdao/rewards-percentages'),
      settings: await load('/pdao/settings')
      //proposals: await load('/pdao/proposals')
    },
    queue: {
      status: await load('/queue/status')
    },
    security: {
      members: await load('/security/members'),
      proposals: await load('/security/proposals'),
      status: await load('/security/status')
    },
    service: {
      clientStatus: await load('/service/client-status'),
      version: await load('/service/version')
    },
    wallet: {
      export: await load('/wallet/export'),
      exportEthKey: await load('/wallet/export-eth-key'),
      status: await load('/wallet/status')
    }
  })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="m-8 space-y-5">
      <h1 className="font-bold text-3xl">Rocketscan Smart Node v2 Pilot</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}
