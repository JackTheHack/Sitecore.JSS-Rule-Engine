import { JssRuleEngine } from './src/ruleEngine';

var isEdgeRuntime = typeof globalThis.EdgeRuntime == 'string';

if(!isEdgeRuntime && !globalThis.JssEngine)
{
    globalThis.JssEngine = new JssRuleEngine({})
}

export function getRuleEngineInstance() {
    if(!isEdgeRuntime)
    {
        return globalThis.JSON;
    }
    
    return new JssRuleEngine();
}

export { JssRuleEngine }