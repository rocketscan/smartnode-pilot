/* eslint-disable @typescript-eslint/no-namespace */

type Address = string
type DateTime = string

export namespace Minipool {
  export type Status = {
    minipools: Minipool[]
    latestDelegate: Address
  }

  export type Minipool = {
    address: Address
    validatorPubkey: string
    version: number
    status: {
      status: string
      statusBlock: number
      statusTime: DateTime
      isVacant: boolean
    }
    depositType: string
    node: {
      address: Address
      fee: number
      depositBalance: number
      refundBalance: number
      depositAssigned: boolean
    }
    user: {
      depositBalance: number
      depositAssigned: boolean
      depositAssignedTime: DateTime
    }
    balances: {
      eth: number
      reth: number
      rpl: number
      fixedSupplyRpl: number
    }
    nodeShareOfEthBalance: number
    validator: {
      exists: boolean
      active: boolean
      index: string
      balance: number
      nodeBalance: number
    }
    canStake: boolean
    canPromote: boolean
    queue: {
      Position: number
    }
    refundAvailable: boolean
    withdrawalAvailable: boolean
    closeAvailable: boolean
    finalised: boolean
    useLatestDelegate: boolean
    delegate: Address
    previousDelegate: Address
    effectiveDelegate: Address
    timeUntilDissolve: number
    penalties: number
    reduceBondTime: Date
    reduceBondCancelled: boolean
  }
}

export namespace Node {
  export type Balance = {
    balance: number
  }

  export type Collateral = {
    ethMatched: number
    ethMatchedLimit: number
    pendingMatchAmount: number
    insufficientCollateral: boolean
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  export type RewardsInfo = {
    claimedIntervals: any
    unclaimedIntervals: any
    invalidIntervals: any
    rplStake: number
    rplPrice: number
    activeMinipools: number
    effectiveRplStake: number
    minimumRplStake: number
    ethMatched: number
    ethMatchedLimit: number
    pendingMatchAmount: number
    borrowedCollateralRatio: number
    bondedCollateralRatio: number
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  export type Status = {
    warning: string
    accountAddress: Address
    accountAddressFormatted: string
    primaryWithdrawalAddress: Address
    primaryWithdrawalAddressFormatted: string
    pendingWithdrawalAddress: Address
    pendingWithdrawalAddressFormatted: string
    isRplWithdrawalAddressSet: boolean
    rplWithdrawalAddress: Address
    rplWithdrawalAddressFormatted: string
    pendingRplWithdrawalAddress: Address
    pendingRplWithdrawalAddressFormatted: string
    isRplLockingAllowed: boolean
    rplLocked: number
    registered: boolean
    trusted: boolean
    timezoneLocation: string
    nodeBalances: {
      eth: number
      reth: number
      rpl: number
      fsrpl: number
    }
    primaryWithdrawalBalances: {
      eth: number | null
      reth: number | null
      rpl: number | null
      fsrpl: number | null
    }
    rplWithdrawalBalances: {
      eth: number | null
      reth: number | null
      rpl: number | null
      fsrpl: number | null
    }
    rplStake: number
    effectiveRplStake: number
    minimumRplStake: number
    maximumRplStake: number
    maximumStakeFraction: number
    borrowedCollateralRatio: number
    bondedCollateralRatio: number
    pendingEffectiveRplStake: number
    pendingMinimumRplStake: number
    pendingMaximumRplStake: number
    pendingBorrowedCollateralRatio: number
    pendingBondedCollateralRatio: number
    votingDelegate: Address
    votingDelegateFormatted: string
    isVotingInitialized: boolean
    onchainVotingDelegate: Address
    onchainVotingDelegateFormatted: string
    minipoolLimit: number
    ethMatched: number
    ethMatchedLimit: number
    pendingMatchAmount: number
    creditBalance: number
    creditAndEthOnBehalfBalance: number
    ethOnBehalfBalance: number
    usableCreditAndEthOnBehalfBalance: number
    minipoolCounts: {
      total: number
      initialized: number
      prelaunch: number
      staking: number
      withdrawable: number
      dissolved: number
      refundAvailable: number
      finalised: number
    }
    isFeeDistributorInitialized: boolean
    feeRecipientInfo: {
      smoothingPoolAddress: Address
      feeDistributorAddress: Address
      isInSmoothingPool: false
      isInOptOutCooldown: false
      optOutEpoch: number
    }
    feeDistributorBalance: number
    penalizedMinipools: any
    snapshotResponse: {
      error: string
      activeSnapshotProposals: any | null
    }
    alerts: any | null
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export namespace ProtocolDAO {
  export type Delegate = {
    accountAddress: Address
    votingDelegate: Address
  }

  export type VotingPower = {
    votingPower: number
    onchainVotingDelegate: Address
    onchainVotingDelegateFormatted: string
    blockNumber: number
  }

  export type Proposals = {
    proposals: Proposal[]
  }

  export type Proposal = {
    id: number
    proposerAddress: Address
    targetBlock: number
    message: string
    challengeWindow: number
    createdTime: DateTime
    votingStartTime: DateTime
    phase1EndTime: DateTime
    phase2EndTime: DateTime
    expiryTime: DateTime
    votingPowerRequired: number
    votingPowerFor: number
    votingPowerAgainst: number
    votingPowerAbstained: number
    votingPowerToVeto: number
    isDestroyed: boolean
    isFinalized: boolean
    isExecuted: boolean
    isVetoed: boolean
    payload: string
    payloadStr: string
    state: number
    proposalBond: number
    challengeBond: number
    defeatIndex: number
    nodeVoteDirection: number
  }
}

export namespace Service {
  export type ClientStatus = {
    ecManagerStatus: {
      primaryEcStatus: {
        isWorking: boolean
        isSynced: boolean
        syncProgress: number
        networkId: number
        error: string
      }
      fallbackEnabled: boolean
      fallbackEcStatus: {
        isWorking: boolean
        isSynced: boolean
        syncProgress: number
        networkId: number
        error: string
      }
    }
    bcManagerStatus: {
      primaryEcStatus: {
        isWorking: boolean
        isSynced: boolean
        syncProgress: number
        networkId: number
        error: string
      }
      fallbackEnabled: boolean
      fallbackEcStatus: {
        isWorking: boolean
        isSynced: boolean
        syncProgress: number
        networkId: number
        error: string
      }
    }
  }

  export type Config = {
    config: {
      isNative: boolean
      smartNode: {
        localExecution: {
          executionClient: string
        }
        localBeacon: {
          beaconNode: string
        }
      }
      version: string
    }
  }

  export type Version = {
    version: string
  }
}
