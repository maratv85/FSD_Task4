import { IRSliderSettings } from '../SliderSettings/RSliderSettings'

class Validators {
  private static isValidBoolean(value: IRSliderSettings[keyof IRSliderSettings]): boolean | null {
    return typeof value === 'boolean' ? value : null;
  }

  private static isValidNumber(value: IRSliderSettings[keyof IRSliderSettings]): number | null {
    return typeof value === 'number' ? value : null;
  }

  public static validateSettings(
    key: string,
    value: IRSliderSettings[keyof IRSliderSettings],
    settings: IRSliderSettings = {},
    curSettings: IRSliderSettings
  ) {
    const validateStep = this.isValidNumber(settings.step);
    const validateFrom = this.isValidNumber(settings.from);
    const validateTo = this.isValidNumber(settings.to);
    const validateMin = this.isValidNumber(settings.min);
    const validateMax = this.isValidNumber(settings.max);
    const validateIsRange = this.isValidBoolean(settings.isRange);

    const step = validateStep === null ? curSettings.step : validateStep;
    const from = validateFrom === null ? curSettings.from : Math.round((validateFrom - curSettings.min) / curSettings.step) * curSettings.step + curSettings.min;
    const to = validateTo === null ? curSettings.to : Math.round((validateTo - curSettings.min) / curSettings.step) * curSettings.step + curSettings.min;
    const min = validateMin === null ? curSettings.min : validateMin;
    const max = validateMax === null ? curSettings.max : validateMax;
    const isRange = validateIsRange === null ? curSettings.isRange : validateIsRange;

    const isInvalidStep = step <= 0 || step > max - min;
    const isInvalidFrom = from >= to - step;
    const isInvalidTo = to <= from + step;
    const isInvalidMax = max <= min + step;
    const isInvalidMin = min >= max - step;

    switch (key) {
      case 'isVertical':
      case 'hasTip':
      case 'hasScale':
      case 'isRange':
        return this.isValidBoolean(value);
      
      case 'step':
        if (isInvalidStep) { return curSettings.step }
        return step

      case 'max':
        if (isInvalidMax) { return curSettings.max }
        return max 
      
      case 'min':
        if (isInvalidMin) { return curSettings.min }
        return min
        
      case 'from':
        if (isRange && isInvalidFrom) { return to - step > min ? to - step : min;}
        if (from > max) return max;
        if (from < min) return min;
        return from;
        
      case 'to':
        if (isInvalidTo) { return from + step > max ? from + step : max; }
        if (to > max) return max;
        if (to < min) return min;
        return to
        
      default: return null;
    }
  }
  
}

export { Validators };