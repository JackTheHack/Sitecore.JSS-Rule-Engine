
import runScriptCommand from  './runScriptCommand'
import logMessageCommand from './logMessageCommand'


export default function(ruleEngine:any) {
    
    ruleEngine.registerCommand('{94C5C335-0902-4B45-B528-11B220005DD7}', runScriptCommand)
    ruleEngine.registerCommand('{4D151B8B-BD5F-4479-A35F-EE740F6387E8}', logMessageCommand)        
    
}