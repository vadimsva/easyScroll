/*
easyScroll - 1.01 [03.06.16]
Author: vadimsva
Github: https://github.com/vadimsva/easyScroll
*/
$(function() {

(function($) {
if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

	var focusedElem,
	doc = $(document)[0],
	elemClass = 'easyScroll',
	axisY = 'vertical',
	axisX = 'horizontal';

	$(document).mousemove(function(event) {
		focusedElem = nearestScroll($(event.target));
	});

	function nearestScroll(elem) {
		if (!elem || elem[0] == doc || elem.hasClass(elemClass + '_container')) {
			return elem;
		} else {
			return nearestScroll(elem.parent());
		}
	}

	
	var ctrlActive = false;
	$('html').keyup(function(event) {
		ctrlActive = false;
	});

	
	$('html').keydown(function(event) {
		if (focusedElem && !focusedElem.is(':focus') && !$(event.target).is(':focus') && $(event.target)[0].tagName != 'TEXTAREA' && $(event.target)[0].tagName != 'SELECT' && $(event.target)[0].tagName != 'INPUT') {
			_options = $.fn.easyScroll._options;
			switch (event.which) {
				case 17://ctrl
					ctrlActive = true;
				break;
				case 38://up
					scrollByStep('up', 1, axisY);
					event.preventDefault();
				break;
				case 33://page up
					scrollByStep('up', 4, axisY);
					event.preventDefault();
				break;
				case 40://down
					scrollByStep('down', 1, axisY);
					event.preventDefault();
				break;
				case 32://space
				case 34://page down
					scrollByStep('down', 4, axisY);
					event.preventDefault();
				break;
				case 37://left
					if (_options.scrollHorizontal) {
						scrollByStep('up', 1, axisX);
						event.preventDefault();
					}
				break;
				case 39://right
					if (_options.scrollHorizontal) {
						scrollByStep('down', 1, axisX);
						event.preventDefault();
					}
				break;
				case 36://home
					if (_options.scrollHorizontal) {
						scrollByStep('up', 4, axisX);
						event.preventDefault();
					}
				break;
				case 35://end
					if (_options.scrollHorizontal) {
						scrollByStep('down', 4, axisX);
						event.preventDefault();
					}
				break;
			}
		}
	});
		
		
	function scrollByStep(direction, upto, axis, current) {
		if (current) {
			var el = current;
		} else {
			var el = focusedElem;
		}
		_options = $.fn.easyScroll._options;
		if (upto == undefined) {
			upto = 1;
		}
		if (direction == 'up') {
			if (el.is('body')) {
				if (axis && axis == axisY) {
					$(document).scrollTop($(document).scrollTop() - _options.scrollStep * upto);
				} else {
					$(document).scrollLeft($(document).scrollLeft() - _options.scrollStep * upto);
				}
			} else {
				if (axis && axis == axisY) {
					el[0].scrollTop -= _options.scrollStep * upto;
				} else {
					el[0].scrollLeft -= _options.scrollStep * upto;
				}
			}
		} else {
			if (el.is('body')) {
				if (axis && axis == axisY) {
					$(document).scrollTop($(document).scrollTop() + _options.scrollStep * upto);
				} else {
					$(document).scrollLeft($(document).scrollLeft() + _options.scrollStep * upto);
				}
			} else {
				if (axis && axis == axisY) {
					el[0].scrollTop += _options.scrollStep * upto;
				} else {
					el[0].scrollLeft += _options.scrollStep * upto;
				}
			}
		}
	}
	
	
	var supports = (function() {
		var div = document.createElement('div'),
		vendors = 'Khtml Ms O Moz Webkit'.split(' '),
		len = vendors.length;
		return function(prop) {
			if (prop in div.style) return true;
			prop = prop.replace(/^[a-z]/, function(val) {
				return val.toUpperCase();
			});
			while(len--) {
				if (vendors[len] + prop in div.style) return true;
			}
			return false;
		};
	})();
	var supportTransform = supports('transform');
	
	
	$.fn.easyScroll = function(method) {	

	return this.each(function() {
		var el = $(this),
		scroll_top,
		scroll_left,
		scroll_coefV,
		scroll_coefH,
		eScrollV,
		eScrollH,
		scrollBut_x = 0;

		var methods = {
			
			init : function() {
				var _defaults = {
					theme: 'default',
					scrollAutoHide: false,
					scrollOffset: 1,
					scrollMinHeight: 20,
					scrollStep: 120,
					scrollButtons: false,
					scrollHorizontal: false
				};
				var _options = $.extend(_defaults, method);
				$.fn.easyScroll._options = _options;
				
				function scrollObjInit(axis) {
					var but1 = '', but2 = '', res;
					if (_options.scrollButtons) {
						if (axis == axisY) {
							but1 = '<div class="' + elemClass+ '_scrollBut scrollButTop">&#9652;</div>';
							but2 = '<div class="' + elemClass+ '_scrollBut scrollButBottom">&#9662;</div>';
						} else {
							but1 = '<div class="' + elemClass+ '_scrollBut scrollButLeft">&#9666;</div>';
							but2 = '<div class="' + elemClass+ '_scrollBut scrollButRight">&#9656;</div>';
						}
					}
					var obj = $('<div class="' + elemClass + '_scroll_' + axis + ' theme_' + _options.theme + '">' + but1 + '<div class="' + elemClass + '_slider"></div>' + but2 + '</div>');
					if (el[0].tagName == 'HTML' || el[0].tagName == 'BODY') {
						el = $('body');
						obj.attr('id', elemClass + '_scrollBody_' + axis);
						el.append(obj);
					} else {
						el.after(obj);
					}
					res = obj
					if (axis == axisY) {
						el.css({
							paddingRight: res.outerWidth() + _options.scrollOffset * 2 + 'px'
						})
					} else {
						el.css({
							paddingBottom: res.outerHeight() + _options.scrollOffset * 2 + 'px'
						})
					}
					
					
					if (_options.scrollButtons) {
						if (axis == axisY) {
							scrollBut_x = obj.find('> .scrollButTop').outerHeight() + 1;
						} else {
							scrollBut_x = obj.find('> .scrollButLeft').outerWidth() + 1;
						}
					}
					return res;
				}
				eScrollV = scrollObjInit(axisY);
				if (_options.scrollHorizontal) {
					eScrollH = scrollObjInit(axisX);
				}
				
				var autoHideClass = '';
				if (_options.scrollAutoHide) {
					autoHideClass = elemClass + '_autoHide';
				}
				el.addClass(elemClass + '_container ' + autoHideClass);
				
				
				function _init(action) {
					function scrollSliderInit(axis) {
						var textareaResizeOffset = 0;
						if (axis == axisY) {
							var elem = eScrollV;
							var content_x = el[0].scrollHeight;
						} else {
							var elem = eScrollH;
							var content_x = el[0].scrollWidth;
						}
						
						if (el.is('body')) {
							if (axis == axisY) {
								var scroll_x = $(window).height();
								if (action != 'resize' && action != 'scroll') {
									elem.css({
										top: _options.scrollOffset + 'px',
										right: _options.scrollOffset + 'px',
										bottom: _options.scrollOffset + 'px'
									});
								}
							} else {
								var scroll_x = $(window).width();
								if (action != 'resize' && action != 'scroll') {
									elem.css({
										left: _options.scrollOffset + 'px',
										right: _options.scrollOffset + 'px',
										bottom: _options.scrollOffset + 'px'
									});
								}
							}
							var eScrollVOffset = 0;
						} else {
							if (axis == axisY) {
								var eScrollVOffset = 0;
							} else {
								if (eScrollV.css('visibility') == 'visible') {
									var eScrollV_w = eScrollV.outerWidth();
								} else {
									var eScrollV_w = 0;
								}
								var eScrollVOffset = eScrollV_w + _options.scrollOffset;
							}
							if (el[0].tagName == 'TEXTAREA' && el.css('resize') != undefined && el.css('resize') != 'none') {
								textareaResizeOffset = 10;
								eScrollVOffset = 0;
							}
							if (elem != undefined) {
								var elH = el.outerHeight(),
								elW = el.outerWidth(),
								elemH = elem.outerHeight(),
								elemW = elem.outerWidth(),
								elMTop = parseInt(el.css('marginTop')),
								elMBottom = parseInt(el.css('marginBottom')),
								elMLeft = parseInt(el.css('marginLeft')),
								elBTop = parseInt(el.css('borderTopWidth')),
								elBLeft = parseInt(el.css('borderLeftWidth'));
							}
							if (!supportTransform) {
								var elTop = parseInt(Number(el.position().top).toFixed(0)),
								elLeft = parseInt(Number(el.position().left).toFixed(0));
							}
							if (axis == axisY) {
								var scroll_x = elH - elBTop - parseInt(el.css('borderBottomWidth'));
								if (action != 'scroll') {
									if (supportTransform) {
										var translateTop = - elH - elMBottom + elBTop + _options.scrollOffset;
										var translateLeft = elW + elMLeft - elBLeft - elemW - _options.scrollOffset;
										elem.css({
											transform: 'translateX(' + translateLeft + 'px) translateY(' + translateTop + 'px) translateZ(0.1px)',
											height: scroll_x - textareaResizeOffset - _options.scrollOffset * 2 + 'px'
										});
									} else {
										var posTop = elTop + elMTop + elBTop + _options.scrollOffset;
										var posLeft = elLeft + elW + elMLeft - elBLeft - elemW - _options.scrollOffset;
										elem.css({
											top: posTop + 'px',
											left: posLeft + 'px',
											height: scroll_x - textareaResizeOffset - _options.scrollOffset * 2 + 'px'
										});
									}
								}
							} else {
								var scroll_x = elW - elBLeft - parseInt(el.css('borderRightWidth'));
								if (el[0].tagName != 'TEXTAREA') {
									scroll_x -= eScrollVOffset;
								}
								if (action != 'scroll') {
									if (supportTransform) {
										var translateTop = - elMBottom - elBTop - elemH - _options.scrollOffset;
										var translateLeft = elMLeft + elBLeft + _options.scrollOffset;
										elem.css({
											transform: 'translateX(' + translateLeft + 'px) translateY(' + translateTop + 'px) translateZ(0.1px)',
											width: scroll_x - textareaResizeOffset - _options.scrollOffset * 2 + 'px'
										});
									} else {
										var posTop = elTop + elMTop - elBTop + elH - elemH - _options.scrollOffset;
										var posLeft = elLeft + elMLeft + elBLeft  + _options.scrollOffset;
										elem.css({
											top: posTop + 'px',
											left: posLeft + 'px',
											width: scroll_x - textareaResizeOffset - _options.scrollOffset * 2 + 'px'
										});
									}
								}
							}
						}
						
						if (elem != undefined) {
							if (content_x <= scroll_x + eScrollVOffset) {
								elem.css({visibility: 'hidden'});
							} else {
								elem.css({visibility: 'visible'});
								
								var contentScroll;
								if (el.is('body')) {
									if (axis == axisY) {
										contentScroll = $(document).scrollTop();
									} else {
										contentScroll = $(document).scrollLeft();
									}
								} else {
									if (axis == axisY) {
										contentScroll = el.scrollTop();
									} else {
										contentScroll = el.scrollLeft();
									}
								}
								var slider_x = scroll_x * (scroll_x / content_x) - textareaResizeOffset - scrollBut_x * 2;
								
								if (slider_x < _options.scrollMinHeight) {
									if (scroll_x - textareaResizeOffset < _options.scrollMinHeight) {
										slider_x = scroll_x * 0.75;
									} else {
										slider_x = _options.scrollMinHeight;
									}
								}

								var contentScrollCoeff = contentScroll / (content_x - scroll_x - eScrollVOffset);
								var scroll_axis = Number((scroll_x - slider_x - textareaResizeOffset - scrollBut_x * 2) * contentScrollCoeff + scrollBut_x).toFixed(0);
								var scroll_coefx = scroll_x / (slider_x + scrollBut_x * 2);
								var elemSlider = elem.find('> .' + elemClass + '_slider');
								if (axis == axisY) {
									scroll_top = scroll_axis;
									scroll_coefV = scroll_coefx;
									elemSlider.css({
										height: parseInt(Number(slider_x).toFixed(0)) - _options.scrollOffset * 2 + 'px',
										top: scroll_top + 'px'
									});
								} else {
									scroll_left = scroll_axis;
									scroll_coefH = scroll_coefx;
									elemSlider.css({
										width: parseInt(Number(slider_x).toFixed(0)) - _options.scrollOffset * 2 + 'px',
										left: scroll_left + 'px'
									});
								}
								
							}
						}
					}
					scrollSliderInit(axisY);
					if (_options.scrollHorizontal) {
						scrollSliderInit(axisX);
					}
				}
				_init();

				
				if (el.is('body')) {
					var elEvt = $(document);
				} else {
					var elEvt = el;
				}
				elEvt.scroll(function() {
					_init('scroll');
				});
				
				
				function autoResize() {
					var resizeTimer = setTimeout(function() {
						clearTimeout(resizeTimer);
						_init('resize');
					}, 100);
				}
				
				el.resize(autoResize);
				
				el.attrchange({
					callback: function() {
						autoResize();
					}
				});
				

				el.bind('mousewheel DOMMouseScroll', function(event) {
					if (!ctrlActive && $(event.target).css('overflow') != 'auto' && $(event.target).css('overflow') != 'scroll') {
						var evt = event.originalEvent,
						delta = evt.wheelDelta || -evt.detail;
						if (delta < 0) {
							delta = 1;
						} else {
							delta = -1;
						}
						if (el.is('body')) {
							if (eScrollV.css('visibility') == 'visible') {
								$(document).scrollTop($(document).scrollTop() +  delta * _options.scrollStep);
							} else {
								if (_options.scrollHorizontal) {
									$(document).scrollLeft($(document).scrollLeft() + delta * _options.scrollStep);
								}
							}
						} else {
							if (eScrollV.css('visibility') == 'visible') {
								this.scrollTop += delta * _options.scrollStep;
							} else {
								if (_options.scrollHorizontal) {
									this.scrollLeft += delta * _options.scrollStep;
								}
							}
						}
						event.preventDefault();
						return false;
					}
				});


				function scrollEvents(axis) {
					if (axis == axisY) {
						var elem = eScrollV;
					} else {
						var elem = eScrollH;
					}
					
					elem.bind('mousewheel DOMMouseScroll', function(event) {
						if (!ctrlActive) {
							var evt = event.originalEvent,
							delta = evt.wheelDelta || -evt.detail;
							if (el.is('body')) {
								if (axis == axisY) {
									$(document).scrollTop($(document).scrollTop() + ( delta < 0 ? 1 : -1 ) * _options.scrollStep);
								} else {
									if (_options.scrollHorizontal) {
										$(document).scrollLeft($(document).scrollLeft() + ( delta < 0 ? 1 : -1 ) * _options.scrollStep);
									}
								}
							} else {
								if (axis == axisY) {
									el[0].scrollTop += ( delta < 0 ? 1 : -1 ) * _options.scrollStep;
								} else {
									if (_options.scrollHorizontal) {
										el[0].scrollLeft += ( delta < 0 ? 1 : -1 ) * _options.scrollStep;
									}
								}
							}
							event.preventDefault();
							return false;
						}
					});
					
					
					elem.find('> .' + elemClass + '_slider').mousedown(function(event) {
						event.preventDefault();
						if (el.is('body')) {
							if (axis == axisY) {
								var curSTop = $(document).scrollTop();
							} else {
								var curSTop = $(document).scrollLeft();
							}
						} else {
							if (axis == axisY) {
								var curSTop = el[0].scrollTop;
							} else {
								var curSTop = el[0].scrollLeft;
							}
						}
						if (axis == axisY) {
							$(this).data('down', true).data('y', event.clientY - curSTop / scroll_coefV);
						} else {
							$(this).data('down', true).data('x', event.clientX - curSTop / scroll_coefH);
						}
						$(this).parent().addClass('active');
					});

					
					elem.click(function(event) {
						if (elem.is($(event.target))) {
							if (!elem.find('> .' + elemClass + '_slider').data('down')) {
								if (axis == axisY) {
									var scroll_axis = scroll_top;
									var coord = event.pageY - parseInt($(this).offset().top);
									var elemSliderSize = parseInt(elem.find('> .' + elemClass + '_slider').outerHeight());
								} else {
									var scroll_axis = scroll_left;
									var coord = event.pageX - parseInt($(this).offset().left);
									var elemSliderSize = parseInt(elem.find('> .' + elemClass + '_slider').outerWidth());
								}
								if (coord > parseInt(scroll_axis) + elemSliderSize) {
									scrollByStep('down', 1, axis, el);
								} else {
									scrollByStep('up', 1, axis, el);
								}
							}
						}
					});
				}
				scrollEvents(axisY);
				if (_options.scrollHorizontal) {
					scrollEvents(axisX);
				}
				

				$('html').mousemove(function(event) {
					function scrollSliderMove(axis) {
						if (axis == axisY) {
							var elem = eScrollV;
						} else {
							var elem = eScrollH;
						}
						if (elem != undefined && elem.find('> .' + elemClass + '_slider').data('down')) {
							if (axis == axisY) {
								var curSTop = (event.clientY - elem.find('> .' + elemClass + '_slider').data('y')) * scroll_coefV;
							} else {
								var curSTop = (event.clientX - elem.find('> .' + elemClass + '_slider').data('x')) * scroll_coefH;
							}
							if (el.is('body')) {
								if (axis == axisY) {
									$(document).scrollTop(curSTop);
								} else {
									$(document).scrollLeft(curSTop);
								}
							} else {
								if (axis == axisY) {
									el[0].scrollTop = curSTop;
								} else {
									el[0].scrollLeft = curSTop;
								}
							}
						}
					}
					scrollSliderMove(axisY);
					if (_options.scrollHorizontal) {
						scrollSliderMove(axisX);
					}
				});


				$('html').mouseup(function() {
					if (eScrollV != undefined && eScrollV.find('> .' + elemClass + '_slider').data('down')) {
						eScrollV.find('> .' + elemClass + '_slider').data('down', false);
						eScrollV.removeClass('active');
					}
					if (_options.scrollHorizontal) {
						if (eScrollH != undefined && eScrollH.find('> .' + elemClass + '_slider').data('down')) {
							eScrollH.find('> .' + elemClass + '_slider').data('down', false);
							eScrollH.removeClass('active');
						}
					}
				});

				
				function scrollButClick(axis) {
					function continueScroll(elem, dir, once) {
						if (once) {
							scrollByStep(dir, 1, axis, el);
						} else {
							elem.mouseup(function(){
								clearInterval(focus);
							});
							var focus = setInterval(function() {
								scrollByStep(dir, 1, axis, el);
							}, 100);
						}
					}
					if (axis == axisY) {
						eScrollV.find('> .' + elemClass + '_scrollBut.scrollButTop').bind('mousedown click', function(event) {
							if (event.type == 'mousedown') {
								continueScroll($(this), 'up');
							} else {
								continueScroll($(this), 'up', true);
							}
						});
						eScrollV.find('> .' + elemClass + '_scrollBut.scrollButBottom').bind('mousedown click', function(event) {
							if (event.type == 'mousedown') {
								continueScroll($(this), 'down');
							} else {
								continueScroll($(this), 'down', true);
							}
						});
					} else {
						eScrollH.find('> .' + elemClass + '_scrollBut.scrollButLeft').bind('mousedown click', function(event) {
							if (event.type == 'mousedown') {
								continueScroll($(this), 'up');
							} else {
								continueScroll($(this), 'up', true);
							}
						});
						
						eScrollH.find('> .' + elemClass + '_scrollBut.scrollButRight').bind('mousedown click', function(event) {
							if (event.type == 'mousedown') {
								continueScroll($(this), 'down');
							} else {
								continueScroll($(this), 'down', true);
							}
						});
					}
				}
				if (_options.scrollButtons) {
					scrollButClick(axisY);
					if (_options.scrollHorizontal) {
						scrollButClick(axisX);
					}
				}

				
			}
		
		}
	
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		
	});
		
	}

} else {
	$.fn.easyScroll = function(){};
}
})(jQuery);

});


