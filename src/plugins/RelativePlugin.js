/*
* RelativePlugin
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

import Tween from "../Tween";

/**
 * The RelativePlugin for TweenJS enables relative numeric values for tweens. Install using:
 *
 * 	RotationPlugin.install();
 *
 * Once installed, you can pass in relative numeric property values as strings beginning with "+" or "-". For example,
 * the following tween would tween the x position of `foo` from its initial value of `200` to `50` (200-150), then to
 * `125` (50+75).
 *
 * 	foo.x = 200;
 * 	Tween.get(foo).to({x:"-150"}, 500).to({x:"+75"}, 500);
 *
 * @class RelativePlugin
 * @module TweenJS
 * @static
 */
export default class RelativePlugin {

// constructor:
  /**
   * @constructor
   */
	constructor () {
		throw "RelativePlugin is static and cannot be instantiated.";
	}

// static methods:
  /**
   * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
   * @method install
   * @static
   */
  install () {
    Tween._installPlugin(RelativePlugin);
  }

  /**
   * Called by TweenJS when a new property initializes on a tween.
   * See {{#crossLink "SamplePlugin/init"}}{{/crossLink}} for more info.
   * @method init
   * @param {Tween} tween
   * @param {String} prop
   * @param {any} value
   * @return {any}
   * @static
   */
  init (tween, prop, value) {
    let data = tween.pluginData;
    if (!data.Relative_installed && !data.Relative_disabled) {
      tween._addPlugin(s);
      data.Relative_installed = true;
    }
  }

  /**
   * Called when a new step is added to a tween (ie. a new "to" action is added to a tween).
   * See {{#crossLink "SamplePlugin/init"}}{{/crossLink}} for more info.
   * @method init
   * @param {Tween} tween
   * @param {TweenStep} step
   * @param {String} prop
   * @param {String} value
   * @return {any}
   * @static
   */
  step (tween, step, prop, value) {
    if (typeof value !== "string") { return; }
    let prev = step.prev.props[prop], char0 = value[0], val;
    if (typeof prev !== "number" || !(char0 === "+" || char0 === "-") || isNaN(val = +value)) { return; }
    return prev + val;
  }

  /**
   * Called before a property is updated by the tween.
   * See {{#crossLink "SamplePlugin/init"}}{{/crossLink}} for more info.
   * @method tween
   * @param {Tween} tween
   * @param {TweenStep} step
   * @param {String} prop
   * @param {any} value
   * @param {Number} ratio
   * @param {Boolean} end
   * @return {any}
   * @static
   */
  tween (tween, step, prop, value, ratio, end) {
    // nothing
  }

}
