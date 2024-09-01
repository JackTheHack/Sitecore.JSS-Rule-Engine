import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(_rule:RuleData, _ruleContext:RuleEngineContext) {
    throw new Error("Field type rule not supported.");
}