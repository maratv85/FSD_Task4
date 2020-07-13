import { IRSliderSettings } from './SliderSettings/RSliderSettings'

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    RSlider: (
      options?: IRSliderSettings,
    ) => JQuery<Element> | JQuery<Object>;
  }
}

(function($: JQueryStatic) {

  $.fn.RSlider = function startSlider(options: any) {

    return this.map(function () { 
      const data: IRSliderSettings = $().data();
      
    });

  };

})(jQuery);