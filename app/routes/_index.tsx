import { useLoaderData } from '@remix-run/react'

import type * as API from '~/api'
import { load } from '~/api/loader.server'

import {
  Address,
  Card,
  Date,
  Detail,
  Details,
  ETH,
  Minidetail,
  Minidetails,
  Number,
  RPL,
  Section,
  Stack,
  Stat,
  StatGroup,
  Table,
  Timezone
} from '~/components'

export async function loader() {
  return {
    minipool: {
      status: await load<API.Minipool.Status>('/minipool/status')
    },
    node: {
      balance: await load<API.Node.Balance>('/node/balance'),
      collateral: await load<API.Node.Collateral>('/node/check-collateral'),
      rewardsInfo: await load<API.Node.RewardsInfo>('/node/get-rewards-info'),
      status: await load<API.Node.Status>('/node/status')
    },
    pdao: {
      delegate: await load<API.ProtocolDAO.Delegate>('/pdao/voting-delegate'),
      votingPower: await load<API.ProtocolDAO.VotingPower>('/pdao/get-voting-power'),
      proposals: (await load<API.ProtocolDAO.Proposals>('/pdao/proposals')).proposals
    },
    service: {
      clientStatus: await load<API.Service.ClientStatus>('/service/client-status'),
      config: (await load<API.Service.Config>('/service/get-config')).config,
      version: await load<API.Service.Version>('/service/version')
    }
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  console.log(data)

  return (
    <Stack>
      <StatGroup>
        <Stat title="ETH">
          <ETH>{data.node.status.nodeBalances.eth}</ETH>
        </Stat>
        <Stat title="RPL">
          <RPL>{data.node.status.nodeBalances.rpl}</RPL>
        </Stat>
      </StatGroup>
      <Section title="Service">
        <StatGroup>
          <Stat title="Execution Client">{data.service.config.smartNode.localExecution.executionClient}</Stat>
          <Stat title="Beacon Client">{data.service.config.smartNode.localBeacon.beaconNode}</Stat>
          <Stat title="Smart Node">v{data.service.version.version}</Stat>
        </StatGroup>
      </Section>
      <Details title="Node">
        <Detail title="Address">{data.node.status.accountAddress}</Detail>
        <Detail title="Withdrawal Address">
          <Minidetails>
            <Minidetail title="Primary">
              <Address>{data.node.status.primaryWithdrawalAddress}</Address>
            </Minidetail>
            <Minidetail title="RPL">
              <Address>{data.node.status.rplWithdrawalAddress}</Address>
            </Minidetail>
          </Minidetails>
        </Detail>
        <Detail title="Fee Distributor">
          <p>
            <Address>{data.node.status.feeRecipientInfo.feeDistributorAddress}</Address>
          </p>
          <p>
            Balance: <ETH>{data.node.status.feeDistributorBalance}</ETH>
          </p>
        </Detail>
        <Detail title="Timezone">
          <Timezone>{data.node.status.timezoneLocation}</Timezone>
        </Detail>
        <Detail title="Smoothing Pool">
          {data.node.status.feeRecipientInfo.isInSmoothingPool ? 'Enabled' : 'Disabled'}
        </Detail>
        <Detail title="Minipool Count">
          <Number>{data.node.rewardsInfo.activeMinipools}</Number>
        </Detail>
        <Detail title="ETH">
          <Minidetails>
            <Minidetail title="Borrowed">
              <ETH>{data.node.collateral.ethMatched}</ETH>
            </Minidetail>
          </Minidetails>
        </Detail>
        <Detail title="Credit">
          <ETH>{data.node.status.creditBalance}</ETH>
        </Detail>
        <Detail title="RPL Staked">
          <Minidetails>
            <Minidetail title="Total">
              <RPL>{BigInt(data.node.rewardsInfo.rplStake)}</RPL>
            </Minidetail>
            <Minidetail title="Effective">
              <RPL>{BigInt(data.node.rewardsInfo.effectiveRplStake)}</RPL>
            </Minidetail>
            <Minidetail title="Minimum">
              <RPL>{BigInt(data.node.rewardsInfo.minimumRplStake)}</RPL>
            </Minidetail>
          </Minidetails>
        </Detail>
      </Details>
      <Section title="Minipools">
        <Table
          rows={[...data.minipool.status.minipools].reverse()}
          columns={[
            { title: 'Address', value: m => <Address>{m.address}</Address> },
            { title: 'Status', value: m => m.status.status },
            { title: 'Deposit', value: m => <ETH>{m.node?.depositBalance}</ETH> },
            { title: 'Fee', value: m => <Number perc>{m.node?.fee}</Number> },
            { title: 'Created', value: m => <Date time={true}>{m.user.depositAssignedTime}</Date> }
          ]}
        />
      </Section>
      <Section title="Protocol DAO">
        <Stack>
          <StatGroup>
            <Stat title="Voting Power">
              <RPL>{data.pdao.votingPower.votingPower}</RPL>
            </Stat>
            <Stat title="Delegate">
              <Address truncate={true}>{data.pdao.delegate.votingDelegate}</Address>
            </Stat>
            <Stat title="Locked RPL">
              <RPL>{data.node.status.rplLocked}</RPL>
            </Stat>
          </StatGroup>
          <Card title="Proposals">
            <Table
              rows={[...data.pdao.proposals].reverse()}
              columns={[
                { title: 'ID', value: p => p.id },
                { title: 'State', value: p => <ProtocolDAOProposalState>{p.state}</ProtocolDAOProposalState> },
                { title: 'Message', value: p => p.message },
                { title: 'Start', value: p => <Date time={true}>{p.votingStartTime}</Date> }
              ]}
            />
          </Card>
        </Stack>
      </Section>
    </Stack>
  )
}

function ProtocolDAOProposalState({ children: state }: { children?: number }) {
  if (!state && state !== 0) return null
  if (state === 0) return <>Pending</>
  if (state === 1) return <>Active (phase 1)</>
  if (state === 2) return <>Active (phase 2)</>
  if (state === 3) return <>Destroyed</>
  if (state === 4) return <>Vetoed</>
  if (state === 5) return <>Quorum not met</>
  if (state === 6) return <>Defeated</>
  if (state === 7) return <>Suceeded</>
  if (state === 8) return <>Expired</>
  if (state === 9) return <>Executed</>
  return <>Unknown</>
}
