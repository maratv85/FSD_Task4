import { Validators } from './Validators';
import { IRSliderSettings } from '../SliderSettings/RSliderSettings'

describe('Validators test', () => {
  const sett: IRSliderSettings = {};
  let currSett: IRSliderSettings;

  beforeEach(() => {
    currSett = {
      step: 5,
      min: 10,
      max: 100,
      from: 30,
      to: 70,
      isRange: true,
      hasTip: true,
      hasScale: true,
      isVertical: false,
    }
  })

  it('Validators. Should validate "step"', () => {
    expect(Validators.validateSettings('step', 5, sett, currSett)).toEqual(5);
  });

  it('Validators. Should validate "min"', () => {
    expect(Validators.validateSettings('min', 10, sett, currSett)).toEqual(10);
  });

  it('Validators. Should validate "max"', () => {
    expect(Validators.validateSettings('max', 100, sett, currSett)).toEqual(100);
  });

  it('Validators. Should validate "from"', () => {
    expect(Validators.validateSettings('from', 30, sett, currSett)).toEqual(30);
  });

  it('Validators. Should validate "to"', () => {
    expect(Validators.validateSettings('to', 70, sett, currSett)).toEqual(70);
  });

  // it('Validators. Should validate "range"', () => {
  //   expect(Validators.validateSettings('isRange', true, sett, currSett)).toBeTrue();
  // });

  it('Validators. Should validate "vertical"', () => {
    expect(Validators.validateSettings('isVertical', true, sett, currSett)).toBeTrue();
  });

  it('Validators. Should validate "has tip"', () => {
    expect(Validators.validateSettings('hasTip', true, sett, currSett)).toBeTrue();
  });

  it('Validators. Should validate "has scale"', () => {
    expect(Validators.validateSettings('hasScale', true, sett, currSett)).toBeTrue();
  });

  // it('Validators. Should validate default value', () => {
  //   expect(Validators.validateSettings('default', false, sett, currSett)).toEqual(null);
  // });
})

describe('Validators invalid values test', () => {
  const sett: IRSliderSettings = {};
  let currSett: IRSliderSettings;

  beforeEach(() => {
    currSett = {
      step: 5,
      min: 10,
      max: 100,
      from: 75,
      to: 70,
      isRange: false,
    }
  })

  it('Validators. Check if invalid "from" value', () => {
    expect(Validators.validateSettings('from', 75, sett, currSett)).toEqual(65);
  });

  beforeEach(() => {
    currSett = {
      step: 5,
      min: 10,
      max: 100,
      from: 1,
      to: 70,
    }
  })

  it('Validators. Check if invalid "to" value', () => {
    expect(Validators.validateSettings('to', 1, sett, currSett)).toEqual(80);
  });

  beforeEach(() => {
    currSett = {
      step: 5,
      min: 10,
      max: 8,
      from: 75,
      to: 70,
      isRange: true,
    }
  })

  it('Validators. Check if invalid "max" value', () => {
    expect(Validators.validateSettings('max', 8, sett, currSett)).toEqual(8);
  });

  beforeEach(() => {
    currSett = {
      step: 5,
      min: 10,
      max: 8,
      from: 75,
      to: 70,
      isRange: true,
      hasTip: true
    }
  })

  it('Validators. Should validate "has tip"', () => {
    expect(Validators.validateSettings('hasTip', true, sett, currSett)).toBeTrue();
  });

})