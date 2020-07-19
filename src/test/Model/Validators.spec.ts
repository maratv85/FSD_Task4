import { Validators } from '../../plugin/Model/Validators';
import { Model } from '../../plugin/Model/Model';

describe('Validators test', () => {
  const model = new Model({
    step: 5,
    min: 10,
    max: 100,
    from: 30,
    to: 70,
    isRange: true 
  })

  
})