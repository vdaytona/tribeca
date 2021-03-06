import Utils = require("./utils");
import Models = require("../share/models");

export interface IExchangeDetailsGateway {
    name(): string;
    makeFee(): number;
    takeFee(): number;
    exchange(): Models.Exchange;
    minTickIncrement: number;
    minSize: number;
    hasSelfTradePrevention: boolean;
}

export interface IGateway {
    ConnectChanged: Utils.Evt<Models.ConnectivityStatus>;
}

export interface IBrokerConnectivity {
    connectStatus: Models.ConnectivityStatus;
    ConnectChanged: Utils.Evt<Models.ConnectivityStatus>;
}

export interface IMarketDataGateway extends IGateway {
    MarketData: Utils.Evt<Models.Market>;
    MarketTrade: Utils.Evt<Models.GatewayMarketTrade>;
}

export interface IOrderEntryGateway extends IGateway {
    sendOrder(order: Models.OrderStatusReport): void;
    cancelOrder(cancel: Models.OrderStatusReport): void;
    replaceOrder(replace: Models.OrderStatusReport): void;

    OrderUpdate: Utils.Evt<Models.OrderStatusReport>;

    cancelsByClientOrderId: boolean;
    generateClientOrderId(): string|number;

    supportsCancelAllOpenOrders() : boolean;
    cancelAllOpenOrders() : Promise<number>;
}

export interface IPositionGateway {
    PositionUpdate: Utils.Evt<Models.CurrencyPosition>;
}

export class CombinedGateway {
    constructor(
        public md: IMarketDataGateway,
        public oe: IOrderEntryGateway,
        public pg: IPositionGateway,
        public base: IExchangeDetailsGateway) { }
}

export interface IMarketTradeBroker {
    MarketTrade: Utils.Evt<Models.MarketSide>;
    marketTrades: Models.MarketSide[];
}

export interface IMarketDataBroker {
    MarketData: Utils.Evt<Models.Market>;
    currentBook: Models.Market;
}

export interface IOrderBroker {
    Trade: Utils.Evt<Models.Trade>;
    sendOrder(order: Models.SubmitNewOrder): Models.SentOrder;
    cancelOrder(cancel: Models.OrderCancel);
    replaceOrder(replace: Models.CancelReplaceOrder): Models.SentOrder;
    OrderUpdate: Utils.Evt<Models.OrderStatusReport>;
    cancelOpenOrders(): void;
}

export interface IPositionBroker {
    getPosition(currency: Models.Currency): Models.CurrencyPosition;
    latestReport: Models.PositionReport;
    NewReport: Utils.Evt<Models.PositionReport>;
}

export interface IOrderStateCache {
    allOrders: Map<string, Models.OrderStatusReport>;
    exchIdsToClientIds: Map<string, string>;
}

export interface IBroker extends IBrokerConnectivity {
    makeFee(): number;
    takeFee(): number;
    exchange(): Models.Exchange;

    minTickIncrement: number;
    minSize: number;
    pair: Models.CurrencyPair;

    hasSelfTradePrevention: boolean;
}

export interface ICalculator {
    latest: number;
    Updated: Utils.Evt<any>;
}

export interface ISilentCalculator {
    latest: any;
}

export interface IPublishMessages {
    publish(text: string): void;
}
