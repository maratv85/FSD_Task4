import { IRSliderSettings } from '../SliderSettings/RSliderSettings'

class Validators {
  private isValidBoolean(value: IRSliderSettings[keyof IRSliderSettings]): boolean | null {
    return typeof value === 'boolean' ? value : null;
  }

  private isValidNumber(value: IRSliderSettings[keyof IRSliderSettings]): number | null {
    return typeof value === 'number' ? value : null;
  }

  public static validateSettings(key: string, value: IRSliderSettings[keyof IRSliderSettings],) {
    
  }
}

export default Validators;

export { Validators };