/**
A simple jQuery function that can add listeners on attribute change. - v1.0.1-1
http://meetselva.github.io/attrchange/

About License:
Copyright (C) 2013 Selvakumar Arumugam
You may use attrchange plugin under the terms of the MIT Licese.
https://github.com/meetselva/attrchange/blob/master/MIT-License.txt
*/
(function(e){function h(){var a=document.createElement("p"),b=!1;if(a.addEventListener)a.addEventListener("DOMAttrModified",function(){b=!0},!1);else if(a.attachEvent)a.attachEvent("onDOMAttrModified",function(){b=!0});else return!1;a.setAttribute("id","target");return b}function k(a,b){if(a){var c=this.data("attr-old-value");if(0<=b.attributeName.indexOf("style")){c.style||(c.style={});var d=b.attributeName.split(".");b.attributeName=d[0];b.oldValue=c.style[d[1]];b.newValue=d[1]+":"+this.prop("style")[e.camelCase(d[1])];
c.style[d[1]]=b.newValue}else b.oldValue=c[b.attributeName],b.newValue=this.attr(b.attributeName),c[b.attributeName]=b.newValue;this.data("attr-old-value",c)}}var f=window.MutationObserver||window.WebKitMutationObserver;e.fn.attrchange=function(a,b){if("object"==typeof a)return g._core.call(this,a);if("string"==typeof a)return g._ext.call(this,a,b)};var g={_core:function(a){var b={trackValues:!1,callback:e.noop};"function"===typeof a?b.callback=a:e.extend(b,a);b.trackValues&&this.each(function(b,
a){var c={},d;b=0;for(var f=a.attributes,g=f.length;b<g;b++)d=f.item(b),c[d.nodeName]=d.value;e(this).data("attr-old-value",c)});if(f){var c={subtree:!1,attributes:!0,attributeOldValue:b.trackValues},d=new f(function(a){a.forEach(function(a){var c=a.target;b.trackValues&&(a.newValue=e(c).attr(a.attributeName));b.callback.call(c,a)})});return this.data("attrchange-method","Mutation Observer").data("attrchange-obs",d).each(function(){d.observe(this,c)})}return h()?this.data("attrchange-method","DOMAttrModified").on("DOMAttrModified",
function(a){a.originalEvent&&(a=a.originalEvent);a.attributeName=a.attrName;a.oldValue=a.prevValue;b.callback.call(this,a)}):"onpropertychange"in document.body?this.data("attrchange-method","propertychange").on("propertychange",function(a){a.attributeName=window.event.propertyName;k.call(e(this),b.trackValues,a);b.callback.call(this,a)}):this},_ext:function(a,b){switch(a){case "disconnect":return this.each(function(){var a=e(this).data("attrchange-method");"propertychange"==a||"DOMAttrModified"==
a?e(this).off(a):"Mutation Observer"==a&&e(this).data("attrchange-obs").disconnect()}).removeData("attrchange-method")}}}})(jQuery);


/**
jQuery resize event - v1.1 - 3/14/2010
http://benalman.com/projects/jquery-resize-plugin/

Copyright (c) 2010 "Cowboy" Ben Alman
Dual licensed under the MIT and GPL licenses.
http://benalman.com/about/license/
*/
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
