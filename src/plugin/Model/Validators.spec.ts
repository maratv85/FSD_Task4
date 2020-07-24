import { Validators } from './Validators';
import { Model } from './Model';

describe('Validators test', () => {
  const model = new Model({
    step: 5,
    min: 10,
    max: 100,
    from: 30,
    to: 70,
    isRange: true 
  })

  it('Validators / Should validate step', () => {
    expect(Validators.validateSettings('step', 5, model, model))
  })
})