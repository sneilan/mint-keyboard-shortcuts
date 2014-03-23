// ==UserScript==
// @name Mint.com Keyboard Shortcuts
// @description Adds a few simple keyboard shortcuts to Mint.com.
// @downloadURL http://github.com/schvenk/mint-keyboard-shortcuts
// @version 1.0
// @author Dave Feldman (http://operationproject.com)
// @match https://wwws.mint.com/transaction.event*
// ==/UserScript==

/* Licensed under the MIT License (http://opensource.org/licenses/MIT), though I'm not gonna
 * complain if you want to buy me a beer.
 */



var mintKeyboardShortcutsMain = function() {
	/**
	 * If an element with the supplied ID exist, trigger a click on it.
	 */
	var clickOn = function(elId) {
		var el = document.getElementById(elId);
		if (el) {
			el.click();
			return true;
		}
		return false;
	}
	
	/*
	 * Sets up a shortcut for a single checkbox in Mint's array of
	 * transaction tags.
	 * @param trigger - The key to bind. Standard keymaster formatting.
	 * @param title - The title of the checkbox (technically, the title attr of the label tag).
	 */
	var setTagKey = function(trigger, title) {
		key(trigger, function() {
			var labels = document.getElementById('txnEdit-tags-list').getElementsByTagName('label');
			for (var i = 0; i < labels.length; i++) {
				if (labels[i].title == title) {
					labels[i].children[0].click();
					break;
				}
			}
		});
	}

	// Open/close the transaction editor for the selected transaction.
	key('ctrl+e, e', function() {
		if (!clickOn('txnEdit-toggle')) {
			clickOn('txnEdit-cancel');
		}
	});

	// Close and save the selected transaction.
	key('ctrl+s, s', function() {
		clickOn('txnEdit-submit');
	});

	// Focus and select the category field.
	key('ctrl+c, c', function(e) {
		var el = document.getElementById('txnEdit-category_input');
		console.log(el);
		if (el) {
			el.focus();
			el.select();
		}
		e.preventDefault();
		return false;
	});

	// Toggle various transaction tags once the editor is open.
	setTagKey('t', 'Tax Related');
	setTagKey('b', 'Business');
	setTagKey('r', 'Reimbursable');
};




// Embed keymaster.js (https://github.com/madrobby/keymaster, MIT License)
(function(global){var k,_handlers={},_mods={16:false,18:false,17:false,91:false},_scope="all",_MODIFIERS={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},_MAP={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},code=function(x){return _MAP[x]||x.toUpperCase().charCodeAt(0)},_downKeys=[];for(k=1;k<20;k++)_MAP["f"+k]=111+k;function index(array,item){var i=array.length;while(i--)if(array[i]===item)return i;return-1}function compareArray(a1,a2){if(a1.length!=a2.length)return false;for(var i=0;i<a1.length;i++){if(a1[i]!==a2[i])return false}return true}var modifierMap={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};function updateModifierKey(event){for(k in _mods)_mods[k]=event[modifierMap[k]]}function dispatch(event){var key,handler,k,i,modifiersMatch,scope;key=event.keyCode;if(index(_downKeys,key)==-1){_downKeys.push(key)}if(key==93||key==224)key=91;if(key in _mods){_mods[key]=true;for(k in _MODIFIERS)if(_MODIFIERS[k]==key)assignKey[k]=true;return}updateModifierKey(event);if(!assignKey.filter.call(this,event))return;if(!(key in _handlers))return;scope=getScope();for(i=0;i<_handlers[key].length;i++){handler=_handlers[key][i];if(handler.scope==scope||handler.scope=="all"){modifiersMatch=handler.mods.length>0;for(k in _mods)if(!_mods[k]&&index(handler.mods,+k)>-1||_mods[k]&&index(handler.mods,+k)==-1)modifiersMatch=false;if(handler.mods.length==0&&!_mods[16]&&!_mods[18]&&!_mods[17]&&!_mods[91]||modifiersMatch){if(handler.method(event,handler)===false){if(event.preventDefault)event.preventDefault();else event.returnValue=false;if(event.stopPropagation)event.stopPropagation();if(event.cancelBubble)event.cancelBubble=true}}}}}function clearModifier(event){var key=event.keyCode,k,i=index(_downKeys,key);if(i>=0){_downKeys.splice(i,1)}if(key==93||key==224)key=91;if(key in _mods){_mods[key]=false;for(k in _MODIFIERS)if(_MODIFIERS[k]==key)assignKey[k]=false}}function resetModifiers(){for(k in _mods)_mods[k]=false;for(k in _MODIFIERS)assignKey[k]=false}function assignKey(key,scope,method){var keys,mods;keys=getKeys(key);if(method===undefined){method=scope;scope="all"}for(var i=0;i<keys.length;i++){mods=[];key=keys[i].split("+");if(key.length>1){mods=getMods(key);key=[key[key.length-1]]}key=key[0];key=code(key);if(!(key in _handlers))_handlers[key]=[];_handlers[key].push({shortcut:keys[i],scope:scope,method:method,key:keys[i],mods:mods})}}function unbindKey(key,scope){var multipleKeys,keys,mods=[],i,j,obj;multipleKeys=getKeys(key);for(j=0;j<multipleKeys.length;j++){keys=multipleKeys[j].split("+");if(keys.length>1){mods=getMods(keys);key=keys[keys.length-1]}key=code(key);if(scope===undefined){scope=getScope()}if(!_handlers[key]){return}for(i=0;i<_handlers[key].length;i++){obj=_handlers[key][i];if(obj.scope===scope&&compareArray(obj.mods,mods)){_handlers[key][i]={}}}}}function isPressed(keyCode){if(typeof keyCode=="string"){keyCode=code(keyCode)}return index(_downKeys,keyCode)!=-1}function getPressedKeyCodes(){return _downKeys.slice(0)}function filter(event){var tagName=(event.target||event.srcElement).tagName;return!(tagName=="INPUT"||tagName=="SELECT"||tagName=="TEXTAREA")}for(k in _MODIFIERS)assignKey[k]=false;function setScope(scope){_scope=scope||"all"}function getScope(){return _scope||"all"}function deleteScope(scope){var key,handlers,i;for(key in _handlers){handlers=_handlers[key];for(i=0;i<handlers.length;){if(handlers[i].scope===scope)handlers.splice(i,1);else i++}}}function getKeys(key){var keys;key=key.replace(/\s/g,"");keys=key.split(",");if(keys[keys.length-1]==""){keys[keys.length-2]+=","}return keys}function getMods(key){var mods=key.slice(0,key.length-1);for(var mi=0;mi<mods.length;mi++)mods[mi]=_MODIFIERS[mods[mi]];return mods}function addEvent(object,event,method){if(object.addEventListener)object.addEventListener(event,method,false);else if(object.attachEvent)object.attachEvent("on"+event,function(){method(window.event)})}addEvent(document,"keydown",function(event){dispatch(event)});addEvent(document,"keyup",clearModifier);addEvent(window,"focus",resetModifiers);var previousKey=global.key;function noConflict(){var k=global.key;global.key=previousKey;return k}global.key=assignKey;global.key.setScope=setScope;global.key.getScope=getScope;global.key.deleteScope=deleteScope;global.key.filter=filter;global.key.isPressed=isPressed;global.key.getPressedKeyCodes=getPressedKeyCodes;global.key.noConflict=noConflict;global.key.unbind=unbindKey;if(typeof module!=="undefined")module.exports=key})(this);


// Now do the stuff.
mintKeyboardShortcutsMain();
