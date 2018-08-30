import { getSmartContractCode } from '../etherscanAPI/actions';
import { signatureList, eventTopic } from './abi';

export default function validateSmartContract(
  limiter,
  network,
  apikey,
  tokenAddress,
) {
  return getSmartContractCode(limiter, network, apikey, tokenAddress).then(
    input => {
      let output = true;
      for (let i = 0; i < signatureList.length; i++) {
        let result = input.indexOf(signatureList[i]);
        if (result < 0) {
          output = false;
        }
      }

      for (let i = 0; i < eventTopic.length; i++) {
        let result = input.indexOf(eventTopic[i]);
        if (result < 0) {
          output = false;
        }
      }
      
      return output;
    },
  );
}
