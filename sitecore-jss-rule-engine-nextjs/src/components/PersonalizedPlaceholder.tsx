import React from 'react';
import { withSitecoreContext, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { PersonalizationHelper } from "../lib/index";
import {JssRuleEngine} from "sitecore-jss-rule-engine"

class PersonalizedPlaceholder extends React.Component<any,any> {

    graphQLEndpoint:string;
    sitecoreApiKey:string;
    ruleEngine:JssRuleEngine;

    constructor(props:any) {
        super(props);

        this.graphQLEndpoint = props.endpointUrl;
        this.ruleEngine = props.ruleEngine;
        this.sitecoreApiKey = props.sitecoreApiKey;

        this.state = {
            elements: null            
        };
    }

    async componentDidMount() {        

        var personalizeOnEdge = this.props.rendering.fields["PersonalizeOnEdge"]

        if(personalizeOnEdge && personalizeOnEdge.value)
        {
            return;
        }        

        const personalizedRenderings = await this.personalizePlaceholder();

        if (personalizedRenderings) {
            console.log('Set personalized renderings');            
            this.setState({
                elements: personalizedRenderings                
            });
        }
    }

    shouldComponentUpdate() {
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

        return <Placeholder name={this.props.name} {...placeholderProps} />
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

        if(typeof(window) !== "undefined" && window){          
            this.ruleEngine.setRequestContext({
                url: window.location.href                    
            })
        }

        var ruleEngineContext = this.ruleEngine.getRuleEngineContext() as any;


        if(!personalizationRule?.value)
        {
            return elementPlaceholderRenderings;
        }
        
        try {
            
            this.ruleEngine.parseAndRunRule(personalizationRule.value, ruleEngineContext);

            var placeholderPersonalizationRule = ruleEngineContext.personalization?.placeholders[this.props.name]
    
            console.log("Rule parsed");

            var personalizationHelper = new PersonalizationHelper(this.graphQLEndpoint, this.sitecoreApiKey);
            var elementPlaceholderRenderings = 
            await personalizationHelper.doPersonalizePlaceholder(placeholderPersonalizationRule, elementPlaceholderRenderings);

            return elementPlaceholderRenderings;
        
        } catch (error) {
            console.warn('Failed to parse personalization rule - ', error);            
            return elementPlaceholderRenderings;
        }
        
        
    }
}

export default withSitecoreContext()(PersonalizedPlaceholder);