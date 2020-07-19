import { Observer } from '../Observer/Observer'
import { IRSliderSettings } from '../SliderSettings/RSliderSettings'
import { RSliderSettingsDefault } from '../SliderSettings/RSliderSettingsDefault'
import { Validators } from './Validators';

class Model {
  private settings: IRSliderSettings;
  private observableSubject: Observer = new Observer();

  constructor(settings?: IRSliderSettings) {
    this.settings = { ...settings };
    //this.initModel(settings);
  }

  public updateSettings(settings: IRSliderSettings): void {
    
  }
}

export { Model };