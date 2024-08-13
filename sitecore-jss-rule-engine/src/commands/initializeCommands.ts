
import runScriptCommand from  './runScriptCommand'
import logMessageCommand from './logMessageCommand'
import { JssRuleEngine } from '../ruleEngine'
import { commandIds } from '../constants'


export default function(ruleEngine:JssRuleEngine) {
    ruleEngine.registerCommand(commandIds.runScript, runScriptCommand)
    ruleEngine.registerCommand(commandIds.logMessage, logMessageCommand)            
}