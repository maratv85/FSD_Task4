import { Model } from './Model';

describe('Model. Test set values', () => {
  const model = new Model({
    step: 5,
    min: 10,
    max: 100,
    from: 20,
    to: 70,
    isRange: true
  });

  //model.setSettings({ step: 10 });

  it('Should change toValue position 100', () => {
    model.updateValue(70, 'toValue');
    expect(model.getSettings().to).toEqual(75);
  });

  describe('Model. Calculate values', () => {
    it('Convert percent to value', () => {
      expect(model.convertPercentToValue(47)).toEqual(52.3);
    });
    it('Convert value to percent', () => {
      expect(model.convertValueToPercent(46)).toEqual(40);
    });
  });
});

describe('Model. Test set settings method', () => {
  const model: Model = new Model();

  beforeEach(() => {
    model.setSettings({
      isRange: false,
      step: 1,
      min: -999,
      max: 999
    });
  });

  it('Should match set value "isRange"', () => {
    model.setSettings({ isRange: true });
    expect(model.getSettings().isRange).toBeTruthy();
  });
  it('Should match set value "hasTip"', () => {
    model.setSettings({ hasTip: true });
    expect(model.getSettings().hasTip).toBeTruthy();
  });
  it('Should match set value "isVertical"', () => {
    model.setSettings({ isVertical: true });
    expect(model.getSettings().isVertical).toBeTruthy();
  });
  it('Should match set value "step"', () => {
    model.setSettings({ step: 20 });
    expect(model.getSettings().step).toEqual(20);
  });
  it('Should match set value "to"', () => {
    model.setSettings({ isRange: true });
    model.setSettings({ to: 25 });
    expect(model.getSettings().to).toEqual(25);
  });
  it('Should match set value "from"', () => {
    model.setSettings({ from: 1 });
    expect(model.getSettings().step).toEqual(1);
  });
  it('Should match set value "max"', () => {
    model.setSettings({ max: 100 });
    expect(model.getSettings().max).toEqual(100);
  });
});

describe('Model. Test settings from and to', () => {
  const model: Model = new Model();

  beforeEach(() => {
    model.setSettings({
      isRange: false,
      min: -100,
      max: 100,
      step: 1,
    });
  });

  it('Should match values "from" and "to"', () => {
    model.setSettings({ isRange: true, from: 10, to: 80 });
    expect(model.getSettings().isRange).toEqual(true);
    expect(model.getSettings().from).toEqual(10);
    expect(model.getSettings().to).toEqual(80);
  });
});

describe('Model. Test default values', () => {
  it('Should match default "isRange"', () => {
    const model: Model = new Model();
    expect(model.getSettings().isRange).toBeFalsy();
  });
  it('Should match default "isVertical"', () => {
    const model: Model = new Model();
    expect(model.getSettings().isVertical).toBeFalsy();
  });
  it('Should match default "step"', () => {
    const model: Model = new Model();
    expect(model.getSettings().step).toEqual(1);
  });
  it('Should match default "min', () => {
    const model: Model = new Model();
    expect(model.getSettings().min).toEqual(0);
    
  });
  it('Should match default "from', () => {
    const model: Model = new Model();
    expect(model.getSettings().from).toEqual(0);
  });
  it('Should match default "to', () => {
    const model: Model = new Model();
    expect(model.getSettings().to).toEqual(null);
  });
});