

module.exports = function(ruleEngine) {
    var setDataSourceCommand = require('./setDataSourceCommand')
    var runScriptCommand = require('./runScriptCommand')
    var logMessageCommand = require('./logMessageCommand')
    var hideRenderingCommand = require('./hideRenderingCommand')
    var selectRenderingCommand = require('./selectRenderingCommand')

    ruleEngine.registerCommand('{0F3C6BEC-E56B-4875-93D7-2846A75881D2}', setDataSourceCommand)
    ruleEngine.registerCommand('{94C5C335-0902-4B45-B528-11B220005DD7}', runScriptCommand)
    ruleEngine.registerCommand('{4D151B8B-BD5F-4479-A35F-EE740F6387E8}', logMessageCommand)
    ruleEngine.registerCommand('{25F351A1-712D-45F8-857D-8AD95BB2ACE9}', hideRenderingCommand)
    ruleEngine.registerCommand('{25F351A1-712D-45F8-857D-8AD95BB2ACE9}', selectRenderingCommand)    
}