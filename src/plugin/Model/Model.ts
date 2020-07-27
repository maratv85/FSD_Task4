import { Observer } from '../Observer/Observer'
import { IRSliderSettings } from '../SliderSettings/RSliderSettings'
import { RSliderSettingsDefault } from '../SliderSettings/RSliderSettingsDefault'

class Model {
  private settings: IRSliderSettings;
  public observableValues: Observer = new Observer();
  public observableSettings: Observer = new Observer();

  constructor(settings?: IRSliderSettings) {
    this.settings = { ...settings };
    this.initModel(settings);
  }

  public initModel(settings: IRSliderSettings = {}) {
    this.setSettings(settings);
  }

  public getSettings(): IRSliderSettings {
    return { ...this.settings };
  }

  public setSettings(settings: IRSliderSettings): void {
    Object.entries(settings).forEach(([key, value]) => {
      this.settings[key] = this.validateSetting(key, value, settings);
    });

    Object.keys(settings).forEach((key) => {
      const isToSmallerFrom = this.settings.isRange
        && (this.settings.to === null || (this.settings.to <= this.settings.from));
      
      if (key === 'isRange') {
        if (isToSmallerFrom) this.setSettings({ to: this.settings.max });
      }
      if (key === 'min') {
        this.setSettings({ from: this.settings.from });
        this.setSettings({ to: this.settings.to });
      }
      if (key === 'max') {
        this.setSettings({ from: this.settings.from });
        this.setSettings({ to: this.settings.to });
      }
      if (key === 'step') {
        this.setSettings({ from: this.settings.from });
        this.setSettings({ to: this.settings.to });
      }
      if (key === 'to') {
        this.setSettings({ from: this.settings.from });
      }     
    });
  }

  private dispatchSettings(): void {
    const {
      isRange, isVertical, hasTip, hasScale,
    } = this.getSettings();
    this.observableSettings.notify({
      isRange, isVertical, hasTip, hasScale,
    });
    this.dispatchValues();
  }

  private dispatchValues(): void {
    const { from, to } = this.getSettings();
    
    this.observableValues.notify({
      
    });
  }

  private isValidBoolean(value: IRSliderSettings[keyof IRSliderSettings]): boolean | null {
    return typeof value === 'boolean' ? value : null;
  }

  private isValidNumber(value: IRSliderSettings[keyof IRSliderSettings]): number | null {
    return typeof value === 'number' ? value : null;
  }

  public validateSetting(
    key: string,
    value: IRSliderSettings[keyof IRSliderSettings],
    settings: IRSliderSettings = {}
  ) {
    const validateStep = this.isValidNumber(settings.step);
    const validateFrom = this.isValidNumber(settings.from);
    const validateTo = this.isValidNumber(settings.to);
    const validateMin = this.isValidNumber(settings.min);
    const validateMax = this.isValidNumber(settings.max);
    const validateIsRange = this.isValidBoolean(settings.isRange);

    const step = validateStep === null ? this.settings.step : validateStep;
    const from = validateFrom === null ? this.settings.from : Math.round((validateFrom - this.settings.min) / this.settings.step) * this.settings.step + this.settings.min;
    const to = validateTo === null ? this.settings.to : Math.round((validateTo - this.settings.min) / this.settings.step) * this.settings.step + this.settings.min;
    const min = validateMin === null ? this.settings.min : validateMin;
    const max = validateMax === null ? this.settings.max : validateMax;
    const isRange = validateIsRange === null ? this.settings.isRange : validateIsRange;

    const isInvalidStep = step <= 0 || step > max - min;
    const isInvalidFrom = from >= to - step;
    const isInvalidTo = to <= from + step;
    const isInvalidMax = max <= min + step;
    const isInvalidMin = min >= max - step;

    if (key === 'isVertical') return this.isValidBoolean(value);

    if (key === 'hasTip') return this.isValidBoolean(value);
    
    if (key === 'hasScale') return this.isValidBoolean(value);

    if (key === 'isRange') return this.isValidBoolean(value);

    if (key === 'step') {
      if (isInvalidStep) { return this.settings.step }
      return step;
    }
    
    if (key === 'max') {
      if (isInvalidMax) { return this.settings.max }
      return max 
    }

    if (key === 'min') {
      if (isInvalidMin) { return this.settings.min }
      return min 
    }

    if (key === 'from') {
      if (isRange && isInvalidFrom) { return to - step > min ? to - step : min;}
      if (from > max) return max;
      if (from < min) return min;
      return from;
    }

    if (key === 'to') {
      if (isInvalidTo) { return from + step > max ? from + step : max; }
        if (to > max) return max;
        if (to < min) return min;
        return to
    }

    const keys = Object.keys(settings);
    let wrongKey: String[];
    wrongKey = Object.keys(settings).filter(str => str.indexOf(key) !== 0)

    if (wrongKey.length === 0) return null;
  }
}

export { Model };