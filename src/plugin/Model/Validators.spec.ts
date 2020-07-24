import { Validators } from './Validators';
import { IRSliderSettings } from '../SliderSettings/RSliderSettings'

describe('Validators test', () => {
  const sett: IRSliderSettings = {};
  const currSett: IRSliderSettings = {
    step: 5,
    min: 10,
    max: 100,
    from: 30,
    to: 70,
    isRange: true
  }

  it('Validators. Should validate step', () => {
    expect(Validators.validateSettings('step', 5, sett, currSett)).toEqual(5);
  });

  it('Validators. Should validate min', () => {
    expect(Validators.validateSettings('min', 10, sett, currSett)).toEqual(10);
  });

  it('Validators. Should validate max', () => {
    expect(Validators.validateSettings('max', 100, sett, currSett)).toEqual(100);
  });

  it('Validators. Should validate from', () => {
    expect(Validators.validateSettings('from', 30, sett, currSett)).toEqual(30);
  });

  it('Validators. Should validate to', () => {
    expect(Validators.validateSettings('to', 70, sett, currSett)).toEqual(70);
  });

  it('Validators. Should validate range', () => {
    expect(Validators.validateSettings('range', true, sett, currSett)).toEqual(null);
  });
})