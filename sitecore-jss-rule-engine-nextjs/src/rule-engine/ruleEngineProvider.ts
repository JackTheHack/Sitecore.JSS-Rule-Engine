import addRenderingCommand from './actions/addRenderingCommand'
import setDataSourceCommand from './actions/setDataSourceCommand'
import hideRenderingCommand from './actions/hideRenderingCommand'
import { JssRuleEngine } from 'sitecore-jss-rule-engine'

export function registerNextJS(ruleEngine:JssRuleEngine)
{
    ruleEngine.registerCommand('{56CADC0A-B671-4127-80F7-983AE4E4C10C}', addRenderingCommand)
    ruleEngine.registerCommand('{A2DB53FC-D6AA-4D7C-B03C-F92954030A6B}', hideRenderingCommand)
    ruleEngine.registerCommand('{225168CE-C093-4F10-96C3-5B1983DF5261}', setDataSourceCommand)
}