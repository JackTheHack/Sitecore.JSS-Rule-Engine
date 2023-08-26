import React from 'react';
import { withSitecoreContext, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { personalizationHelper } from "../lib/index";
import {JssRuleEngine} from "sitecore-jss-rule-engine"
import registerNextJS from "../rule-engine/ruleEngineProvider"


class ClientSidePlaceholder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: null            
        };
    }

    private updatingState: boolean = false;

    async componentDidMount() {        

        var personalizeOnEdge = this.props.rendering.fields["PersonalizeOnEdge"]

        if(personalizeOnEdge && personalizeOnEdge.value)
        {
            return;
        }        

        const personalizedRenderings = await this.personalizePlaceholder();

        if (personalizedRenderings) {
            console.log('Set personalized renderings');
            this.updatingState = true;
            this.setState({
                elements: personalizedRenderings                
            });
        }
    }

    shouldComponentUpdate() {
        if (this.updatingState) {
            this.updatingState = false;
            return false;
        }

        return true;
    }

    render() {

        const rendering = {
            ...this.props.rendering
        };

        rendering.placeholders[this.props.name] = this.state.elements ? this.state.elements :
            this.props.hideInitialContents ? [] : rendering.placeholders[this.props.name];

        const placeholderProps = {
            ...this.props,
            rendering
        }

        return <Placeholder {...placeholderProps} />
    }

    isClientside() {
        return typeof window !== 'undefined';
    }

    isDisconnectedMode() {
        const disconnectedMode = this.props.sitecoreContext.site.name === 'JssDisconnectedLayoutService';
        return disconnectedMode;
    }

    isPageEditing() {
        const isEditing = this.props.sitecoreContext.pageEditing;
        return isEditing;
    }

    

    async personalizePlaceholder() {
        var doRun =
            this.isClientside() &&
            !this.isDisconnectedMode() &&
            !this.isPageEditing();

        if (!doRun) {
            return null;
        }

        

        var elementPlaceholderRenderings = this.props.rendering.placeholders[this.props.name];

        var personalizationRule = this.props.rendering.fields["PersonalizationRules"]                

        console.log('Running personalization on FE for renderings', elementPlaceholderRenderings);
        
        var ruleEngineOptions = {};
        var ruleEngine = new JssRuleEngine(ruleEngineOptions);
        registerNextJS(ruleEngine);
        var ruleEngineContext = ruleEngine.getRuleEngineContext();

        ruleEngine.parseAndRunRule(personalizationRule.value, ruleEngineContext);

        var placeholderPersonalizationRule = ruleEngineContext.personalization?.placeholders[this.props.name]

        console.log("Rule parsed")

        var elementPlaceholderRenderings = 
        await personalizationHelper.doPersonalizePlaceholder(placeholderPersonalizationRule, elementPlaceholderRenderings, true);

        console.log("Personalized renderings", elementPlaceholderRenderings);

        return elementPlaceholderRenderings;
    }
}

export default withSitecoreContext()(ClientSidePlaceholder);