const vaults = [
  {
    identifier: 1,
    name: "ETH-A",
    collateral_asset: "ETH",
    collateral_amount: "5.232",
    debt_value: "650",
    collateralization_ratio: "234.21%",
    liquidation_ratio: "150%",
    liquidation_price: "125.1",
    collateral_usd_value: "950.13",
  },
  {
    identifier: 55,
    name: "USDC-A",
    collateral_asset: "USDC",
    collateral_amount: "150",
    debt_value: "50",
    collateralization_ratio: "250.551%",
    liquidation_ratio: "150%",
    liquidation_price: "0.45",
    collateral_usd_value: "150",
  },
];

const vaultDetails = [
  {
    identifier: 1,
    creation_ts: 1589067898,
    total_interest_owed: "0.02341",
    total_liquidated_amount: "0",
    total_liquidated_usd: "0",
    events: [
      {
        event_type: "deposit",
        amount: "5.551",
        timestamp: 1589067899,
        tx_hash:
          "0x678f31d49dd70d76c0ce441343c0060dc600f4c8dbb4cee2b08c6b451b6097cd",
      },
      {
        event_type: "generate",
        amount: "325",
        timestamp: 1589067900,
        tx_hash:
          "0x678f31d49dd70d76c0ce441343c0060dc600f4c8dbb4cee2b08c6b451b6097cd",
      },
    ],
  },
  {
    identifier: 55,
    creation_ts: 1589067897,
    total_interest_owed: "-751.32",
    total_liquidated_amount: "1050.21",
    total_liquidated_usd: "2501.234",
    events: [
      {
        event_type: "deposit",
        amount: "1050.21",
        timestamp: 1589067899,
        tx_hash:
          "0x678f31d49dd70d76c0ce441343c0060dc600f4c8dbb4cee2b08c6b451b6097cd",
      },
      {
        event_type: "generate",
        amount: "721.32",
        timestamp: 1589067900,
        tx_hash:
          "0x678f31d49dd70d76c0ce441343c0060dc600f4c8dbb4cee2b08c6b451b6097cd",
      },
      {
        event_type: "liquidation",
        amount: "500",
        timestamp: 1589068000,
        tx_hash:
          "0x678f31d49dd70d76c0ce441343c0060dc600f4c8dbb4cee2b08c6b451b6097cd",
      },
      {
        event_type: "liquidation",
        amount: "550.21",
        timestamp: 1589068001,
        tx_hash:
          "0x678f31d49dd70d76c0ce441343c0060dc600f4c8dbb4cee2b08c6b451b6097cd",
      },
    ],
  },
];

function createMessage(result) {
  return {
    result,
    message: "",
  };
}

function setupVaults(server) {
  server.get("/api/1/blockchains/ETH/modules/makerdao/vaults", (req, res) => {
    res.jsonp(createMessage(vaults));
  });

  server.get(
    "/api/1/blockchains/ETH/modules/makerdao/vaultdetails",
    (req, res) => {
      res.jsonp(createMessage(vaultDetails));
    }
  );
}

module.exports = { setupVaults };
