//@ts-ignore
//import { getRuleEngineInstance } from 'sitecore-jss-rule-engine';

// Function to generate all binary strings
export function generateAllBinaryStrings(n: number, i: number, resultArr: string[], arr: number[]) {
    if (i == n) {
        let result = "";
        for (let i = 0; i < n; i++) {
            result += arr[i];
        }

        if(arr.indexOf(1)!=-1)
        {
          resultArr.push(result);
        }
        return;
    }

    // First assign "0" at ith position
    // and try for all other permutations
    // for remaining positions
    arr[i] = 0;
    generateAllBinaryStrings(n, i + 1, resultArr, arr);

    // And then assign "1" at ith position
    // and try for all other permutations
    // for remaining positions
    arr[i] = 1;
    generateAllBinaryStrings(n, i + 1, resultArr, arr);
}

export const SC_VARIANT_PREFIX="_scvariant";

export function normalizePersonalizedRewrite(pathname: string): string {
    if (!pathname.includes(SC_VARIANT_PREFIX)) {
      return pathname;
    }
    const result = pathname.match(`${SC_VARIANT_PREFIX}.*?(?:\\/|$)`);
    return result === null ? pathname : pathname.replace(result[0], '');
  }

export function getScPersonalizedRewrite(pathname: string, variantId: string): string {
    const path = pathname.startsWith('/') ? pathname : '/' + pathname;    
    const result = `/${SC_VARIANT_PREFIX}${variantId}${path}`;
    return result;
  }  


export function getScPersonalizedVariantIds(parsedRule:any){    
        
    const result: string[] = [];

    if(parsedRule)
    {
      const ruleCount = parsedRule.rules?.length;      

      const arr = new Array(ruleCount);
      arr.fill(0);
      generateAllBinaryStrings(ruleCount, 0, result, arr);

      return result;
    }  

    return null;
  }