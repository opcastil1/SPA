/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
 AngularJS v1.4.8
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(S,X,u){'use strict';function G(a){return function(){var b=arguments[0],d;d="["+(a?a+":":"")+b+"] http://errors.angularjs.org/1.4.8/"+(a?a+"/":"")+b;for(b=1;b<arguments.length;b++){d=d+(1==b?"?":"&")+"p"+(b-1)+"=";var c=encodeURIComponent,e;e=arguments[b];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;d+=c(e)}return Error(d)}}function za(a){if(null==a||Xa(a))return!1;if(I(a)||E(a)||B&&a instanceof B)return!0;
var b="length"in Object(a)&&a.length;return Q(b)&&(0<=b&&b-1 in a||"function"==typeof a.item)}function n(a,b,d){var c,e;if(a)if(z(a))for(c in a)"prototype"==c||"length"==c||"name"==c||a.hasOwnProperty&&!a.hasOwnProperty(c)||b.call(d,a[c],c,a);else if(I(a)||za(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==n)a.forEach(b,d,a);else if(nc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&
b.call(d,a[c],c,a);else for(c in a)qa.call(a,c)&&b.call(d,a[c],c,a);return a}function oc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function pc(a){return function(b,d){a(d,b)}}function Td(){return++nb}function Mb(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(H(g)||z(g))for(var h=Object.keys(g),k=0,l=h.length;k<l;k++){var m=h[k],r=g[m];d&&H(r)?da(r)?a[m]=new Date(r.valueOf()):Ma(r)?a[m]=new RegExp(r):r.nodeName?a[m]=r.cloneNode(!0):
Nb(r)?a[m]=r.clone():(H(a[m])||(a[m]=I(r)?[]:{}),Mb(a[m],[r],!0)):a[m]=r}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function M(a){return Mb(a,ra.call(arguments,1),!1)}function Ud(a){return Mb(a,ra.call(arguments,1),!0)}function ea(a){return parseInt(a,10)}function Ob(a,b){return M(Object.create(a),b)}function x(){}function Ya(a){return a}function na(a){return function(){return a}}function qc(a){return z(a.toString)&&a.toString!==sa}function q(a){return"undefined"===typeof a}function y(a){return"undefined"!==
typeof a}function H(a){return null!==a&&"object"===typeof a}function nc(a){return null!==a&&"object"===typeof a&&!rc(a)}function E(a){return"string"===typeof a}function Q(a){return"number"===typeof a}function da(a){return"[object Date]"===sa.call(a)}function z(a){return"function"===typeof a}function Ma(a){return"[object RegExp]"===sa.call(a)}function Xa(a){return a&&a.window===a}function Za(a){return a&&a.$evalAsync&&a.$watch}function $a(a){return"boolean"===typeof a}function sc(a){return a&&Q(a.length)&&
Vd.test(sa.call(a))}function Nb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function Wd(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function ta(a){return F(a.nodeName||a[0]&&a[0].nodeName)}function ab(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function bb(a,b){function d(a,b){var d=b.$$hashKey,e;if(I(a)){e=0;for(var f=a.length;e<f;e++)b.push(c(a[e]))}else if(nc(a))for(e in a)b[e]=c(a[e]);else if(a&&"function"===typeof a.hasOwnProperty)for(e in a)a.hasOwnProperty(e)&&
(b[e]=c(a[e]));else for(e in a)qa.call(a,e)&&(b[e]=c(a[e]));d?b.$$hashKey=d:delete b.$$hashKey;return b}function c(a){if(!H(a))return a;var b=e.indexOf(a);if(-1!==b)return f[b];if(Xa(a)||Za(a))throw Aa("cpws");var b=!1,c;I(a)?(c=[],b=!0):sc(a)?c=new a.constructor(a):da(a)?c=new Date(a.getTime()):Ma(a)?(c=new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),c.lastIndex=a.lastIndex):z(a.cloneNode)?c=a.cloneNode(!0):(c=Object.create(rc(a)),b=!0);e.push(a);f.push(c);return b?d(a,c):c}var e=[],f=[];if(b){if(sc(b))throw Aa("cpta");
if(a===b)throw Aa("cpi");I(b)?b.length=0:n(b,function(a,c){"$$hashKey"!==c&&delete b[c]});e.push(a);f.push(b);return d(a,b)}return c(a)}function ia(a,b){if(I(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(H(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function ma(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d==typeof b&&"object"==d)if(I(a)){if(!I(b))return!1;if((d=a.length)==b.length){for(c=
0;c<d;c++)if(!ma(a[c],b[c]))return!1;return!0}}else{if(da(a))return da(b)?ma(a.getTime(),b.getTime()):!1;if(Ma(a))return Ma(b)?a.toString()==b.toString():!1;if(Za(a)||Za(b)||Xa(a)||Xa(b)||I(b)||da(b)||Ma(b))return!1;d=$();for(c in a)if("$"!==c.charAt(0)&&!z(a[c])){if(!ma(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&y(b[c])&&!z(b[c]))return!1;return!0}return!1}function cb(a,b,d){return a.concat(ra.call(b,d))}function tc(a,b){var d=2<arguments.length?ra.call(arguments,2):
[];return!z(b)||b instanceof RegExp?b:d.length?function(){return arguments.length?b.apply(a,cb(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function Xd(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=u:Xa(b)?d="$WINDOW":b&&X===b?d="$DOCUMENT":Za(b)&&(d="$SCOPE");return d}function db(a,b){if("undefined"===typeof a)return u;Q(b)||(b=b?2:null);return JSON.stringify(a,Xd,b)}function uc(a){return E(a)?JSON.parse(a):a}function vc(a,
b){var d=Date.parse("Jan 01, 1970 00:00:00 "+a)/6E4;return isNaN(d)?b:d}function Pb(a,b,d){d=d?-1:1;var c=vc(b,a.getTimezoneOffset());b=a;a=d*(c-a.getTimezoneOffset());b=new Date(b.getTime());b.setMinutes(b.getMinutes()+a);return b}function ua(a){a=B(a).clone();try{a.empty()}catch(b){}var d=B("<div>").append(a).html();try{return a[0].nodeType===Na?F(d):d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+F(b)})}catch(c){return F(d)}}function wc(a){try{return decodeURIComponent(a)}catch(b){}}
function xc(a){var b={};n((a||"").split("&"),function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=wc(e),y(e)&&(f=y(f)?wc(f):!0,qa.call(b,e)?I(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function Qb(a){var b=[];n(a,function(a,c){I(a)?n(a,function(a){b.push(ja(c,!0)+(!0===a?"":"="+ja(a,!0)))}):b.push(ja(c,!0)+(!0===a?"":"="+ja(a,!0)))});return b.length?b.join("&"):""}function ob(a){return ja(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,
"=").replace(/%2B/gi,"+")}function ja(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function Yd(a,b){var d,c,e=Oa.length;for(c=0;c<e;++c)if(d=Oa[c]+b,E(d=a.getAttribute(d)))return d;return null}function Zd(a,b){var d,c,e={};n(Oa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});n(Oa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":",
"\\:")+"]"))&&(d=e,c=e.getAttribute(b))});d&&(e.strictDi=null!==Yd(d,"strict-di"),b(d,c?[c]:[],e))}function yc(a,b,d){H(d)||(d={});d=M({strictDi:!1},d);var c=function(){a=B(a);if(a.injector()){var c=a[0]===X?"document":ua(a);throw Aa("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=eb(b,d.strictDi);c.invoke(["$rootScope",
"$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;S&&e.test(S.name)&&(d.debugInfoEnabled=!0,S.name=S.name.replace(e,""));if(S&&!f.test(S.name))return c();S.name=S.name.replace(f,"");fa.resumeBootstrap=function(a){n(a,function(a){b.push(a)});return c()};z(fa.resumeDeferredBootstrap)&&fa.resumeDeferredBootstrap()}function $d(){S.name="NG_ENABLE_DEBUG_INFO!"+S.name;S.location.reload()}
function ae(a){a=fa.element(a).injector();if(!a)throw Aa("test");return a.get("$$testability")}function zc(a,b){b=b||"_";return a.replace(be,function(a,c){return(c?b:"")+a.toLowerCase()})}function ce(){var a;if(!Ac){var b=pb();(oa=q(b)?S.jQuery:b?S[b]:u)&&oa.fn.on?(B=oa,M(oa.fn,{scope:Pa.scope,isolateScope:Pa.isolateScope,controller:Pa.controller,injector:Pa.injector,inheritedData:Pa.inheritedData}),a=oa.cleanData,oa.cleanData=function(b){var c;if(Rb)Rb=!1;else for(var e=0,f;null!=(f=b[e]);e++)(c=
oa._data(f,"events"))&&c.$destroy&&oa(f).triggerHandler("$destroy");a(b)}):B=N;fa.element=B;Ac=!0}}function qb(a,b,d){if(!a)throw Aa("areq",b||"?",d||"required");return a}function Qa(a,b,d){d&&I(a)&&(a=a[a.length-1]);qb(z(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ra(a,b){if("hasOwnProperty"===a)throw Aa("badname",b);}function Bc(a,b,d){if(!b)return a;b=b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&
z(a)?tc(e,a):a}function rb(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=B(ra.call(a,0,e))),c.push(b);return c||a}function $(){return Object.create(null)}function de(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=G("$injector"),c=G("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||G;return b(a,"module",function(){var a={};return function(f,g,h){if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,
d,e,f){f||(f=c);return function(){f[e||"push"]([b,d,arguments]);return v}}function b(a,d){return function(b,e){e&&z(e)&&(e.$$moduleName=f);c.push([a,d,arguments]);return v}}if(!g)throw d("nomod",f);var c=[],e=[],t=[],A=a("$injector","invoke","push",e),v={_invokeQueue:c,_configBlocks:e,_runBlocks:t,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide",
"decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:A,run:function(a){t.push(a);return this}};h&&A(h);return v})}})}function ee(a){M(a,{bootstrap:yc,copy:bb,extend:M,merge:Ud,equals:ma,element:B,forEach:n,injector:eb,noop:x,bind:tc,toJson:db,fromJson:uc,identity:Ya,isUndefined:q,isDefined:y,isString:E,isFunction:z,isObject:H,isNumber:Q,isElement:Nb,isArray:I,
version:fe,isDate:da,lowercase:F,uppercase:sb,callbacks:{counter:0},getTestability:ae,$$minErr:G,$$csp:Ba,reloadWithDebugInfo:$d});Sb=de(S);Sb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:ge});a.provider("$compile",Cc).directive({a:he,input:Dc,textarea:Dc,form:ie,script:je,select:ke,style:le,option:me,ngBind:ne,ngBindHtml:oe,ngBindTemplate:pe,ngClass:qe,ngClassEven:re,ngClassOdd:se,ngCloak:te,ngController:ue,ngForm:ve,ngHide:we,ngIf:xe,ngInclude:ye,ngInit:ze,ngNonBindable:Ae,
ngPluralize:Be,ngRepeat:Ce,ngShow:De,ngStyle:Ee,ngSwitch:Fe,ngSwitchWhen:Ge,ngSwitchDefault:He,ngOptions:Ie,ngTransclude:Je,ngModel:Ke,ngList:Le,ngChange:Me,pattern:Ec,ngPattern:Ec,required:Fc,ngRequired:Fc,minlength:Gc,ngMinlength:Gc,maxlength:Hc,ngMaxlength:Hc,ngValue:Ne,ngModelOptions:Oe}).directive({ngInclude:Pe}).directive(tb).directive(Ic);a.provider({$anchorScroll:Qe,$animate:Re,$animateCss:Se,$$animateQueue:Te,$$AnimateRunner:Ue,$browser:Ve,$cacheFactory:We,$controller:Xe,$document:Ye,$exceptionHandler:Ze,
$filter:Jc,$$forceReflow:$e,$interpolate:af,$interval:bf,$http:cf,$httpParamSerializer:df,$httpParamSerializerJQLike:ef,$httpBackend:ff,$xhrFactory:gf,$location:hf,$log:jf,$parse:kf,$rootScope:lf,$q:mf,$$q:nf,$sce:of,$sceDelegate:pf,$sniffer:qf,$templateCache:rf,$templateRequest:sf,$$testability:tf,$timeout:uf,$window:vf,$$rAF:wf,$$jqLite:xf,$$HashMap:yf,$$cookieReader:zf})}])}function fb(a){return a.replace(Af,function(a,d,c,e){return e?c.toUpperCase():c}).replace(Bf,"Moz$1")}function Kc(a){a=a.nodeType;
return 1===a||!a||9===a}function Lc(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(Tb.test(a)){d=d||e.appendChild(b.createElement("div"));c=(Cf.exec(a)||["",""])[1].toLowerCase();c=ka[c]||ka._default;d.innerHTML=c[1]+a.replace(Df,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=cb(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";n(f,function(a){e.appendChild(a)});return e}function N(a){if(a instanceof N)return a;var b;E(a)&&(a=U(a),
b=!0);if(!(this instanceof N)){if(b&&"<"!=a.charAt(0))throw Ub("nosel");return new N(a)}if(b){b=X;var d;a=(d=Ef.exec(a))?[b.createElement(d[1])]:(d=Lc(a,b))?d.childNodes:[]}Mc(this,a)}function Vb(a){return a.cloneNode(!0)}function ub(a,b){b||vb(a);if(a.querySelectorAll)for(var d=a.querySelectorAll("*"),c=0,e=d.length;c<e;c++)vb(d[c])}function Nc(a,b,d,c){if(y(c))throw Ub("offargs");var e=(c=wb(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];y(d)&&ab(c||[],d);y(d)&&c&&0<c.length||
(a.removeEventListener(b,f,!1),delete e[b])};n(b.split(" "),function(a){g(a);xb[a]&&g(xb[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f,!1),delete e[b]}function vb(a,b){var d=a.ng339,c=d&&gb[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),Nc(a)),delete gb[d],a.ng339=u))}function wb(a,b){var d=a.ng339,d=d&&gb[d];b&&!d&&(a.ng339=d=++Ff,d=gb[d]={events:{},data:{},handle:u});return d}function Wb(a,b,d){if(Kc(a)){var c=y(d),e=!c&&b&&!H(b),f=!b;a=(a=wb(a,
!e))&&a.data;if(c)a[b]=d;else{if(f)return a;if(e)return a&&a[b];M(a,b)}}}function yb(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function zb(a,b){b&&a.setAttribute&&n(b.split(" "),function(b){a.setAttribute("class",U((" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+U(b)+" "," ")))})}function Ab(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");n(b.split(" "),
function(a){a=U(a);-1===d.indexOf(" "+a+" ")&&(d+=a+" ")});a.setAttribute("class",U(d))}}function Mc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function Oc(a,b){return Bb(a,"$"+(b||"ngController")+"Controller")}function Bb(a,b,d){9==a.nodeType&&(a=a.documentElement);for(b=I(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(y(d=B.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&
a.host}}function Pc(a){for(ub(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Xb(a,b){b||ub(a);var d=a.parentNode;d&&d.removeChild(a)}function Gf(a,b){b=b||S;if("complete"===b.document.readyState)b.setTimeout(a);else B(b).on("load",a)}function Qc(a,b){var d=Cb[b.toLowerCase()];return d&&Rc[ta(a)]&&d}function Hf(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=b[d||c.type],g=f?f.length:0;if(g){if(q(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;
c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var k=f.specialHandlerWrapper||If;1<g&&(f=ia(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||k(a,c,f[l])}};d.elem=a;return d}function If(a,b,d){d.call(a,b)}function Jf(a,b,d){var c=b.relatedTarget;c&&(c===a||Kf.call(a,c))||d.call(a,b)}function xf(){this.$get=function(){return M(N,
{hasClass:function(a,b){a.attr&&(a=a[0]);return yb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Ab(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return zb(a,b)}})}}function Ca(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"==d||"object"==d&&null!==a?a.$$hashKey=d+":"+(b||Td)():d+":"+a}function Sa(a,b){if(b){var d=0;this.nextUid=function(){return++d}}n(a,this.put,this)}function Lf(a){return(a=a.toString().replace(Sc,"").match(Tc))?
"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function eb(a,b){function d(a){return function(b,c){if(H(b))n(b,pc(a));else return a(b,c)}}function c(a,b){Ra(a,"service");if(z(b)||I(b))b=t.instantiate(b);if(!b.$get)throw Da("pget",a);return r[a+"Provider"]=b}function e(a,b){return function(){var c=v.invoke(b,this);if(q(c))throw Da("undef",a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){qb(q(a)||I(a),"modulesToLoad","not an array");var b=[],c;n(a,function(a){function d(a){var b,
c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=t.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{E(a)?(c=Sb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):z(a)?b.push(t.invoke(a)):I(a)?b.push(t.invoke(a)):Qa(a,"module")}catch(e){throw I(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Da("modulerr",a,e.stack||e.message||e);}}});return b}function h(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===
k)throw Da("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=k,a[b]=c(b,e)}catch(f){throw a[b]===k&&delete a[b],f;}finally{l.shift()}}function e(a,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=eb.$$annotate(a,b,g),l,m,t;m=0;for(l=k.length;m<l;m++){t=k[m];if("string"!==typeof t)throw Da("itkn",t);h.push(f&&f.hasOwnProperty(t)?f[t]:d(t,g))}I(a)&&(a=a[l]);return a.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((I(a)?a[a.length-1]:a).prototype||
null);a=e(a,d,b,c);return H(a)||z(a)?a:d},get:d,annotate:eb.$$annotate,has:function(b){return r.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var k={},l=[],m=new Sa([],!0),r={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,na(b),!1)}),constant:d(function(a,b){Ra(a,"constant");r[a]=b;A[a]=b}),decorator:function(a,b){var c=t.get(a+"Provider"),d=c.$get;c.$get=function(){var a=
v.invoke(d,c);return v.invoke(b,null,{$delegate:a})}}}},t=r.$injector=h(r,function(a,b){fa.isString(b)&&l.push(b);throw Da("unpr",l.join(" <- "));}),A={},v=A.$injector=h(A,function(a,b){var c=t.get(a+"Provider",b);return v.invoke(c.$get,c,u,a)});n(g(a),function(a){a&&v.invoke(a)});return v}function Qe(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ta(a))return b=
a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;z(c)?c=c():Nb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):Q(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=E(a)?a:d.hash();var b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||Gf(function(){c.$evalAsync(g)})});
return g}]}function hb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;I(a)&&(a=a.join(" "));I(b)&&(b=b.join(" "));return a+" "+b}function Mf(a){E(a)&&(a=a.split(" "));var b=$();n(a,function(a){a.length&&(b[a]=!0)});return b}function Ea(a){return H(a)?a:{}}function Nf(a,b,d,c){function e(a){try{a.apply(null,ra.call(arguments,1))}finally{if(v--,0===v)for(;T.length;)try{T.pop()()}catch(b){d.error(b)}}}function f(){L=null;g();h()}function g(){a:{try{p=m.state;break a}catch(a){}p=void 0}p=q(p)?
null:p;ma(p,J)&&(p=J);J=p}function h(){if(w!==k.url()||C!==p)w=k.url(),C=p,n(aa,function(a){a(k.url(),p)})}var k=this,l=a.location,m=a.history,r=a.setTimeout,t=a.clearTimeout,A={};k.isMock=!1;var v=0,T=[];k.$$completeOutstandingRequest=e;k.$$incOutstandingRequestCount=function(){v++};k.notifyWhenNoOutstandingRequests=function(a){0===v?a():T.push(a)};var p,C,w=l.href,ga=b.find("base"),L=null;g();C=p;k.url=function(b,d,e){q(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=
C===e;if(w===b&&(!c.history||f))return k;var h=w&&Fa(w)===Fa(b);w=b;C=e;if(!c.history||h&&f){if(!h||L)L=b;d?l.replace(b):h?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b;l.href!==b&&(L=b)}else m[d?"replaceState":"pushState"](e,"",b),g(),C=p;return k}return L||l.href.replace(/%27/g,"'")};k.state=function(){return p};var aa=[],D=!1,J=null;k.onUrlChange=function(b){if(!D){if(c.history)B(a).on("popstate",f);B(a).on("hashchange",f);D=!0}aa.push(b);return b};k.$$applicationDestroyed=function(){B(a).off("hashchange popstate",
f)};k.$$checkUrlChange=h;k.baseHref=function(){var a=ga.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};k.defer=function(a,b){var c;v++;c=r(function(){delete A[c];e(a)},b||0);A[c]=!0;return c};k.defer.cancel=function(a){return A[a]?(delete A[a],t(a),e(x),!0):!1}}function Ve(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new Nf(a,c,b,d)}]}function We(){this.$get=function(){function a(a,c){function e(a){a!=r&&(t?t==a&&(t=a.n):t=a,f(a.n,a.p),f(a,r),r=a,
r.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw G("$cacheFactory")("iid",a);var g=0,h=M({},c,{id:a}),k=$(),l=c&&c.capacity||Number.MAX_VALUE,m=$(),r=null,t=null;return b[a]={put:function(a,b){if(!q(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in k||g++;k[a]=b;g>l&&this.remove(t.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==r&&(r=b.p);b==t&&
(t=b.n);f(b.n,b.p);delete m[a]}a in k&&(delete k[a],g--)},removeAll:function(){k=$();g=0;m=$();r=t=null},destroy:function(){m=h=k=null;delete b[a]},info:function(){return M({},h,{size:g})}}}var b={};a.info=function(){var a={};n(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function rf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Cc(a,b){function d(a,b,c){var d=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,e={};n(a,function(a,f){var g=a.match(d);
if(!g)throw ha("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f}});return e}function c(a){var b=a.charAt(0);if(!b||b!==F(b))throw ha("baddir",a);if(a!==a.trim())throw ha("baddir",a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=Wd("ngSrc,ngSrcset,src,srcset"),k=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function t(b,f){Ra(b,"directive");
E(b)?(c(b),qb(f,"directiveFactory"),e.hasOwnProperty(b)||(e[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var f=[];n(e[b],function(e,g){try{var h=a.invoke(e);z(h)?h={compile:na(h)}:!h.compile&&h.link&&(h.compile=na(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";var k=h,l=h,m=h.name,t={isolateScope:null,bindToController:null};H(l.scope)&&(!0===l.bindToController?(t.bindToController=d(l.scope,
m,!0),t.isolateScope={}):t.isolateScope=d(l.scope,m,!1));H(l.bindToController)&&(t.bindToController=d(l.bindToController,m,!0));if(H(t.bindToController)){var v=l.controller,R=l.controllerAs;if(!v)throw ha("noctrl",m);var V;a:if(R&&E(R))V=R;else{if(E(v)){var n=Uc.exec(v);if(n){V=n[3];break a}}V=void 0}if(!V)throw ha("noident",m);}var s=k.$$bindings=t;H(s.isolateScope)&&(h.$$isolateBindings=s.isolateScope);h.$$moduleName=e.$$moduleName;f.push(h)}catch(u){c(u)}});return f}])),e[b].push(f)):n(b,pc(t));
return this};this.aHrefSanitizationWhitelist=function(a){return y(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return y(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var m=!0;this.debugInfoEnabled=function(a){return y(a)?(m=a,this):m};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,
b,c,d,p,C,w,ga,L,aa,D){function J(a,b){try{a.addClass(b)}catch(c){}}function K(a,b,c,d,e){a instanceof B||(a=B(a));n(a,function(b,c){b.nodeType==Na&&b.nodeValue.match(/\S+/)&&(a[c]=B(b).wrap("<span></span>").parent()[0])});var f=O(a,b,a,c,d,e);K.$$addScopeClass(a);var g=null;return function(b,c,d){qb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var h=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;h&&h.$$boundTransclude&&(h=h.$$boundTransclude);g||(g=(d=
d&&d[0])?"foreignobject"!==ta(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?B(Yb(g,B("<div>").append(a).html())):c?Pa.clone.call(a):a;if(k)for(var l in k)d.data("$"+l+"Controller",k[l].instance);K.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,h);return d}}function O(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,t,w,D;if(p)for(D=Array(c.length),m=0;m<h.length;m+=3)f=h[m],D[f]=c[f];else D=c;m=0;for(t=h.length;m<t;)k=D[h[m++]],c=h[m++],f=h[m++],c?(c.scope?(l=a.$new(),K.$$addScopeInfo(B(k),
l)):l=a,w=c.transcludeOnThisElement?R(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?R(a,b):null,c(f,l,k,d,w)):f&&f(a,k.childNodes,u,e)}for(var h=[],k,l,m,t,p,w=0;w<a.length;w++){k=new fa;l=V(a[w],[],k,0===w?d:u,e);(f=l.length?Z(l,a[w],k,b,c,null,[],[],f):null)&&f.scope&&K.$$addScopeClass(k.$$element);k=f&&f.terminal||!(m=a[w].childNodes)||!m.length?null:O(m,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(w,f,k),t=!0,p=p||f;f=null}return t?g:null}function R(a,
b,c){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function V(a,b,c,d,e){var h=c.$attr,k;switch(a.nodeType){case 1:P(b,va(ta(a)),"E",d,e);for(var l,m,t,p=a.attributes,w=0,D=p&&p.length;w<D;w++){var K=!1,A=!1;l=p[w];k=l.name;m=U(l.value);l=va(k);if(t=ka.test(l))k=k.replace(Vc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});(l=l.match(la))&&G(l[1])&&(K=k,A=k.substr(0,k.length-
5)+"end",k=k.substr(0,k.length-6));l=va(k.toLowerCase());h[l]=k;if(t||!c.hasOwnProperty(l))c[l]=m,Qc(a,l)&&(c[l]=!0);W(a,b,m,l,t);P(b,l,"A",d,e,K,A)}a=a.className;H(a)&&(a=a.animVal);if(E(a)&&""!==a)for(;k=g.exec(a);)l=va(k[2]),P(b,l,"C",d,e)&&(c[l]=U(k[3])),a=a.substr(k.index+k[0].length);break;case Na:if(11===Ha)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===Na;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);N(b,a.nodeValue);break;case 8:try{if(k=f.exec(a.nodeValue))l=
va(k[1]),P(b,l,"M",d,e)&&(c[l]=U(k[2]))}catch(R){}}b.sort(Ia);return b}function Ta(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ha("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return B(d)}function s(a,b,c){return function(d,e,f,g,h){e=Ta(e[0],b,c);return a(d,e,f,g,h)}}function Z(a,b,d,e,f,g,h,l,m){function t(a,b,c,d){if(a){c&&(a=s(a,c,d));a.require=q.require;a.directiveName=x;if(O===
q||q.$$isolateScope)a=ca(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=s(b,c,d));b.require=q.require;b.directiveName=x;if(O===q||q.$$isolateScope)b=ca(b,{isolateScope:!0});l.push(b)}}function p(a,b,c,d){var e;if(E(b)){var f=b.match(k);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;e||(d="$"+b+"Controller",e=g?c.inheritedData(d):c.data(d));if(!e&&!f)throw ha("ctreq",b,a);}else if(I(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=p(a,b[g],c,d);return e||
null}function w(a,b,c,d,e,f){var g=$(),h;for(h in d){var k=d[h],l={$scope:k===O||k.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},m=k.controller;"@"==m&&(m=b[k.name]);l=C(m,l,!0,k.controllerAs);g[k.name]=l;aa||a.data("$"+k.name+"Controller",l.instance)}return g}function D(a,c,e,f,g){function k(a,b,c){var d;Za(a)||(c=b,b=a,a=u);aa&&(d=v);c||(c=aa?V.parent():V);return g(a,b,d,c,Ta)}var m,t,A,v,C,V,Ga;b===e?(f=d,V=d.$$element):(V=B(e),f=new fa(V,d));A=c;O?t=c.$new(!0):R&&(A=c.$parent);g&&(C=k,
C.$$boundTransclude=g);T&&(v=w(V,f,C,T,t,c));O&&(K.$$addScopeInfo(V,t,!0,!(J&&(J===O||J===O.$$originalDirective))),K.$$addScopeClass(V,!0),t.$$isolateBindings=O.$$isolateBindings,(Ga=ba(c,f,t,t.$$isolateBindings,O))&&t.$on("$destroy",Ga));for(var n in v){Ga=T[n];var ga=v[n],L=Ga.$$bindings.bindToController;ga.identifier&&L&&(m=ba(A,f,ga.instance,L,Ga));var q=ga();q!==ga.instance&&(ga.instance=q,V.data("$"+Ga.name+"Controller",q),m&&m(),m=ba(A,f,ga.instance,L,Ga))}F=0;for(M=h.length;F<M;F++)m=h[F],
ea(m,m.isolateScope?t:c,V,f,m.require&&p(m.directiveName,m.require,V,v),C);var Ta=c;O&&(O.template||null===O.templateUrl)&&(Ta=t);a&&a(Ta,e.childNodes,u,g);for(F=l.length-1;0<=F;F--)m=l[F],ea(m,m.isolateScope?t:c,V,f,m.require&&p(m.directiveName,m.require,V,v),C)}m=m||{};for(var A=-Number.MAX_VALUE,R=m.newScopeDirective,T=m.controllerDirectives,O=m.newIsolateScopeDirective,J=m.templateDirective,n=m.nonTlbTranscludeDirective,ga=!1,L=!1,aa=m.hasElementTranscludeDirective,Z=d.$$element=B(b),q,x,P,Ia=
e,G,F=0,M=a.length;F<M;F++){q=a[F];var N=q.$$start,Q=q.$$end;N&&(Z=Ta(b,N,Q));P=u;if(A>q.priority)break;if(P=q.scope)q.templateUrl||(H(P)?(Ua("new/isolated scope",O||R,q,Z),O=q):Ua("new/isolated scope",O,q,Z)),R=R||q;x=q.name;!q.templateUrl&&q.controller&&(P=q.controller,T=T||$(),Ua("'"+x+"' controller",T[x],q,Z),T[x]=q);if(P=q.transclude)ga=!0,q.$$tlb||(Ua("transclusion",n,q,Z),n=q),"element"==P?(aa=!0,A=q.priority,P=Z,Z=d.$$element=B(X.createComment(" "+x+": "+d[x]+" ")),b=Z[0],Y(f,ra.call(P,0),
b),Ia=K(P,e,A,g&&g.name,{nonTlbTranscludeDirective:n})):(P=B(Vb(b)).contents(),Z.empty(),Ia=K(P,e,u,u,{needsNewScope:q.$$isolateScope||q.$$newScope}));if(q.template)if(L=!0,Ua("template",J,q,Z),J=q,P=z(q.template)?q.template(Z,d):q.template,P=ja(P),q.replace){g=q;P=Tb.test(P)?Xc(Yb(q.templateNamespace,U(P))):[];b=P[0];if(1!=P.length||1!==b.nodeType)throw ha("tplrt",x,"");Y(f,Z,b);P={$attr:{}};var Wc=V(b,[],P),W=a.splice(F+1,a.length-(F+1));(O||R)&&y(Wc,O,R);a=a.concat(Wc).concat(W);S(d,P);M=a.length}else Z.html(P);
if(q.templateUrl)L=!0,Ua("template",J,q,Z),J=q,q.replace&&(g=q),D=Of(a.splice(F,a.length-F),Z,d,f,ga&&Ia,h,l,{controllerDirectives:T,newScopeDirective:R!==q&&R,newIsolateScopeDirective:O,templateDirective:J,nonTlbTranscludeDirective:n}),M=a.length;else if(q.compile)try{G=q.compile(Z,d,Ia),z(G)?t(null,G,N,Q):G&&t(G.pre,G.post,N,Q)}catch(da){c(da,ua(Z))}q.terminal&&(D.terminal=!0,A=Math.max(A,q.priority))}D.scope=R&&!0===R.scope;D.transcludeOnThisElement=ga;D.templateOnThisElement=L;D.transclude=Ia;
m.hasElementTranscludeDirective=aa;return D}function y(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=Ob(a[d],{$$isolateScope:b,$$newScope:c})}function P(b,d,f,g,h,k,l){if(d===h)return null;h=null;if(e.hasOwnProperty(d)){var m;d=a.get(d+"Directive");for(var p=0,w=d.length;p<w;p++)try{m=d[p],(q(g)||g>m.priority)&&-1!=m.restrict.indexOf(f)&&(k&&(m=Ob(m,{$$start:k,$$end:l})),b.push(m),h=m)}catch(D){c(D)}}return h}function G(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=
c[d],b.multiElement)return!0;return!1}function S(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;n(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});n(b,function(b,f){"class"==f?(J(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function Of(a,b,c,e,f,g,h,k){var l=[],m,t,p=b[0],w=a.shift(),D=Ob(w,{templateUrl:null,
transclude:null,replace:null,$$originalDirective:w}),A=z(w.templateUrl)?w.templateUrl(b,c):w.templateUrl,K=w.templateNamespace;b.empty();d(A).then(function(d){var T,v;d=ja(d);if(w.replace){d=Tb.test(d)?Xc(Yb(K,U(d))):[];T=d[0];if(1!=d.length||1!==T.nodeType)throw ha("tplrt",w.name,A);d={$attr:{}};Y(e,b,T);var C=V(T,[],d);H(w.scope)&&y(C,!0);a=C.concat(a);S(c,d)}else T=p,b.html(d);a.unshift(D);m=Z(a,T,c,f,b,w,g,h,k);n(e,function(a,c){a==T&&(e[c]=b[0])});for(t=O(b[0].childNodes,f);l.length;){d=l.shift();
v=l.shift();var ga=l.shift(),L=l.shift(),C=b[0];if(!d.$$destroyed){if(v!==p){var q=v.className;k.hasElementTranscludeDirective&&w.replace||(C=Vb(T));Y(ga,B(v),C);J(B(C),q)}v=m.transcludeOnThisElement?R(d,m.transclude,L):L;m(t,d,C,e,v)}}l=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(l?l.push(b,c,d,a):(m.transcludeOnThisElement&&(a=R(b,m.transclude,e)),m(t,b,c,d,a)))}}function Ia(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Ua(a,
b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw ha("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,ua(d));}function N(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&K.$$addBindingClass(a);return function(a,c){var e=c.parent();b||K.$$addBindingClass(e);K.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Yb(a,b){a=F(a||"html");switch(a){case "svg":case "math":var c=X.createElement("div");
c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Q(a,b){if("srcdoc"==b)return L.HTML;var c=ta(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return L.RESOURCE_URL}function W(a,c,d,e,f){var g=Q(a,e);f=h[e]||f;var k=b(d,!0,g,f);if(k){if("multiple"===e&&"select"===ta(a))throw ha("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers=$());if(l.test(e))throw ha("nodomevents");
var m=h[e];m!==d&&(k=m&&b(m,!0,g,f),d=m);k&&(h[e]=k(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,a)}))}}}})}}function Y(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=X.createDocumentFragment();a.appendChild(d);
B.hasData(d)&&(B.data(c,B.data(d)),oa?(Rb=!0,oa.cleanData([d])):delete B.cache[d[B.expando]]);d=1;for(e=b.length;d<e;d++)f=b[d],B(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function ca(a,b){return M(function(){return a.apply(null,arguments)},a,b)}function ea(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}function ba(a,c,d,e,f){var g=[];n(e,function(e,h){var k=e.attrName,l=e.optional,m,t,w,D;switch(e.mode){case "@":l||qa.call(c,k)||(d[h]=c[k]=void 0);c.$observe(k,function(a){E(a)&&
(d[h]=a)});c.$$observers[k].$$scope=a;E(c[k])&&(d[h]=b(c[k])(a));break;case "=":if(!qa.call(c,k)){if(l)break;c[k]=void 0}if(l&&!c[k])break;t=p(c[k]);D=t.literal?ma:function(a,b){return a===b||a!==a&&b!==b};w=t.assign||function(){m=d[h]=t(a);throw ha("nonassign",c[k],f.name);};m=d[h]=t(a);l=function(b){D(b,d[h])||(D(b,m)?w(a,b=d[h]):d[h]=b);return m=b};l.$stateful=!0;l=e.collection?a.$watchCollection(c[k],l):a.$watch(p(c[k],l),null,t.literal);g.push(l);break;case "&":t=c.hasOwnProperty(k)?p(c[k]):
x;if(t===x&&l)break;d[h]=function(b){return t(a,b)}}});return g.length&&function(){for(var a=0,b=g.length;a<b;++a)g[a]()}}var fa=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};fa.prototype={$normalize:va,$addClass:function(a){a&&0<a.length&&aa.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&aa.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Yc(a,b);c&&c.length&&aa.addClass(this.$$element,
c);(c=Yc(b,a))&&c.length&&aa.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=Qc(this.$$element[0],a),g=Zc[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=zc(a,"-"));f=ta(this.$$element);if("a"===f&&"href"===a||"img"===f&&"src"===a)this[a]=b=D(b,"src"===a);else if("img"===f&&"srcset"===a){for(var f="",g=U(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(g)?k:/(,)/,g=g.split(k),k=Math.floor(g.length/2),l=0;l<
k;l++)var m=2*l,f=f+D(U(g[m]),!0),f=f+(" "+U(g[m+1]));g=U(g[2*l]).split(/\s/);f+=D(U(g[0]),!0);2===g.length&&(f+=" "+U(g[1]));this[a]=b=f}!1!==d&&(null===b||q(b)?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&n(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=$()),e=d[a]||(d[a]=[]);e.push(b);w.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||q(c[a])||b(c[a])});return function(){ab(e,b)}}};var da=b.startSymbol(),
ia=b.endSymbol(),ja="{{"==da||"}}"==ia?Ya:function(a){return a.replace(/\{\{/g,da).replace(/}}/g,ia)},ka=/^ngAttr[A-Z]/,la=/^(.+)Start$/;K.$$addBindingInfo=m?function(a,b){var c=a.data("$binding")||[];I(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:x;K.$$addBindingClass=m?function(a){J(a,"ng-binding")}:x;K.$$addScopeInfo=m?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:x;K.$$addScopeClass=m?function(a,b){J(a,b?"ng-isolate-scope":"ng-scope")}:x;return K}]}function va(a){return fb(a.replace(Vc,
""))}function Yc(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],h=0;h<e.length;h++)if(g==e[h])continue a;d+=(0<d.length?" ":"")+g}return d}function Xc(a){a=B(a);var b=a.length;if(1>=b)return a;for(;b--;)8===a[b].nodeType&&Pf.call(a,b,1);return a}function Xe(){var a={},b=!1;this.register=function(b,c){Ra(b,"controller");H(b)?M(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,b,c,d){if(!a||!H(a.$scope))throw G("$controller")("noscp",
d,b);a.$scope[b]=c}return function(f,g,h,k){var l,m,r;h=!0===h;k&&E(k)&&(r=k);if(E(f)){k=f.match(Uc);if(!k)throw Qf("ctrlfmt",f);m=k[1];r=r||k[3];f=a.hasOwnProperty(m)?a[m]:Bc(g.$scope,m,!0)||(b?Bc(c,m,!0):u);Qa(f,m,!0)}if(h)return h=(I(f)?f[f.length-1]:f).prototype,l=Object.create(h||null),r&&e(g,r,l,m||f.name),M(function(){var a=d.invoke(f,l,g,m);a!==l&&(H(a)||z(a))&&(l=a,r&&e(g,r,l,m||f.name));return l},{instance:l,identifier:r});l=d.instantiate(f,g,m);r&&e(g,r,l,m||f.name);return l}}]}function Ye(){this.$get=
["$window",function(a){return B(a.document)}]}function Ze(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function Zb(a){return H(a)?da(a)?a.toISOString():db(a):a}function df(){this.$get=function(){return function(a){if(!a)return"";var b=[];oc(a,function(a,c){null===a||q(a)||(I(a)?n(a,function(a,d){b.push(ja(c)+"="+ja(Zb(a)))}):b.push(ja(c)+"="+ja(Zb(a))))});return b.join("&")}}}function ef(){this.$get=function(){return function(a){function b(a,e,f){null===a||q(a)||
(I(a)?n(a,function(a,c){b(a,e+"["+(H(a)?c:"")+"]")}):H(a)&&!da(a)?oc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):d.push(ja(e)+"="+ja(Zb(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function $b(a,b){if(E(a)){var d=a.replace(Rf,"").trim();if(d){var c=b("Content-Type");(c=c&&0===c.indexOf($c))||(c=(c=d.match(Sf))&&Tf[c[0]].test(d));c&&(a=uc(d))}}return a}function ad(a){var b=$(),d;E(a)?n(a.split("\n"),function(a){d=a.indexOf(":");var e=F(U(a.substr(0,d)));a=U(a.substr(d+1));e&&
(b[e]=b[e]?b[e]+", "+a:a)}):H(a)&&n(a,function(a,d){var f=F(d),g=U(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function bd(a){var b;return function(d){b||(b=ad(a));return d?(d=b[F(d)],void 0===d&&(d=null),d):b}}function cd(a,b,d,c){if(z(c))return c(a,b,d);n(c,function(c){a=c(a,b,d)});return a}function cf(){var a=this.defaults={transformResponse:[$b],transformRequest:[function(a){return H(a)&&"[object File]"!==sa.call(a)&&"[object Blob]"!==sa.call(a)&&"[object FormData]"!==sa.call(a)?db(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},
post:ia(ac),put:ia(ac),patch:ia(ac)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},b=!1;this.useApplyAsync=function(a){return y(a)?(b=!!a,this):b};var d=!0;this.useLegacyPromiseExtensions=function(a){return y(a)?(d=!!a,this):d};var c=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(e,f,g,h,k,l){function m(b){function c(a){var b=M({},a);b.data=cd(a.data,a.headers,a.status,f.transformResponse);
a=a.status;return 200<=a&&300>a?b:k.reject(b)}function e(a,b){var c,d={};n(a,function(a,e){z(a)?(c=a(b),null!=c&&(d[e]=c)):d[e]=a});return d}if(!fa.isObject(b))throw G("$http")("badreq",b);var f=M({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer},b);f.headers=function(b){var c=a.headers,d=M({},b.headers),f,g,h,c=M({},c.common,c[F(b.method)]);a:for(f in c){g=F(f);for(h in d)if(F(h)===g)continue a;d[f]=c[f]}return e(d,ia(b))}(b);
f.method=sb(f.method);f.paramSerializer=E(f.paramSerializer)?l.get(f.paramSerializer):f.paramSerializer;var g=[function(b){var d=b.headers,e=cd(b.data,bd(d),u,b.transformRequest);q(e)&&n(d,function(a,b){"content-type"===F(b)&&delete d[b]});q(b.withCredentials)&&!q(a.withCredentials)&&(b.withCredentials=a.withCredentials);return r(b,e).then(c,c)},u],h=k.when(f);for(n(v,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||a.responseError)&&g.push(a.response,a.responseError)});g.length;){b=
g.shift();var m=g.shift(),h=h.then(b,m)}d?(h.success=function(a){Qa(a,"fn");h.then(function(b){a(b.data,b.status,b.headers,f)});return h},h.error=function(a){Qa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=dd("success"),h.error=dd("error"));return h}function r(c,d){function g(a,c,d,e){function f(){l(c,a,d,e)}J&&(200<=a&&300>a?J.put(R,[a,c,ad(d),e]):J.remove(R));b?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function l(a,b,d,e){b=-1<=b?b:0;(200<=b&&300>b?n.resolve:
n.reject)({data:a,status:b,headers:bd(d),config:c,statusText:e})}function r(a){l(a.data,a.status,ia(a.headers()),a.statusText)}function v(){var a=m.pendingRequests.indexOf(c);-1!==a&&m.pendingRequests.splice(a,1)}var n=k.defer(),D=n.promise,J,K,O=c.headers,R=t(c.url,c.paramSerializer(c.params));m.pendingRequests.push(c);D.then(v,v);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(J=H(c.cache)?c.cache:H(a.cache)?a.cache:A);J&&(K=J.get(R),y(K)?K&&z(K.then)?K.then(r,r):I(K)?l(K[1],
K[0],ia(K[2]),K[3]):l(K,200,{},"OK"):J.put(R,D));q(K)&&((K=ed(c.url)?f()[c.xsrfCookieName||a.xsrfCookieName]:u)&&(O[c.xsrfHeaderName||a.xsrfHeaderName]=K),e(c.method,R,d,g,O,c.timeout,c.withCredentials,c.responseType));return D}function t(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var A=g("$http");a.paramSerializer=E(a.paramSerializer)?l.get(a.paramSerializer):a.paramSerializer;var v=[];n(c,function(a){v.unshift(E(a)?l.get(a):l.invoke(a))});m.pendingRequests=[];(function(a){n(arguments,
function(a){m[a]=function(b,c){return m(M({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){n(arguments,function(a){m[a]=function(b,c,d){return m(M({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");m.defaults=a;return m}]}function gf(){this.$get=function(){return function(){return new S.XMLHttpRequest}}}function ff(){this.$get=["$browser","$window","$document","$xhrFactory",function(a,b,d,c){return Uf(a,c,a.defer,b.angular.callbacks,d[0])}]}function Uf(a,b,d,
c,e){function f(a,b,d){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,A="unknown";a&&("load"!==a.type||c[b].called||(a={type:"error"}),A=a.type,g="error"===a.type?404:200);d&&d(g,A)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,r,t,A){function v(){C&&C();w&&w.abort()}
function T(b,c,e,f,g){y(L)&&d.cancel(L);C=w=null;b(c,e,f,g);a.$$completeOutstandingRequest(x)}a.$$incOutstandingRequestCount();h=h||a.url();if("jsonp"==F(e)){var p="_"+(c.counter++).toString(36);c[p]=function(a){c[p].data=a;c[p].called=!0};var C=f(h.replace("JSON_CALLBACK","angular.callbacks."+p),p,function(a,b){T(l,a,c[p].data,"",b);c[p]=x})}else{var w=b(e,h);w.open(e,h,!0);n(m,function(a,b){y(a)&&w.setRequestHeader(b,a)});w.onload=function(){var a=w.statusText||"",b="response"in w?w.response:w.responseText,
c=1223===w.status?204:w.status;0===c&&(c=b?200:"file"==wa(h).protocol?404:0);T(l,c,b,w.getAllResponseHeaders(),a)};e=function(){T(l,-1,null,null,"")};w.onerror=e;w.onabort=e;t&&(w.withCredentials=!0);if(A)try{w.responseType=A}catch(ga){if("json"!==A)throw ga;}w.send(q(k)?null:k)}if(0<r)var L=d(v,r);else r&&z(r.then)&&r.then(v)}}function af(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler",
"$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(m,a).replace(r,b)}function h(f,h,m,r){function p(a){try{var b=a;a=m?e.getTrusted(m,b):e.valueOf(b);var d;if(r&&!y(a))d=a;else if(null==a)d="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=db(a)}d=a}return d}catch(g){c(Ja.interr(f,g))}}r=!!r;for(var C,w,n=0,L=[],s=[],D=f.length,J=[],K=[];n<D;)if(-1!=(C=f.indexOf(a,n))&&-1!=(w=f.indexOf(b,C+k)))n!==C&&J.push(g(f.substring(n,C))),n=f.substring(C+
k,w),L.push(n),s.push(d(n,p)),n=w+l,K.push(J.length),J.push("");else{n!==D&&J.push(g(f.substring(n)));break}m&&1<J.length&&Ja.throwNoconcat(f);if(!h||L.length){var O=function(a){for(var b=0,c=L.length;b<c;b++){if(r&&q(a[b]))return;J[K[b]]=a[b]}return J.join("")};return M(function(a){var b=0,d=L.length,e=Array(d);try{for(;b<d;b++)e[b]=s[b](a);return O(e)}catch(g){c(Ja.interr(f,g))}},{exp:f,expressions:L,$$watchDelegate:function(a,b){var c;return a.$watchGroup(s,function(d,e){var f=O(d);z(b)&&b.call(this,
f,d!==e?c:f,a);c=f})}})}}var k=a.length,l=b.length,m=new RegExp(a.replace(/./g,f),"g"),r=new RegExp(b.replace(/./g,f),"g");h.startSymbol=function(){return a};h.endSymbol=function(){return b};return h}]}function bf(){this.$get=["$rootScope","$window","$q","$$q",function(a,b,d,c){function e(e,h,k,l){var m=4<arguments.length,r=m?ra.call(arguments,4):[],t=b.setInterval,A=b.clearInterval,v=0,n=y(l)&&!l,p=(n?c:d).defer(),C=p.promise;k=y(k)?k:0;C.then(null,null,m?function(){e.apply(null,r)}:e);C.$$intervalId=
t(function(){p.notify(v++);0<k&&v>=k&&(p.resolve(v),A(C.$$intervalId),delete f[C.$$intervalId]);n||a.$apply()},h);f[C.$$intervalId]=p;return C}var f={};e.cancel=function(a){return a&&a.$$intervalId in f?(f[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete f[a.$$intervalId],!0):!1};return e}]}function bc(a){a=a.split("/");for(var b=a.length;b--;)a[b]=ob(a[b]);return a.join("/")}function fd(a,b){var d=wa(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=ea(d.port)||Vf[d.protocol]||
null}function gd(a,b){var d="/"!==a.charAt(0);d&&(a="/"+a);var c=wa(a);b.$$path=decodeURIComponent(d&&"/"===c.pathname.charAt(0)?c.pathname.substring(1):c.pathname);b.$$search=xc(c.search);b.$$hash=decodeURIComponent(c.hash);b.$$path&&"/"!=b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function pa(a,b){if(0===b.indexOf(a))return b.substr(a.length)}function Fa(a){var b=a.indexOf("#");return-1==b?a:a.substr(0,b)}function ib(a){return a.replace(/(#.+)|#$/,"$1")}function cc(a,b,d){this.$$html5=!0;d=d||"";
fd(a,this);this.$$parse=function(a){var d=pa(b,a);if(!E(d))throw Db("ipthprfx",a,b);gd(d,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Qb(this.$$search),d=this.$$hash?"#"+ob(this.$$hash):"";this.$$url=bc(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1)};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;y(f=pa(a,c))?(g=f,g=y(f=pa(d,f))?b+(pa("/",f)||f):a+g):y(f=pa(b,c))?g=b+f:b==c+"/"&&(g=b);g&&this.$$parse(g);
return!!g}}function dc(a,b,d){fd(a,this);this.$$parse=function(c){var e=pa(a,c)||pa(b,c),f;q(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",q(e)&&(a=c,this.replace())):(f=pa(d,e),q(f)&&(f=e));gd(f,this);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;0===f.indexOf(e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=Qb(this.$$search),e=this.$$hash?"#"+ob(this.$$hash):"";this.$$url=bc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?
d+this.$$url:"")};this.$$parseLinkUrl=function(b,d){return Fa(a)==Fa(b)?(this.$$parse(b),!0):!1}}function hd(a,b,d){this.$$html5=!0;dc.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a==Fa(c)?f=c:(g=pa(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=Qb(this.$$search),e=this.$$hash?"#"+ob(this.$$hash):"";this.$$url=bc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url}}function Eb(a){return function(){return this[a]}}
function id(a,b){return function(d){if(q(d))return this[a];this[a]=b(d);this.$$compose();return this}}function hf(){var a="",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return y(b)?(a=b,this):a};this.html5Mode=function(a){return $a(a)?(b.enabled=a,this):H(a)?($a(a.enabled)&&(b.enabled=a.enabled),$a(a.requireBase)&&(b.requireBase=a.requireBase),$a(a.rewriteLinks)&&(b.rewriteLinks=a.rewriteLinks),this):b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",
function(d,c,e,f,g){function h(a,b,d){var e=l.url(),f=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(g){throw l.url(e),l.$$state=f,g;}}function k(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,b)}var l,m;m=c.baseHref();var r=c.url(),t;if(b.enabled){if(!m&&b.requireBase)throw Db("nobase");t=r.substring(0,r.indexOf("/",r.indexOf("//")+2))+(m||"/");m=e.history?cc:hd}else t=Fa(r),m=dc;var A=t.substr(0,Fa(t).lastIndexOf("/")+1);l=new m(t,A,"#"+a);l.$$parseLinkUrl(r,r);l.$$state=
c.state();var v=/^\s*(javascript|mailto):/i;f.on("click",function(a){if(b.rewriteLinks&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!=a.which&&2!=a.button){for(var e=B(a.target);"a"!==ta(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),k=e.attr("href")||e.attr("xlink:href");H(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=wa(h.animVal).href);v.test(h)||!h||e.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(h,k)||(a.preventDefault(),l.absUrl()!=c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=
!0))}});ib(l.absUrl())!=ib(r)&&c.url(l.absUrl(),!0);var n=!0;c.onUrlChange(function(a,b){q(pa(A,a))?g.location.href=a:(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,f;a=ib(a);l.$$parse(a);l.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===a&&(f?(l.$$parse(c),l.$$state=e,h(c,!1,e)):(n=!1,k(c,e)))}),d.$$phase||d.$digest())});d.$watch(function(){var a=ib(c.url()),b=ib(l.absUrl()),f=c.state(),g=l.$$replace,m=a!==b||l.$$html5&&e.history&&f!==l.$$state;if(n||
m)n=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,f).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=f):(m&&h(b,g,f===l.$$state?null:l.$$state),k(a,f)))});l.$$replace=!1});return l}]}function jf(){var a=!0,b=this;this.debugEnabled=function(b){return y(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&
(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||x;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];n(arguments,function(b){a.push(c(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Va(a,b){if("__defineGetter__"===a||"__defineSetter__"===a||"__lookupGetter__"===a||"__lookupSetter__"===
a||"__proto__"===a)throw ba("isecfld",b);return a}function jd(a,b){a+="";if(!E(a))throw ba("iseccst",b);return a}function xa(a,b){if(a){if(a.constructor===a)throw ba("isecfn",b);if(a.window===a)throw ba("isecwindow",b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw ba("isecdom",b);if(a===Object)throw ba("isecobj",b);}return a}function kd(a,b){if(a){if(a.constructor===a)throw ba("isecfn",b);if(a===Wf||a===Xf||a===Yf)throw ba("isecff",b);}}function ld(a,b){if(a&&(a===(0).constructor||a===
(!1).constructor||a==="".constructor||a==={}.constructor||a===[].constructor||a===Function.constructor))throw ba("isecaf",b);}function Zf(a,b){return"undefined"!==typeof a?a:b}function md(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function W(a,b){var d,c;switch(a.type){case s.Program:d=!0;n(a.body,function(a){W(a.expression,b);d=d&&a.expression.constant});a.constant=d;break;case s.Literal:a.constant=!0;a.toWatch=[];break;case s.UnaryExpression:W(a.argument,b);a.constant=a.argument.constant;
a.toWatch=a.argument.toWatch;break;case s.BinaryExpression:W(a.left,b);W(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case s.LogicalExpression:W(a.left,b);W(a.right,b);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case s.ConditionalExpression:W(a.test,b);W(a.alternate,b);W(a.consequent,b);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case s.Identifier:a.constant=
!1;a.toWatch=[a];break;case s.MemberExpression:W(a.object,b);a.computed&&W(a.property,b);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=[a];break;case s.CallExpression:d=a.filter?!b(a.callee.name).$stateful:!1;c=[];n(a.arguments,function(a){W(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=a.filter&&!b(a.callee.name).$stateful?c:[a];break;case s.AssignmentExpression:W(a.left,b);W(a.right,b);a.constant=a.left.constant&&a.right.constant;
a.toWatch=[a];break;case s.ArrayExpression:d=!0;c=[];n(a.elements,function(a){W(a,b);d=d&&a.constant;a.constant||c.push.apply(c,a.toWatch)});a.constant=d;a.toWatch=c;break;case s.ObjectExpression:d=!0;c=[];n(a.properties,function(a){W(a.value,b);d=d&&a.value.constant;a.value.constant||c.push.apply(c,a.value.toWatch)});a.constant=d;a.toWatch=c;break;case s.ThisExpression:a.constant=!1,a.toWatch=[]}}function nd(a){if(1==a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:u}}
function od(a){return a.type===s.Identifier||a.type===s.MemberExpression}function pd(a){if(1===a.body.length&&od(a.body[0].expression))return{type:s.AssignmentExpression,left:a.body[0].expression,right:{type:s.NGValueParameter},operator:"="}}function qd(a){return 0===a.body.length||1===a.body.length&&(a.body[0].expression.type===s.Literal||a.body[0].expression.type===s.ArrayExpression||a.body[0].expression.type===s.ObjectExpression)}function rd(a,b){this.astBuilder=a;this.$filter=b}function sd(a,
b){this.astBuilder=a;this.$filter=b}function Fb(a){return"constructor"==a}function ec(a){return z(a.valueOf)?a.valueOf():$f.call(a)}function kf(){var a=$(),b=$();this.$get=["$filter",function(d){function c(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=ec(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function e(a,b,d,e,f){var g=e.inputs,h;if(1===g.length){var k=c,g=g[0];return a.$watch(function(a){var b=g(a);c(b,k)||(h=e(a,u,u,[b]),k=b&&ec(b));return h},b,d,f)}for(var l=[],m=[],r=0,n=
g.length;r<n;r++)l[r]=c,m[r]=null;return a.$watch(function(a){for(var b=!1,d=0,f=g.length;d<f;d++){var k=g[d](a);if(b||(b=!c(k,l[d])))m[d]=k,l[d]=k&&ec(k)}b&&(h=e(a,u,u,m));return h},b,d,f)}function f(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;z(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function g(a,b,c,d){function e(a){var b=!0;n(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,
c,d){g=a;z(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function h(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){z(b)&&b.apply(this,arguments);e()},c)}function k(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,c=c!==g&&c!==f?function(c,e,f,g){f=d&&g?g[0]:a(c,e,f,g);return b(f,c,e)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return y(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==e?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=
e,d=!a.inputs,c.inputs=a.inputs?a.inputs:[a]);return c}var l=Ba().noUnsafeEval,m={csp:l,expensiveChecks:!1},r={csp:l,expensiveChecks:!0};return function(c,l,v){var n,p,q;switch(typeof c){case "string":q=c=c.trim();var w=v?b:a;n=w[q];n||(":"===c.charAt(0)&&":"===c.charAt(1)&&(p=!0,c=c.substring(2)),v=v?r:m,n=new fc(v),n=(new gc(n,d,v)).parse(c),n.constant?n.$$watchDelegate=h:p?n.$$watchDelegate=n.literal?g:f:n.inputs&&(n.$$watchDelegate=e),w[q]=n);return k(n,l);case "function":return k(c,l);default:return x}}}]}
function mf(){this.$get=["$rootScope","$exceptionHandler",function(a,b){return td(function(b){a.$evalAsync(b)},b)}]}function nf(){this.$get=["$browser","$exceptionHandler",function(a,b){return td(function(b){a.defer(b)},b)}]}function td(a,b){function d(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function c(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,a(function(){var a,
d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];a=e[f][c.status];try{z(a)?d.resolve(a(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),b(h)}}}))}function g(){this.promise=new c;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=G("$q",TypeError);M(c.prototype,{then:function(a,b,c){if(q(a)&&q(b)&&q(c))return this;var d=new g;this.$$state.pending=this.$$state.pending||[];
this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,!0,a)},function(b){return l(b,!1,a)},b)}});M(g.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(a){var c,e;e=d(this,this.$$resolve,this.$$reject);try{if(H(a)||z(a))c=a&&a.then;z(c)?(this.promise.$$state.status=
-1,c.call(a,e[0],e[1],this.notify)):(this.promise.$$state.value=a,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),b(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&a(function(){for(var a,e,f=0,g=d.length;f<g;f++){e=d[f][0];a=d[f][3];try{e.notify(z(a)?
a(c):c)}catch(h){b(h)}}})}});var k=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{z(c)&&(d=c())}catch(e){return k(e,!1)}return d&&z(d.then)?d.then(function(){return k(a,b)},function(a){return k(a,!1)}):k(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},r=function A(a){if(!z(a))throw h("norslvr",a);if(!(this instanceof A))return new A(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};
r.defer=function(){return new g};r.reject=function(a){var b=new g;b.reject(a);return b.promise};r.when=m;r.resolve=m;r.all=function(a){var b=new g,c=0,d=I(a)?[]:{};n(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return r}function wf(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||
a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function lf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++nb;this.$$ChildScope=null}b.prototype=a;return b}var b=10,d=G("$rootScope"),c=null,e=null;this.digestTtl=function(a){arguments.length&&
(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(f,g,h,k){function l(a){a.currentScope.$$destroyed=!0}function m(a){9===Ha&&(a.$$childHead&&m(a.$$childHead),a.$$nextSibling&&m(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function r(){this.$id=++nb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=
!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function t(a){if(w.$$phase)throw d("inprog",w.$$phase);w.$$phase=a}function A(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function v(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function s(){}function p(){for(;aa.length;)try{aa.shift()()}catch(a){g(a)}e=null}function C(){null===e&&(e=k.defer(function(){w.$apply(p)}))}r.prototype={constructor:r,
$new:function(b,c){var d;c=c||this;b?(d=new r,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!=this)&&d.$on("$destroy",l);return d},$watch:function(a,b,d,e){var f=h(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var g=this,k=g.$$watchers,l={fn:b,last:s,get:f,exp:e||a,eq:!!d};c=null;z(b)||(l.fn=x);k||
(k=g.$$watchers=[]);k.unshift(l);A(this,1);return function(){0<=ab(k,l)&&A(g,-1);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});n(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},
$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!q(e)){if(H(e))if(za(e))for(f!==r&&(f=r,n=f.length=0,l++),a=e.length,n!==a&&(l++,f.length=n=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==t&&(f=t={},n=0,l++);a=0;for(b in e)qa.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(n++,f[b]=g,l++));if(n>a)for(b in l++,f)qa.call(e,b)||(n--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,g,k=1<b.length,l=0,m=
h(a,c),r=[],t={},p=!0,n=0;return this.$watch(m,function(){p?(p=!1,b(e,e,d)):b(e,g,d);if(k)if(H(e))if(za(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)qa.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var a,f,h,l,m,r,n=b,A,q=[],v,C;t("$digest");k.$$checkUrlChange();this===w&&null!==e&&(k.defer.cancel(e),p());c=null;do{r=!1;for(A=this;u.length;){try{C=u.shift(),C.scope.$eval(C.expression,C.locals)}catch(aa){g(aa)}c=null}a:do{if(l=A.$$watchers)for(m=l.length;m--;)try{if(a=
l[m])if((f=a.get(A))!==(h=a.last)&&!(a.eq?ma(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))r=!0,c=a,a.last=a.eq?bb(f,null):f,a.fn(f,h===s?f:h,A),5>n&&(v=4-n,q[v]||(q[v]=[]),q[v].push({msg:z(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:f,oldVal:h}));else if(a===c){r=!1;break a}}catch(y){g(y)}if(!(l=A.$$watchersCount&&A.$$childHead||A!==this&&A.$$nextSibling))for(;A!==this&&!(l=A.$$nextSibling);)A=A.$parent}while(A=l);if((r||u.length)&&!n--)throw w.$$phase=null,d("infdig",
b,q);}while(r||u.length);for(w.$$phase=null;L.length;)try{L.shift()()}catch(x){g(x)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===w&&k.$$applicationDestroyed();A(this,-this.$$watchersCount);for(var b in this.$$listenerCount)v(this,this.$$listenerCount[b],b);a&&a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=
this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=x;this.$on=this.$watch=this.$watchGroup=function(){return x};this.$$listeners={};this.$$nextSibling=null;m(this)}},$eval:function(a,b){return h(a)(this,b)},$evalAsync:function(a,b){w.$$phase||u.length||k.defer(function(){u.length&&w.$digest()});u.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){L.push(a)},$apply:function(a){try{t("$apply");
try{return this.$eval(a)}finally{w.$$phase=null}}catch(b){g(b)}finally{try{w.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&aa.push(b);C()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,v(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,f=!1,h=
{name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=cb([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(r){g(r)}else d.splice(l,1),l--,m--;if(f)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};
if(!this.$$listenerCount[a])return e;for(var f=cb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){g(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var w=new r,u=w.$$asyncQueue=[],L=w.$$postDigestQueue=[],aa=w.$$applyAsyncQueue=[];return w}]}function ge(){var a=/^\s*(https?|ftp|mailto|tel|file):/,
b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f;f=wa(d).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function ag(a){if("self"===a)return a;if(E(a)){if(-1<a.indexOf("***"))throw ya("iwcard",a);a=ud(a).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+a+"$")}if(Ma(a))return new RegExp("^"+
a.source+"$");throw ya("imatcher");}function vd(a){var b=[];y(a)&&n(a,function(a){b.push(ag(a))});return b}function pf(){this.SCE_CONTEXTS=la;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=vd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=vd(a));return b};this.$get=["$injector",function(d){function c(a,b){return"self"===a?ed(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=
new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw ya("unsafe");};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),h={};h[la.HTML]=e(g);h[la.CSS]=e(g);h[la.URL]=e(g);h[la.JS]=e(g);h[la.RESOURCE_URL]=e(h[la.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw ya("icontext",a,b);if(null===b||q(b)||""===b)return b;if("string"!==typeof b)throw ya("itype",
a);return new c(b)},getTrusted:function(d,e){if(null===e||q(e)||""===e)return e;var g=h.hasOwnProperty(d)?h[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===la.RESOURCE_URL){var g=wa(e.toString()),r,t,n=!1;r=0;for(t=a.length;r<t;r++)if(c(a[r],g)){n=!0;break}if(n)for(r=0,t=b.length;r<t;r++)if(c(b[r],g)){n=!1;break}if(n)return e;throw ya("insecurl",e.toString());}if(d===la.HTML)return f(e);throw ya("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}
function of(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ha)throw ya("iequirks");var c=ia(la);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},c.valueOf=Ya);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;n(la,function(a,
b){var d=F(b);c[fb("parse_as_"+d)]=function(b){return e(a,b)};c[fb("get_trusted_"+d)]=function(b){return f(a,b)};c[fb("trust_as_"+d)]=function(b){return g(a,b)}});return c}]}function qf(){this.$get=["$window","$document",function(a,b){var d={},c=ea((/android (\d+)/.exec(F((a.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((a.navigator||{}).userAgent),f=b[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var r in k)if(l=h.exec(r)){g=l[0];g=g.substr(0,1).toUpperCase()+
g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in k);!c||l&&m||(l=E(k.webkitTransition),m=E(k.webkitAnimation))}return{history:!(!a.history||!a.history.pushState||4>c||e),hasEvent:function(a){if("input"===a&&11>=Ha)return!1;if(q(d[a])){var b=f.createElement("div");d[a]="on"+a in b}return d[a]},csp:Ba(),vendorPrefix:g,transitions:l,animations:m,android:c}}]}function sf(){this.$get=["$templateCache","$http","$q","$sce",
function(a,b,d,c){function e(f,g){e.totalPendingRequests++;E(f)&&a.get(f)||(f=c.getTrustedResourceUrl(f));var h=b.defaults&&b.defaults.transformResponse;I(h)?h=h.filter(function(a){return a!==$b}):h===$b&&(h=null);return b.get(f,{cache:a,transformResponse:h})["finally"](function(){e.totalPendingRequests--}).then(function(b){a.put(f,b.data);return b.data},function(a){if(!g)throw ha("tpload",f,a.status,a.statusText);return d.reject(a)})}e.totalPendingRequests=0;return e}]}function tf(){this.$get=["$rootScope",
"$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];n(a,function(a){var c=fa.element(a).data("$binding");c&&n(c,function(c){d?(new RegExp("(^|\\s)"+ud(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!=c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(d?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return d.url()},
setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function uf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,k,l){z(f)||(l=k,k=f,f=x);var m=ra.call(arguments,3),r=y(l)&&!l,t=(r?c:d).defer(),n=t.promise,q;q=b.defer(function(){try{t.resolve(f.apply(null,m))}catch(b){t.reject(b),e(b)}finally{delete g[n.$$timeoutId]}r||a.$apply()},k);n.$$timeoutId=q;g[q]=t;return n}var g={};
f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return f}]}function wa(a){Ha&&(Y.setAttribute("href",a),a=Y.href);Y.setAttribute("href",a);return{href:Y.href,protocol:Y.protocol?Y.protocol.replace(/:$/,""):"",host:Y.host,search:Y.search?Y.search.replace(/^\?/,""):"",hash:Y.hash?Y.hash.replace(/^#/,""):"",hostname:Y.hostname,port:Y.port,pathname:"/"===Y.pathname.charAt(0)?Y.pathname:"/"+Y.pathname}}function ed(a){a=
E(a)?wa(a):a;return a.protocol===wd.protocol&&a.host===wd.host}function vf(){this.$get=na(S)}function xd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},c={},e="";return function(){var a,g,h,k,l;a=d.cookie||"";if(a!==e)for(e=a,a=e.split("; "),c={},h=0;h<a.length;h++)g=a[h],k=g.indexOf("="),0<k&&(l=b(g.substring(0,k)),q(c[l])&&(c[l]=b(g.substring(k+1))));return c}}function zf(){this.$get=xd}function Jc(a){function b(d,c){if(H(d)){var e={};n(d,function(a,c){e[c]=
b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",yd);b("date",zd);b("filter",bg);b("json",cg);b("limitTo",dg);b("lowercase",eg);b("number",Ad);b("orderBy",Bd);b("uppercase",fg)}function bg(){return function(a,b,d){if(!za(a)){if(null==a)return a;throw G("filter")("notarray",a);}var c;switch(hc(b)){case "function":break;case "boolean":case "null":case "number":case "string":c=!0;case "object":b=
gg(b,d,c);break;default:return a}return Array.prototype.filter.call(a,b)}}function gg(a,b,d){var c=H(a)&&"$"in a;!0===b?b=ma:z(b)||(b=function(a,b){if(q(a))return!1;if(null===a||null===b)return a===b;if(H(b)||H(a)&&!qc(a))return!1;a=F(""+a);b=F(""+b);return-1!==a.indexOf(b)});return function(e){return c&&!H(e)?Ka(e,a.$,b,!1):Ka(e,a,b,d)}}function Ka(a,b,d,c,e){var f=hc(a),g=hc(b);if("string"===g&&"!"===b.charAt(0))return!Ka(a,b.substring(1),d,c);if(I(a))return a.some(function(a){return Ka(a,b,d,c)});
switch(f){case "object":var h;if(c){for(h in a)if("$"!==h.charAt(0)&&Ka(a[h],b,d,!0))return!0;return e?!1:Ka(a,b,d,!1)}if("object"===g){for(h in b)if(e=b[h],!z(e)&&!q(e)&&(f="$"===h,!Ka(f?a:a[h],e,d,f,f)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function hc(a){return null===a?"null":typeof a}function yd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){q(c)&&(c=b.CURRENCY_SYM);q(e)&&(e=b.PATTERNS[1].maxFrac);return null==a?a:Cd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,
e).replace(/\u00A4/g,c)}}function Ad(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Cd(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function Cd(a,b,d,c,e){if(H(a))return"";var f=0>a;a=Math.abs(a);var g=Infinity===a;if(!g&&!isFinite(a))return"";var h=a+"",k="",l=!1,m=[];g&&(k="\u221e");if(!g&&-1!==h.indexOf("e")){var r=h.match(/([\d\.]+)e(-?)(\d+)/);r&&"-"==r[2]&&r[3]>e+1?a=0:(k=h,l=!0)}if(g||l)0<e&&1>a&&(k=a.toFixed(e),a=parseFloat(k),k=k.replace(ic,c));else{g=(h.split(ic)[1]||"").length;
q(e)&&(e=Math.min(Math.max(b.minFrac,g),b.maxFrac));a=+(Math.round(+(a.toString()+"e"+e)).toString()+"e"+-e);var g=(""+a).split(ic),h=g[0],g=g[1]||"",r=0,t=b.lgSize,n=b.gSize;if(h.length>=t+n)for(r=h.length-t,l=0;l<r;l++)0===(r-l)%n&&0!==l&&(k+=d),k+=h.charAt(l);for(l=r;l<h.length;l++)0===(h.length-l)%t&&0!==l&&(k+=d),k+=h.charAt(l);for(;g.length<e;)g+="0";e&&"0"!==e&&(k+=c+g.substr(0,e))}0===a&&(f=!1);m.push(f?b.negPre:b.posPre,k,f?b.negSuf:b.posSuf);return m.join("")}function Gb(a,b,d){var c="";
0>a&&(c="-",a=-a);for(a=""+a;a.length<b;)a="0"+a;d&&(a=a.substr(a.length-b));return c+a}function ca(a,b,d,c){d=d||0;return function(e){e=e["get"+a]();if(0<d||e>-d)e+=d;0===e&&-12==d&&(e=12);return Gb(e,b,c)}}function Hb(a,b){return function(d,c){var e=d["get"+a](),f=sb(b?"SHORT"+a:a);return c[f][e]}}function Dd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Ed(a){return function(b){var d=Dd(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-
+d;b=1+Math.round(b/6048E5);return Gb(b,a)}}function jc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function zd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=ea(b[9]+b[10]),g=ea(b[9]+b[11]));h.call(a,ea(b[1]),ea(b[2])-1,ea(b[3]));f=ea(b[4]||0)-f;g=ea(b[5]||0)-g;h=ea(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,d,f){var g="",h=[],k,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;E(c)&&(c=hg.test(c)?ea(c):b(c));Q(c)&&(c=new Date(c));if(!da(c)||!isFinite(c.getTime()))return c;for(;d;)(l=ig.exec(d))?(h=cb(h,l,1),d=h.pop()):(h.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=vc(f,c.getTimezoneOffset()),c=Pb(c,f,!0));n(h,function(b){k=jg[b];g+=k?k(c,a.DATETIME_FORMATS,m):b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function cg(){return function(a,b){q(b)&&(b=2);return db(a,b)}}function dg(){return function(a,
b,d){b=Infinity===Math.abs(Number(b))?Number(b):ea(b);if(isNaN(b))return a;Q(a)&&(a=a.toString());if(!I(a)&&!E(a))return a;d=!d||isNaN(d)?0:ea(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?a.slice(d,d+b):0===d?a.slice(b,a.length):a.slice(Math.max(0,d+b),d)}}function Bd(a){function b(b,d){d=d?-1:1;return b.map(function(b){var c=1,h=Ya;if(z(b))h=b;else if(E(b)){if("+"==b.charAt(0)||"-"==b.charAt(0))c="-"==b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(h=a(b),h.constant))var k=h(),h=function(a){return a[k]}}return{get:h,
descending:c*d}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(a,e,f){if(!za(a))return a;I(e)||(e=[e]);0===e.length&&(e=["+"]);var g=b(e,f);g.push({get:function(){return{}},descending:f?-1:1});a=Array.prototype.map.call(a,function(a,b){return{value:a,predicateValues:g.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("string"===c)e=e.toLowerCase();else if("object"===c)a:{if("function"===typeof e.valueOf&&
(e=e.valueOf(),d(e)))break a;if(qc(e)&&(e=e.toString(),d(e)))break a;e=b}return{value:e,type:c}})}});a.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],n=0;c.type===f.type?c.value!==f.value&&(n=c.value<f.value?-1:1):n=c.type<f.type?-1:1;if(c=n*g[d].descending)break}return c});return a=a.map(function(a){return a.value})}}function La(a){z(a)&&(a={link:a});a.restrict=a.restrict||"AC";return na(a)}function Fd(a,b,d,c,e){var f=this,g=[];f.$error=
{};f.$$success={};f.$pending=u;f.$name=e(b.name||b.ngForm||"")(d);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;f.$$parentForm=Ib;f.$rollbackViewValue=function(){n(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){n(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ra(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a);a.$$parentForm=f};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&
f[a.$name]===a&&delete f[a.$name];n(f.$pending,function(b,c){f.$setValidity(c,null,a)});n(f.$error,function(b,c){f.$setValidity(c,null,a)});n(f.$$success,function(b,c){f.$setValidity(c,null,a)});ab(g,a);a.$$parentForm=Ib};Gd({ctrl:this,$element:a,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(ab(d,c),0===d.length&&delete a[b])},$animate:c});f.$setDirty=function(){c.removeClass(a,Wa);c.addClass(a,Jb);f.$dirty=!0;f.$pristine=!1;f.$$parentForm.$setDirty()};
f.$setPristine=function(){c.setClass(a,Wa,Jb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;n(g,function(a){a.$setPristine()})};f.$setUntouched=function(){n(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){c.addClass(a,"ng-submitted");f.$submitted=!0;f.$$parentForm.$setSubmitted()}}function kc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function jb(a,b,d,c,e,f){var g=F(b[0].type);if(!e.android){var h=!1;b.on("compositionstart",function(a){h=!0});
b.on("compositionend",function(){h=!1;k()})}var k=function(a){l&&(f.defer.cancel(l),l=null);if(!h){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&"false"===d.ngTrim||(e=U(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",k);else{var l,m=function(a,b,c){l||(l=f.defer(function(){l=null;b&&b.value===c||k(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut",
m)}b.on("change",k);c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Kb(a,b){return function(d,c){var e,f;if(da(d))return d;if(E(d)){'"'==d.charAt(0)&&'"'==d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(kg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,
mm:0,ss:0,sss:0},n(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function kb(a,b,d,c){return function(e,f,g,h,k,l,m){function r(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function n(a){return y(a)&&!da(a)?d(a)||u:a}Hd(e,f,g,h);jb(e,f,g,h,k,l);var A=h&&h.$options&&h.$options.timezone,v;h.$$parserName=a;h.$parsers.push(function(a){return h.$isEmpty(a)?null:b.test(a)?(a=d(a,v),A&&(a=Pb(a,A)),a):u});h.$formatters.push(function(a){if(a&&
!da(a))throw lb("datefmt",a);if(r(a))return(v=a)&&A&&(v=Pb(v,A,!0)),m("date")(a,c,A);v=null;return""});if(y(g.min)||g.ngMin){var s;h.$validators.min=function(a){return!r(a)||q(s)||d(a)>=s};g.$observe("min",function(a){s=n(a);h.$validate()})}if(y(g.max)||g.ngMax){var p;h.$validators.max=function(a){return!r(a)||q(p)||d(a)<=p};g.$observe("max",function(a){p=n(a);h.$validate()})}}}function Hd(a,b,d,c){(c.$$hasNativeValidators=H(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};
return c.badInput&&!c.typeMismatch?u:a})}function Id(a,b,d,c,e){if(y(c)){a=a(c);if(!a.constant)throw lb("constexpr",d,c);return a(b)}return e}function lc(a,b){a="ngClass"+a;return["$animate",function(d){function c(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){var b=[];return I(a)?(n(a,function(a){b=b.concat(e(a))}),b):E(a)?a.split(" "):H(a)?(n(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",
link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||$(),d=[];n(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(a){if(!0===b||f.$index%2===b){var l=e(a||[]);if(!m){var n=k(l,1);h.$addClass(n)}else if(!ma(a,m)){var q=e(m),n=c(l,q),l=c(q,l),n=k(n,1),l=k(l,-1);n&&n.length&&d.addClass(g,n);l&&l.length&&d.removeClass(g,l)}}m=ia(a)}var m;f.$watch(h[a],l,!0);h.$observe("class",function(b){l(f.$eval(h[a]))});"ngClass"!==
a&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[a]));g===b?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}function Gd(a){function b(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function d(a,c){a=a?"-"+zc(a,"-"):"";b(mb+a,!0===c);b(Jd+a,!1===c)}var c=a.ctrl,e=a.$element,f={},g=a.set,h=a.unset,k=a.$animate;f[Jd]=!(f[mb]=e.hasClass(mb));c.$setValidity=function(a,e,f){q(e)?(c.$pending||(c.$pending={}),g(c.$pending,a,f)):(c.$pending&&
h(c.$pending,a,f),Kd(c.$pending)&&(c.$pending=u));$a(e)?e?(h(c.$error,a,f),g(c.$$success,a,f)):(g(c.$error,a,f),h(c.$$success,a,f)):(h(c.$error,a,f),h(c.$$success,a,f));c.$pending?(b(Ld,!0),c.$valid=c.$invalid=u,d("",null)):(b(Ld,!1),c.$valid=Kd(c.$error),c.$invalid=!c.$valid,d("",c.$valid));e=c.$pending&&c.$pending[a]?u:c.$error[a]?!1:c.$$success[a]?!0:null;d(a,e);c.$$parentForm.$setValidity(a,e,c)}}function Kd(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}var lg=/^\/(.+)\/([a-z]*)$/,
F=function(a){return E(a)?a.toLowerCase():a},qa=Object.prototype.hasOwnProperty,sb=function(a){return E(a)?a.toUpperCase():a},Ha,B,oa,ra=[].slice,Pf=[].splice,mg=[].push,sa=Object.prototype.toString,rc=Object.getPrototypeOf,Aa=G("ng"),fa=S.angular||(S.angular={}),Sb,nb=0;Ha=X.documentMode;x.$inject=[];Ya.$inject=[];var I=Array.isArray,Vd=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,U=function(a){return E(a)?a.trim():a},ud=function(a){return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,
"\\$1").replace(/\x08/g,"\\x08")},Ba=function(){if(!y(Ba.rules)){var a=X.querySelector("[ng-csp]")||X.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Ba.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ba;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Ba.rules},pb=function(){if(y(pb.name_))return pb.name_;var a,b,d=Oa.length,c,e;for(b=0;b<
d;++b)if(c=Oa[b],a=X.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return pb.name_=e},Oa=["ng-","data-ng-","ng:","x-ng-"],be=/[A-Z]/g,Ac=!1,Rb,Na=3,fe={full:"1.4.8",major:1,minor:4,dot:8,codeName:"ice-manipulation"};N.expando="ng339";var gb=N.cache={},Ff=1;N._data=function(a){return this.cache[a[this.expando]]||{}};var Af=/([\:\-\_]+(.))/g,Bf=/^moz([A-Z])/,xb={mouseleave:"mouseout",mouseenter:"mouseover"},Ub=G("jqLite"),Ef=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,Tb=/<|&#?\w+;/,
Cf=/<([\w:-]+)/,Df=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,ka={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ka.optgroup=ka.option;ka.tbody=ka.tfoot=ka.colgroup=ka.caption=ka.thead;ka.th=ka.td;var Kf=Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&
16)},Pa=N.prototype={ready:function(a){function b(){d||(d=!0,a())}var d=!1;"complete"===X.readyState?setTimeout(b):(this.on("DOMContentLoaded",b),N(S).on("load",b))},toString:function(){var a=[];n(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?B(this[a]):B(this[this.length+a])},length:0,push:mg,sort:[].sort,splice:[].splice},Cb={};n("multiple selected checked disabled readOnly required open".split(" "),function(a){Cb[F(a)]=a});var Rc={};n("input select option textarea button form details".split(" "),
function(a){Rc[a]=!0});var Zc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};n({data:Wb,removeData:vb,hasData:function(a){for(var b in gb[a.ng339])return!0;return!1}},function(a,b){N[b]=a});n({data:Wb,inheritedData:Bb,scope:function(a){return B.data(a,"$scope")||Bb(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return B.data(a,"$isolateScope")||B.data(a,"$isolateScopeNoTemplate")},controller:Oc,injector:function(a){return Bb(a,
"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:yb,css:function(a,b,d){b=fb(b);if(y(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Na&&2!==c&&8!==c)if(c=F(b),Cb[c])if(y(d))d?(a[b]=!0,a.setAttribute(b,c)):(a[b]=!1,a.removeAttribute(c));else return a[b]||(a.attributes.getNamedItem(b)||x).specified?c:u;else if(y(d))a.setAttribute(b,d);else if(a.getAttribute)return a=a.getAttribute(b,2),null===a?u:a},prop:function(a,b,d){if(y(d))a[b]=d;else return a[b]},
text:function(){function a(a,d){if(q(d)){var c=a.nodeType;return 1===c||c===Na?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(q(b)){if(a.multiple&&"select"===ta(a)){var d=[];n(a.options,function(a){a.selected&&d.push(a.value||a.text)});return 0===d.length?null:d}return a.value}a.value=b},html:function(a,b){if(q(b))return a.innerHTML;ub(a,!0);a.innerHTML=b},empty:Pc},function(a,b){N.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==Pc&&q(2==a.length&&a!==yb&&a!==Oc?
b:c)){if(H(b)){for(e=0;e<g;e++)if(a===Wb)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=a.$dv;g=q(e)?Math.min(g,1):g;for(f=0;f<g;f++){var h=a(this[f],b,c);e=e?e+h:h}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});n({removeData:vb,on:function(a,b,d,c){if(y(c))throw Ub("onargs");if(Kc(a)){c=wb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=Hf(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,h=function(b,c,g){var h=e[b];h||(h=e[b]=[],h.specialHandlerWrapper=c,"$destroy"===
b||g||a.addEventListener(b,f,!1));h.push(d)};g--;)b=c[g],xb[b]?(h(xb[b],Jf),h(b,u,!0)):h(b)}},off:Nc,one:function(a,b,d){a=B(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;ub(a);n(new N(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];n(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=
a.nodeType;if(1===d||11===d){b=new N(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;n(new N(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){b=B(b).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(b,a);b.appendChild(a)},remove:Xb,detach:function(a){Xb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;b=new N(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}},addClass:Ab,removeClass:zb,
toggleClass:function(a,b,d){b&&n(b.split(" "),function(b){var e=d;q(e)&&(e=!yb(a,b));(e?Ab:zb)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:Vb,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=wb(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},
stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:x,type:f,target:a},b.type&&(c=M(c,b)),b=ia(g),e=d?[c].concat(d):[c],n(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){N.prototype[b]=function(b,c,e){for(var f,g=0,h=this.length;g<h;g++)q(f)?(f=a(this[g],b,c,e),y(f)&&(f=B(f))):Mc(f,a(this[g],b,c,e));return y(f)?f:this};N.prototype.bind=N.prototype.on;
N.prototype.unbind=N.prototype.off});Sa.prototype={put:function(a,b){this[Ca(a,this.nextUid)]=b},get:function(a){return this[Ca(a,this.nextUid)]},remove:function(a){var b=this[a=Ca(a,this.nextUid)];delete this[a];return b}};var yf=[function(){this.$get=[function(){return Sa}]}],Tc=/^[^\(]*\(\s*([^\)]*)\)/m,ng=/,/,og=/^\s*(_?)(\S+?)\1\s*$/,Sc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Da=G("$injector");eb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw E(d)&&
d||(d=a.name||Lf(a)),Da("strictdi",d);b=a.toString().replace(Sc,"");b=b.match(Tc);n(b[1].split(ng),function(a){a.replace(og,function(a,b,d){c.push(d)})})}a.$inject=c}}else I(a)?(b=a.length-1,Qa(a[b],"fn"),c=a.slice(0,b)):Qa(a,"fn",!0);return c};var Md=G("$animate"),Ue=function(){this.$get=["$q","$$rAF",function(a,b){function d(){}d.all=x;d.chain=x;d.prototype={end:x,cancel:x,resume:x,pause:x,complete:x,then:function(c,d){return a(function(a){b(function(){a()})}).then(c,d)}};return d}]},Te=function(){var a=
new Sa,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=E(b)?b.split(" "):I(b)?b:[],n(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){n(b,function(b){var c=a.get(b);if(c){var d=Mf(b.attr("class")),e="",f="";n(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});n(b,function(a){e&&Ab(a,e);f&&zb(a,f)});a.remove(b)}});b.length=0}return{enabled:x,on:x,off:x,pin:x,push:function(g,h,k,l){l&&l();k=k||{};k.from&&g.css(k.from);
k.to&&g.css(k.to);if(k.addClass||k.removeClass)if(h=k.addClass,l=k.removeClass,k=a.get(g)||{},h=e(k,h,!0),l=e(k,l,!1),h||l)a.put(g,k),b.push(g),1===b.length&&c.$$postDigest(f);return new d}}}]},Re=["$provide",function(a){var b=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,c){if(d&&"."!==d.charAt(0))throw Md("notcsel",d);var e=d+"-animation";b.$$registeredAnimations[d.substr(1)]=e;a.factory(e,c)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=
a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Md("nongcls","ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var h;a:{for(h=0;h<d.length;h++){var k=d[h];if(1===k.nodeType){h=k;break a}}h=void 0}!h||h.parentNode||h.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(e,f,g,h){f=
f&&B(f);g=g&&B(g);f=f||g.parent();b(e,f,g);return a.push(e,"enter",Ea(h))},move:function(e,f,g,h){f=f&&B(f);g=g&&B(g);f=f||g.parent();b(e,f,g);return a.push(e,"move",Ea(h))},leave:function(b,c){return a.push(b,"leave",Ea(c),function(){b.remove()})},addClass:function(b,c,g){g=Ea(g);g.addClass=hb(g.addclass,c);return a.push(b,"addClass",g)},removeClass:function(b,c,g){g=Ea(g);g.removeClass=hb(g.removeClass,c);return a.push(b,"removeClass",g)},setClass:function(b,c,g,h){h=Ea(h);h.addClass=hb(h.addClass,
c);h.removeClass=hb(h.removeClass,g);return a.push(b,"setClass",h)},animate:function(b,c,g,h,k){k=Ea(k);k.from=k.from?M(k.from,c):c;k.to=k.to?M(k.to,g):g;k.tempClasses=hb(k.tempClasses,h||"ng-inline-animate");return a.push(b,"animate",k)}}}]}],Se=function(){this.$get=["$$rAF","$q",function(a,b){var d=function(){};d.prototype={done:function(a){this.defer&&this.defer[!0===a?"reject":"resolve"]()},end:function(){this.done()},cancel:function(){this.done(!0)},getPromise:function(){this.defer||(this.defer=
b.defer());return this.defer.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)}};return function(b,e){function f(){a(function(){e.addClass&&(b.addClass(e.addClass),e.addClass=null);e.removeClass&&(b.removeClass(e.removeClass),e.removeClass=null);e.to&&(b.css(e.to),e.to=null);g||h.done();g=!0});return h}e.cleanupStyles&&(e.from=e.to=null);e.from&&(b.css(e.from),e.from=
null);var g,h=new d;return{start:f,end:f}}}]},ha=G("$compile");Cc.$inject=["$provide","$$sanitizeUriProvider"];var Vc=/^((?:x|data)[\:\-_])/i,Qf=G("$controller"),Uc=/^(\S+)(\s+as\s+(\w+))?$/,$e=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof B&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},$c="application/json",ac={"Content-Type":$c+";charset=utf-8"},Sf=/^\[|^\{(?!\{)/,Tf={"[":/]$/,"{":/}$/},Rf=/^\)\]\}',?\n/,pg=G("$http"),dd=function(a){return function(){throw pg("legacy",
a);}},Ja=fa.$interpolateMinErr=G("$interpolate");Ja.throwNoconcat=function(a){throw Ja("noconcat",a);};Ja.interr=function(a,b){return Ja("interr",a,b.toString())};var qg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,Vf={http:80,https:443,ftp:21},Db=G("$location"),rg={$$html5:!1,$$replace:!1,absUrl:Eb("$$absUrl"),url:function(a){if(q(a))return this.$$url;var b=qg.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Eb("$$protocol"),
host:Eb("$$host"),port:Eb("$$port"),path:id("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(E(a)||Q(a))a=a.toString(),this.$$search=xc(a);else if(H(a))a=bb(a,{}),n(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw Db("isrcharg");break;default:q(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:id("$$hash",function(a){return null!==
a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};n([hd,dc,cc],function(a){a.prototype=Object.create(rg);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==cc||!this.$$html5)throw Db("nostate");this.$$state=q(b)?null:b;return this}});var ba=G("$parse"),Wf=Function.prototype.call,Xf=Function.prototype.apply,Yf=Function.prototype.bind,Lb=$();n("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Lb[a]=!0});var sg={n:"\n",f:"\f",r:"\r",
t:"\t",v:"\v","'":"'",'"':'"'},fc=function(a){this.options=a};fc.prototype={constructor:fc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;
else{var b=a+this.peek(),d=b+this.peek(2),c=Lb[b],e=Lb[d];Lb[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||
"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=y(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw ba("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=F(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var c=this.peek();
if("e"==d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var b=this.text.charAt(this.index);if(!this.isIdent(b)&&!this.isNumber(b))break;this.index++}this.tokens.push({index:a,
text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=sg[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,
value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var s=function(a,b){this.lexer=a;this.options=b};s.Program="Program";s.ExpressionStatement="ExpressionStatement";s.AssignmentExpression="AssignmentExpression";s.ConditionalExpression="ConditionalExpression";s.LogicalExpression="LogicalExpression";s.BinaryExpression="BinaryExpression";s.UnaryExpression="UnaryExpression";s.CallExpression="CallExpression";s.MemberExpression="MemberExpression";s.Identifier="Identifier";s.Literal=
"Literal";s.ArrayExpression="ArrayExpression";s.Property="Property";s.ObjectExpression="ObjectExpression";s.ThisExpression="ThisExpression";s.NGValueParameter="NGValueParameter";s.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:s.Program,
body:a}},expressionStatement:function(){return{type:s.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();this.expect("=")&&(a={type:s.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?
(d=this.expression(),{type:s.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:s.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a={type:s.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:s.BinaryExpression,
operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:s.BinaryExpression,operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:s.BinaryExpression,operator:b.text,
left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:s.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.constants.hasOwnProperty(this.peek().text)?a=bb(this.constants[this.consume().text]):this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():
this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:s.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===b.text?(a={type:s.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:s.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:s.CallExpression,callee:this.identifier(),
arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:s.Identifier,name:a.text}},constant:function(){return{type:s.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:s.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;b={type:s.Property,kind:"init"};this.peek().constant?b.key=this.constant():this.peek().identifier?b.key=this.identifier():this.throwError("invalid key",this.peek());this.consume(":");b.value=this.expression();a.push(b)}while(this.expect(","))}this.consume("}");return{type:s.ObjectExpression,properties:a}},
throwError:function(a,b){throw ba("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw ba("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw ba("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,e){if(this.tokens.length>a){a=this.tokens[a];
var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},constants:{"true":{type:s.Literal,value:!0},"false":{type:s.Literal,value:!1},"null":{type:s.Literal,value:null},undefined:{type:s.Literal,value:u},"this":{type:s.ThisExpression}}};rd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:b,fn:{vars:[],body:[],own:{}},assign:{vars:[],
body:[],own:{}},inputs:[]};W(c,d.$filter);var e="",f;this.stage="assign";if(f=pd(c))this.state.computing="assign",e=this.nextId(),this.recurse(f,e),this.return_(e),e="fn.assign="+this.generateFunction("assign","s,v,l");f=nd(c.body);d.stage="inputs";n(f,function(a,b){var c="fn"+b;d.state[c]={vars:[],body:[],own:{}};d.state.computing=c;var e=d.nextId();d.recurse(a,e);d.return_(e);d.state.inputs.push(c);a.watchId=b});this.state.computing="fn";this.stage="main";this.recurse(c);e='"'+this.USE+" "+this.STRICT+
'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+e+this.watchFns()+"return fn;";e=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","getStringValue","ensureSafeAssignContext","ifDefined","plus","text",e))(this.$filter,Va,xa,kd,jd,ld,Zf,md,a);this.state=this.stage=u;e.literal=qd(c);e.constant=c.constant;return e},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;n(b,function(b){a.push("var "+b+"="+d.generateFunction(b,
"s"))});b.length&&a.push("fn.inputs=["+b.join(",")+"];");return a.join("")},generateFunction:function(a,b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;n(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,
d,c,e,f){var g,h,k=this,l,m;c=c||x;if(!f&&y(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case s.Program:n(a.body,function(b,c){k.recurse(b.expression,u,u,function(a){h=a});c!==a.body.length-1?k.current().body.push(h,";"):k.return_(h)});break;case s.Literal:m=this.escape(a.value);this.assign(b,m);c(m);break;case s.UnaryExpression:this.recurse(a.argument,u,u,function(a){h=a});m=a.operator+"("+this.ifDefined(h,
0)+")";this.assign(b,m);c(m);break;case s.BinaryExpression:this.recurse(a.left,u,u,function(a){g=a});this.recurse(a.right,u,u,function(a){h=a});m="+"===a.operator?this.plus(g,h):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(h,0):"("+g+")"+a.operator+"("+h+")";this.assign(b,m);c(m);break;case s.LogicalExpression:b=b||this.nextId();k.recurse(a.left,b);k.if_("&&"===a.operator?b:k.not(b),k.lazyRecurse(a.right,b));c(b);break;case s.ConditionalExpression:b=b||this.nextId();k.recurse(a.test,
b);k.if_(b,k.lazyRecurse(a.alternate,b),k.lazyRecurse(a.consequent,b));c(b);break;case s.Identifier:b=b||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Va(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),function(){k.if_("inputs"===k.stage||"s",function(){e&&1!==e&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(b,k.nonComputedMember("s",
a.name))})},b&&k.lazyAssign(b,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Fb(a.name))&&k.addEnsureSafeObject(b);c(b);break;case s.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();k.recurse(a.object,g,u,function(){k.if_(k.notNull(g),function(){if(a.computed)h=k.nextId(),k.recurse(a.property,h),k.getStringValue(h),k.addEnsureSafeMemberName(h),e&&1!==e&&k.if_(k.not(k.computedMember(g,h)),k.lazyAssign(k.computedMember(g,h),"{}")),m=k.ensureSafeObject(k.computedMember(g,
h)),k.assign(b,m),d&&(d.computed=!0,d.name=h);else{Va(a.property.name);e&&1!==e&&k.if_(k.not(k.nonComputedMember(g,a.property.name)),k.lazyAssign(k.nonComputedMember(g,a.property.name),"{}"));m=k.nonComputedMember(g,a.property.name);if(k.state.expensiveChecks||Fb(a.property.name))m=k.ensureSafeObject(m);k.assign(b,m);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(b,"undefined")});c(b)},!!e);break;case s.CallExpression:b=b||this.nextId();a.filter?(h=k.filter(a.callee.name),l=[],n(a.arguments,
function(a){var b=k.nextId();k.recurse(a,b);l.push(b)}),m=h+"("+l.join(",")+")",k.assign(b,m),c(b)):(h=k.nextId(),g={},l=[],k.recurse(a.callee,h,g,function(){k.if_(k.notNull(h),function(){k.addEnsureSafeFunction(h);n(a.arguments,function(a){k.recurse(a,k.nextId(),u,function(a){l.push(k.ensureSafeObject(a))})});g.name?(k.state.expensiveChecks||k.addEnsureSafeObject(g.context),m=k.member(g.context,g.name,g.computed)+"("+l.join(",")+")"):m=h+"("+l.join(",")+")";m=k.ensureSafeObject(m);k.assign(b,m)},
function(){k.assign(b,"undefined")});c(b)}));break;case s.AssignmentExpression:h=this.nextId();g={};if(!od(a.left))throw ba("lval");this.recurse(a.left,u,g,function(){k.if_(k.notNull(g.context),function(){k.recurse(a.right,h);k.addEnsureSafeObject(k.member(g.context,g.name,g.computed));k.addEnsureSafeAssignContext(g.context);m=k.member(g.context,g.name,g.computed)+a.operator+h;k.assign(b,m);c(b||m)})},1);break;case s.ArrayExpression:l=[];n(a.elements,function(a){k.recurse(a,k.nextId(),u,function(a){l.push(a)})});
m="["+l.join(",")+"]";this.assign(b,m);c(m);break;case s.ObjectExpression:l=[];n(a.properties,function(a){k.recurse(a.value,k.nextId(),u,function(b){l.push(k.escape(a.key.type===s.Identifier?a.key.name:""+a.key.value)+":"+b)})});m="{"+l.join(",")+"}";this.assign(b,m);c(m);break;case s.ThisExpression:this.assign(b,"s");c("s");break;case s.NGValueParameter:this.assign(b,"v"),c("v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+
this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,
"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){return a+"."+b},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),";")},
addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},addEnsureSafeAssignContext:function(a){this.current().body.push(this.ensureSafeAssignContext(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},getStringValue:function(a){this.assign(a,"getStringValue("+a+",text)")},ensureSafeAssignContext:function(a){return"ensureSafeAssignContext("+
a+",text)"},lazyRecurse:function(a,b,d,c,e,f){var g=this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(E(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(Q(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===
typeof a)return"undefined";throw ba("esc");},nextId:function(a,b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};sd.prototype={compile:function(a,b){var d=this,c=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=b;W(c,d.$filter);var e,f;if(e=pd(c))f=this.recurse(e);e=nd(c.body);var g;e&&(g=[],n(e,function(a,b){var c=d.recurse(a);a.input=c;g.push(c);a.watchId=b}));var h=[];n(c.body,function(a){h.push(d.recurse(a.expression))});
e=0===c.body.length?function(){}:1===c.body.length?h[0]:function(a,b){var c;n(h,function(d){c=d(a,b)});return c};f&&(e.assign=function(a,b,c){return f(a,c,b)});g&&(e.inputs=g);e.literal=qd(c);e.constant=c.constant;return e},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case s.Literal:return this.value(a.value,b);case s.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case s.BinaryExpression:return c=this.recurse(a.left),
e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case s.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case s.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case s.Identifier:return Va(a.name,f.expression),f.identifier(a.name,f.expensiveChecks||Fb(a.name),b,d,f.expression);case s.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(Va(a.property.name,
f.expression),e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d,f.expression):this.nonComputedMember(c,e,f.expensiveChecks,b,d,f.expression);case s.CallExpression:return g=[],n(a.arguments,function(a){g.push(f.recurse(a))}),a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var r=[],n=0;n<g.length;++n)r.push(g[n](a,c,d,f));a=e.apply(u,r,f);return b?{context:u,name:u,value:a}:a}:function(a,
c,d,m){var r=e(a,c,d,m),n;if(null!=r.value){xa(r.context,f.expression);kd(r.value,f.expression);n=[];for(var q=0;q<g.length;++q)n.push(xa(g[q](a,c,d,m),f.expression));n=xa(r.value.apply(r.context,n),f.expression)}return b?{value:n}:n};case s.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,g,m){var n=c(a,d,g,m);a=e(a,d,g,m);xa(n.value,f.expression);ld(n.context);n.context[n.name]=a;return b?{value:a}:a};case s.ArrayExpression:return g=[],n(a.elements,function(a){g.push(f.recurse(a))}),
function(a,c,d,e){for(var f=[],n=0;n<g.length;++n)f.push(g[n](a,c,d,e));return b?{value:f}:f};case s.ObjectExpression:return g=[],n(a.properties,function(a){g.push({key:a.key.type===s.Identifier?a.key.name:""+a.key.value,value:f.recurse(a.value)})}),function(a,c,d,e){for(var f={},n=0;n<g.length;++n)f[g[n].key]=g[n].value(a,c,d,e);return b?{value:f}:f};case s.ThisExpression:return function(a){return b?{value:a}:a};case s.NGValueParameter:return function(a,c,d,e){return b?{value:d}:d}}},"unary+":function(a,
b){return function(d,c,e,f){d=a(d,c,e,f);d=y(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=y(d)?-d:0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=md(h,c);return d?{value:h}:h}},"binary-":function(a,b,d){return function(c,e,f,g){var h=a(c,e,f,g);c=b(c,e,f,g);h=(y(h)?h:0)-(y(c)?c:0);return d?{value:h}:h}},"binary*":function(a,
b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,
d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,h){e=a(e,f,g,h)?b(e,f,g,h):d(e,f,g,h);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:u,name:u,value:a}:a}},identifier:function(a,b,d,c,e){return function(f,g,h,k){f=
g&&a in g?g:f;c&&1!==c&&f&&!f[a]&&(f[a]={});g=f?f[a]:u;b&&xa(g,e);return d?{context:f,name:a,value:g}:g}},computedMember:function(a,b,d,c,e){return function(f,g,h,k){var l=a(f,g,h,k),m,n;null!=l&&(m=b(f,g,h,k),m=jd(m),Va(m,e),c&&1!==c&&l&&!l[m]&&(l[m]={}),n=l[m],xa(n,e));return d?{context:l,name:m,value:n}:n}},nonComputedMember:function(a,b,d,c,e,f){return function(g,h,k,l){g=a(g,h,k,l);e&&1!==e&&g&&!g[b]&&(g[b]={});h=null!=g?g[b]:u;(d||Fb(b))&&xa(h,f);return c?{context:g,name:b,value:h}:h}},inputs:function(a,
b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};var gc=function(a,b,d){this.lexer=a;this.$filter=b;this.options=d;this.ast=new s(this.lexer);this.astCompiler=d.csp?new sd(this.ast,b):new rd(this.ast,b)};gc.prototype={constructor:gc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};$();$();var $f=Object.prototype.valueOf,ya=G("$sce"),la={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ha=G("$compile"),Y=X.createElement("a"),wd=wa(S.location.href);
xd.$inject=["$document"];Jc.$inject=["$provide"];yd.$inject=["$locale"];Ad.$inject=["$locale"];var ic=".",jg={yyyy:ca("FullYear",4),yy:ca("FullYear",2,0,!0),y:ca("FullYear",1),MMMM:Hb("Month"),MMM:Hb("Month",!0),MM:ca("Month",2,1),M:ca("Month",1,1),dd:ca("Date",2),d:ca("Date",1),HH:ca("Hours",2),H:ca("Hours",1),hh:ca("Hours",2,-12),h:ca("Hours",1,-12),mm:ca("Minutes",2),m:ca("Minutes",1),ss:ca("Seconds",2),s:ca("Seconds",1),sss:ca("Milliseconds",3),EEEE:Hb("Day"),EEE:Hb("Day",!0),a:function(a,b){return 12>
a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Gb(Math[0<a?"floor":"ceil"](a/60),2)+Gb(Math.abs(a%60),2))},ww:Ed(2),w:Ed(1),G:jc,GG:jc,GGG:jc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},ig=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,hg=/^\-?\d+$/;zd.$inject=["$locale"];var eg=na(F),fg=na(sb);Bd.$inject=["$parse"];var he=na({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,
b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===sa.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),tb={};n(Cb,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!=a){var c=va("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,e)});tb[c]=function(){return{restrict:"A",priority:100,link:e}}}});n(Zc,function(a,b){tb[b]=function(){return{priority:100,link:function(a,
c,e){if("ngPattern"===b&&"/"==e.ngPattern.charAt(0)&&(c=e.ngPattern.match(lg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});n(["src","srcset","href"],function(a){var b=va("ng-"+a);tb[b]=function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===sa.call(c.prop("href"))&&(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),Ha&&f&&c.prop(f,e[g])):"href"===a&&e.$set(g,null)})}}}});
var Ib={$addControl:x,$$renameControl:function(a,b){a.$name=b},$removeControl:x,$setValidity:x,$setDirty:x,$setPristine:x,$setSubmitted:x};Fd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Nd=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||x}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Fd,compile:function(d,f){d.addClass(Wa).addClass(mb);var g=f.name?"name":a&&f.ngForm?"ngForm":
!1;return{pre:function(a,d,e,f){var n=f[0];if(!("action"in e)){var q=function(b){a.$apply(function(){n.$commitViewValue();n.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",q,!1);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",q,!1)},0,!1)})}(f[1]||n.$$parentForm).$addControl(n);var s=g?c(n.$name):x;g&&(s(a,n),e.$observe(g,function(b){n.$name!==b&&(s(a,u),n.$$parentForm.$$renameControl(n,b),s=c(n.$name),s(a,n))}));d.on("$destroy",function(){n.$$parentForm.$removeControl(n);
s(a,u);M(n,Ib)})}}}}}]},ie=Nd(),ve=Nd(!0),kg=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,tg=/^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/,ug=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,vg=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Od=/^(\d{4})-(\d{2})-(\d{2})$/,Pd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,mc=/^(\d{4})-W(\d\d)$/,Qd=/^(\d{4})-(\d\d)$/,
Rd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Sd={text:function(a,b,d,c,e,f){jb(a,b,d,c,e,f);kc(c)},date:kb("date",Od,Kb(Od,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":kb("datetimelocal",Pd,Kb(Pd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:kb("time",Rd,Kb(Rd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:kb("week",mc,function(a,b){if(da(a))return a;if(E(a)){mc.lastIndex=0;var d=mc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,h=0,k=Dd(c),e=7*(e-1);b&&(d=b.getHours(),f=
b.getMinutes(),g=b.getSeconds(),h=b.getMilliseconds());return new Date(c,0,k.getDate()+e,d,f,g,h)}}return NaN},"yyyy-Www"),month:kb("month",Qd,Kb(Qd,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Hd(a,b,d,c);jb(a,b,d,c,e,f);c.$$parserName="number";c.$parsers.push(function(a){return c.$isEmpty(a)?null:vg.test(a)?parseFloat(a):u});c.$formatters.push(function(a){if(!c.$isEmpty(a)){if(!Q(a))throw lb("numfmt",a);a=a.toString()}return a});if(y(d.min)||d.ngMin){var g;c.$validators.min=function(a){return c.$isEmpty(a)||
q(g)||a>=g};d.$observe("min",function(a){y(a)&&!Q(a)&&(a=parseFloat(a,10));g=Q(a)&&!isNaN(a)?a:u;c.$validate()})}if(y(d.max)||d.ngMax){var h;c.$validators.max=function(a){return c.$isEmpty(a)||q(h)||a<=h};d.$observe("max",function(a){y(a)&&!Q(a)&&(a=parseFloat(a,10));h=Q(a)&&!isNaN(a)?a:u;c.$validate()})}},url:function(a,b,d,c,e,f){jb(a,b,d,c,e,f);kc(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||tg.test(d)}},email:function(a,b,d,c,e,f){jb(a,b,d,c,e,f);kc(c);
c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||ug.test(d)}},radio:function(a,b,d,c){q(d.name)&&b.attr("name",++nb);b.on("click",function(a){b[0].checked&&c.$setViewValue(d.value,a&&a.type)});c.$render=function(){b[0].checked=d.value==c.$viewValue};d.$observe("value",c.$render)},checkbox:function(a,b,d,c,e,f,g,h){var k=Id(h,a,"ngTrueValue",d.ngTrueValue,!0),l=Id(h,a,"ngFalseValue",d.ngFalseValue,!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&
a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return ma(a,k)});c.$parsers.push(function(a){return a?k:l})},hidden:x,button:x,submit:x,reset:x,file:x},Dc=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,h){h[0]&&(Sd[F(g.type)]||Sd.text)(e,f,g,h[0],b,a,d,c)}}}}],wg=/^(true|false|\d+)$/,Ne=function(){return{restrict:"A",priority:100,compile:function(a,
b){return wg.test(b.ngValue)?function(a,b,e){e.$set("value",a.$eval(e.ngValue))}:function(a,b,e){a.$watch(e.ngValue,function(a){e.$set("value",a)})}}}},ne=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=q(a)?"":a})}}}}],pe=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));
b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=q(a)?"":a})}}}}],oe=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){c.html(a.getTrustedHtml(f(b))||"")})}}}}],Me=na({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
qe=lc("",!0),se=lc("Odd",0),re=lc("Even",1),te=La({compile:function(a,b){b.$set("ngCloak",u);a.removeClass("ng-cloak")}}),ue=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Ic={},xg={blur:!0,focus:!0};n("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=va("ng-"+a);Ic[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=
d(f[b],null,!0);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};xg[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var xe=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(b,d,c,e,f){var g,h,k;b.$watch(c.ngIf,function(b){b?h||f(function(b,e){h=e;b[b.length++]=X.createComment(" end ngIf: "+c.ngIf+" ");g={clone:b};a.enter(b,d.parent(),d)}):(k&&(k.remove(),k=null),h&&(h.$destroy(),h=null),g&&(k=
rb(g.clone),a.leave(k).then(function(){k=null}),g=null))})}}}],ye=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:fa.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",h=e.autoscroll;return function(c,e,m,n,q){var s=0,v,u,p,C=function(){u&&(u.remove(),u=null);v&&(v.$destroy(),v=null);p&&(d.leave(p).then(function(){u=null}),u=p,p=null)};c.$watch(f,function(f){var m=function(){!y(h)||h&&!c.$eval(h)||
b()},u=++s;f?(a(f,!0).then(function(a){if(u===s){var b=c.$new();n.template=a;a=q(b,function(a){C();d.enter(a,null,e).then(m)});v=b;p=a;v.$emit("$includeContentLoaded",f);c.$eval(g)}},function(){u===s&&(C(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(C(),n.template=null)})}}}}],Pe=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){/SVG/.test(d[0].toString())?(d.empty(),a(Lc(e.template,X).childNodes)(b,function(a){d.append(a)},
{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],ze=La({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),Le=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=b.attr(d.$attr.ngList)||", ",f="false"!==d.ngTrim,g=f?U(e):e;c.$parsers.push(function(a){if(!q(a)){var b=[];a&&n(a.split(g),function(a){a&&b.push(f?U(a):a)});return b}});c.$formatters.push(function(a){return I(a)?a.join(e):u});c.$isEmpty=function(a){return!a||
!a.length}}}},mb="ng-valid",Jd="ng-invalid",Wa="ng-pristine",Jb="ng-dirty",Ld="ng-pending",lb=G("ngModel"),yg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,b,d,c,e,f,g,h,k,l){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=u;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;
this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=u;this.$name=l(d.name||"",!1)(a);this.$$parentForm=Ib;var m=e(d.ngModel),r=m.assign,t=m,s=r,v=null,B,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var b=e(d.ngModel+"()"),f=e(d.ngModel+"($$$p)");t=function(a){var c=m(a);z(c)&&(c=b(a));return c};s=function(a,b){z(m(a))?f(a,{$$$p:p.$modelValue}):r(a,p.$modelValue)}}else if(!m.assign)throw lb("nonassign",d.ngModel,ua(c));};this.$render=x;this.$isEmpty=
function(a){return q(a)||""===a||null===a||a!==a};var C=0;Gd({ctrl:this,$element:c,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]},$animate:f});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;f.removeClass(c,Jb);f.addClass(c,Wa)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;f.removeClass(c,Wa);f.addClass(c,Jb);p.$$parentForm.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;f.setClass(c,"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=
!0;p.$untouched=!1;f.setClass(c,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){g.cancel(v);p.$viewValue=p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!Q(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,b=p.$valid,c=p.$modelValue,d=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,function(e){d||b===e||(p.$modelValue=e?a:u,p.$modelValue!==c&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,b,c){function d(){var c=
!0;n(p.$validators,function(d,e){var g=d(a,b);c=c&&g;f(e,g)});return c?!0:(n(p.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;n(p.$asyncValidators,function(e,g){var h=e(a,b);if(!h||!z(h.then))throw lb("$asyncValidators",h);f(g,u);c.push(h.then(function(){f(g,!0)},function(a){d=!1;f(g,!1)}))});c.length?k.all(c).then(function(){g(d)},x):g(!0)}function f(a,b){h===C&&p.$setValidity(a,b)}function g(a){h===C&&c(a)}C++;var h=C;(function(){var a=p.$$parserName||"parse";if(q(B))f(a,
null);else return B||(n(p.$validators,function(a,b){f(b,null)}),n(p.$asyncValidators,function(a,b){f(b,null)})),f(a,B),B;return!0})()?d()?e():g(!1):g(!1)};this.$commitViewValue=function(){var a=p.$viewValue;g.cancel(v);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var b=p.$$lastCommittedViewValue;if(B=q(b)?u:!0)for(var c=0;c<p.$parsers.length;c++)if(b=p.$parsers[c](b),
q(b)){B=!1;break}Q(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=t(a));var d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=b;e&&(p.$modelValue=b,p.$modelValue!==d&&p.$$writeModelToScope());p.$$runValidators(b,p.$$lastCommittedViewValue,function(a){e||(p.$modelValue=a?b:u,p.$modelValue!==d&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,p.$modelValue);n(p.$viewChangeListeners,function(a){try{a()}catch(c){b(c)}})};this.$setViewValue=function(a,b){p.$viewValue=
a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(b)};this.$$debounceViewValueCommit=function(b){var c=0,d=p.$options;d&&y(d.debounce)&&(d=d.debounce,Q(d)?c=d:Q(d[b])?c=d[b]:Q(d["default"])&&(c=d["default"]));g.cancel(v);c?v=g(function(){p.$commitViewValue()},c):h.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var b=t(a);if(b!==p.$modelValue&&(p.$modelValue===p.$modelValue||b===b)){p.$modelValue=p.$$rawModelValue=b;B=u;for(var c=p.$formatters,
d=c.length,e=b;d--;)e=c[d](e);p.$viewValue!==e&&(p.$viewValue=p.$$lastCommittedViewValue=e,p.$render(),p.$$runValidators(b,e,x))}return b})}],Ke=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:yg,priority:1,compile:function(b){b.addClass(Wa).addClass("ng-untouched").addClass(mb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;g.$$setOptions(f[2]&&f[2].$options);b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,
a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)c.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});c.on("blur",function(c){g.$touched||(a.$$phase?b.$evalAsync(g.$setTouched):b.$apply(g.$setTouched))})}}}}}],zg=/(\s+|^)default(\s+|$)/,Oe=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,b){var d=this;this.$options=bb(a.$eval(b.ngModelOptions));y(this.$options.updateOn)?
(this.$options.updateOnDefault=!1,this.$options.updateOn=U(this.$options.updateOn.replace(zg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ae=La({terminal:!0,priority:1E3}),Ag=G("ngOptions"),Bg=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,Ie=["$compile","$parse",function(a,
b){function d(a,c,d){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function l(a){var b;if(!q&&za(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var m=a.match(Bg);if(!m)throw Ag("iexp",a,ua(c));var n=m[5]||m[7],q=m[6];a=/ as /.test(m[0])&&m[1];var s=m[9];c=b(m[2]?m[1]:n);var v=a&&b(a)||c,u=s&&b(s),p=s?function(a,b){return u(d,b)}:function(a){return Ca(a)},C=function(a,b){return p(a,z(a,b))},w=b(m[2]||
m[1]),y=b(m[3]||""),B=b(m[4]||""),x=b(m[8]),D={},z=q?function(a,b){D[q]=b;D[n]=a;return D}:function(a){D[n]=a;return D};return{trackBy:s,getTrackByValue:C,getWatchables:b(x,function(a){var b=[];a=a||[];for(var c=l(a),e=c.length,f=0;f<e;f++){var g=a===c?f:c[f],k=z(a[g],g),g=p(a[g],k);b.push(g);if(m[2]||m[1])g=w(d,k),b.push(g);m[4]&&(k=B(d,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},c=x(d)||[],f=l(c),g=f.length,m=0;m<g;m++){var n=c===f?m:f[m],r=z(c[n],n),q=v(d,r),n=p(q,r),t=w(d,
r),u=y(d,r),r=B(d,r),q=new e(n,q,t,u,r);a.push(q);b[n]=q}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[C(a)]},getViewValueFromOption:function(a){return s?fa.copy(a.viewValue):a.viewValue}}}}}var c=X.createElement("option"),e=X.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","?ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=x},post:function(b,g,h,k){function l(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,
b.textContent=a.label);a.value!==b.value&&(b.value=a.selectValue)}function m(a,b,c,d){b&&F(b.nodeName)===c?c=b:(c=d.cloneNode(!1),b?a.insertBefore(c,b):a.appendChild(c));return c}function r(a){for(var b;a;)b=a.nextSibling,Xb(a),a=b}function q(a){var b=p&&p[0],c=z&&z[0];if(b||c)for(;a&&(a===b||a===c||8===a.nodeType||""===a.value);)a=a.nextSibling;return a}function s(){var a=D&&u.readValue();D=E.getOptions();var b={},d=g[0].firstChild;x&&g.prepend(p);d=q(d);D.items.forEach(function(a){var f,h;a.group?
(f=b[a.group],f||(f=m(g[0],d,"optgroup",e),d=f.nextSibling,f.label=a.group,f=b[a.group]={groupElement:f,currentOptionElement:f.firstChild}),h=m(f.groupElement,f.currentOptionElement,"option",c),l(a,h),f.currentOptionElement=h.nextSibling):(h=m(g[0],d,"option",c),l(a,h),d=h.nextSibling)});Object.keys(b).forEach(function(a){r(b[a].currentOptionElement)});r(d);v.$render();if(!v.$isEmpty(a)){var f=u.readValue();(E.trackBy?ma(a,f):a===f)||(v.$setViewValue(f),v.$render())}}var v=k[1];if(v){var u=k[0];k=
h.multiple;for(var p,C=0,w=g.children(),y=w.length;C<y;C++)if(""===w[C].value){p=w.eq(C);break}var x=!!p,z=B(c.cloneNode(!1));z.val("?");var D,E=d(h.ngOptions,g,b);k?(v.$isEmpty=function(a){return!a||0===a.length},u.writeValue=function(a){D.items.forEach(function(a){a.element.selected=!1});a&&a.forEach(function(a){(a=D.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},u.readValue=function(){var a=g.val()||[],b=[];n(a,function(a){(a=D.selectValueMap[a])&&!a.disabled&&b.push(D.getViewValueFromOption(a))});
return b},E.trackBy&&b.$watchCollection(function(){if(I(v.$viewValue))return v.$viewValue.map(function(a){return E.getTrackByValue(a)})},function(){v.$render()})):(u.writeValue=function(a){var b=D.getOptionFromViewValue(a);b&&!b.disabled?g[0].value!==b.selectValue&&(z.remove(),x||p.remove(),g[0].value=b.selectValue,b.element.selected=!0,b.element.setAttribute("selected","selected")):null===a||x?(z.remove(),x||g.prepend(p),g.val(""),p.prop("selected",!0),p.attr("selected",!0)):(x||p.remove(),g.prepend(z),
g.val("?"),z.prop("selected",!0),z.attr("selected",!0))},u.readValue=function(){var a=D.selectValueMap[g.val()];return a&&!a.disabled?(x||p.remove(),z.remove(),D.getViewValueFromOption(a)):null},E.trackBy&&b.$watch(function(){return E.getTrackByValue(v.$viewValue)},function(){v.$render()}));x?(p.remove(),a(p)(b),p.removeClass("ng-scope")):p=B(c.cloneNode(!1));s();b.$watchCollection(E.getWatchables,s)}}}}}],Be=["$locale","$interpolate","$log",function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,
g,h){function k(a){g.text(a||"")}var l=h.count,m=h.$attr.when&&g.attr(h.$attr.when),r=h.offset||0,s=f.$eval(m)||{},u={},v=b.startSymbol(),y=b.endSymbol(),p=v+l+"-"+r+y,C=fa.noop,w;n(h,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+F(c[2]),s[c]=g.attr(h.$attr[b]))});n(s,function(a,d){u[d]=b(a.replace(c,p))});f.$watch(l,function(b){var c=parseFloat(b),e=isNaN(c);e||c in s||(c=a.pluralCat(c-r));c===w||e&&Q(w)&&isNaN(w)||(C(),e=u[c],q(e)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+
m),C=x,k()):C=f.$watch(e,k),w=c)})}}}],Ce=["$parse","$animate",function(a,b){var d=G("ngRepeat"),c=function(a,b,c,d,k,l,m){a[c]=d;k&&(a[k]=l);a.$index=b;a.$first=0===b;a.$last=b===m-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(e,f){var g=f.ngRepeat,h=X.createComment(" end ngRepeat: "+g+" "),k=g.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if(!k)throw d("iexp",g);var l=k[1],m=k[2],r=k[3],q=k[4],k=l.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",l);var s=k[3]||k[1],v=k[2];if(r&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r)))throw d("badident",r);var x,p,y,w,z={$id:Ca};q?x=a(q):(y=function(a,b){return Ca(b)},w=function(a){return a});return function(a,e,f,k,l){x&&(p=function(b,c,d){v&&(z[v]=b);z[s]=c;z.$index=
d;return x(a,z)});var q=$();a.$watchCollection(m,function(f){var k,m,t=e[0],x,z=$(),D,E,H,F,I,G,J;r&&(a[r]=f);if(za(f))I=f,m=p||y;else for(J in m=p||w,I=[],f)qa.call(f,J)&&"$"!==J.charAt(0)&&I.push(J);D=I.length;J=Array(D);for(k=0;k<D;k++)if(E=f===I?k:I[k],H=f[E],F=m(E,H,k),q[F])G=q[F],delete q[F],z[F]=G,J[k]=G;else{if(z[F])throw n(J,function(a){a&&a.scope&&(q[a.id]=a)}),d("dupes",g,F,H);J[k]={id:F,scope:u,clone:u};z[F]=!0}for(x in q){G=q[x];F=rb(G.clone);b.leave(F);if(F[0].parentNode)for(k=0,m=F.length;k<
m;k++)F[k].$$NG_REMOVED=!0;G.scope.$destroy()}for(k=0;k<D;k++)if(E=f===I?k:I[k],H=f[E],G=J[k],G.scope){x=t;do x=x.nextSibling;while(x&&x.$$NG_REMOVED);G.clone[0]!=x&&b.move(rb(G.clone),null,B(t));t=G.clone[G.clone.length-1];c(G.scope,k,s,H,v,E,D)}else l(function(a,d){G.scope=d;var e=h.cloneNode(!1);a[a.length++]=e;b.enter(a,null,B(t));t=e;G.clone=a;z[G.id]=G;c(G.scope,k,s,H,v,E,D)});q=z})}}}}],De=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?
"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],we=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ee=La(function(a,b,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&n(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),Fe=["$animate",function(a){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(b,
d,c,e){var f=[],g=[],h=[],k=[],l=function(a,b){return function(){a.splice(b,1)}};b.$watch(c.ngSwitch||c.on,function(b){var c,d;c=0;for(d=h.length;c<d;++c)a.cancel(h[c]);c=h.length=0;for(d=k.length;c<d;++c){var q=rb(g[c].clone);k[c].$destroy();(h[c]=a.leave(q)).then(l(h,c))}g.length=0;k.length=0;(f=e.cases["!"+b]||e.cases["?"])&&n(f,function(b){b.transclude(function(c,d){k.push(d);var e=b.element;c[c.length++]=X.createComment(" end ngSwitchWhen: ");g.push({clone:c});a.enter(c,e.parent(),e)})})})}}}],
Ge=La({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["!"+d.ngSwitchWhen]=c.cases["!"+d.ngSwitchWhen]||[];c.cases["!"+d.ngSwitchWhen].push({transclude:e,element:b})}}),He=La({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),Je=La({restrict:"EAC",link:function(a,b,d,c,e){if(!e)throw G("ngTransclude")("orphan",ua(b));e(function(a){b.empty();
b.append(a)})}}),je=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"==d.type&&a.put(d.id,b[0].text)}}}],Cg={$setViewValue:x,$render:x},Dg=["$element","$scope","$attrs",function(a,b,d){var c=this,e=new Sa;c.ngModelCtrl=Cg;c.unknownOption=B(X.createElement("option"));c.renderUnknownOption=function(b){b="? "+Ca(b)+" ?";c.unknownOption.val(b);a.prepend(c.unknownOption);a.val(b)};b.$on("$destroy",function(){c.renderUnknownOption=x});c.removeUnknownOption=
function(){c.unknownOption.parent()&&c.unknownOption.remove()};c.readValue=function(){c.removeUnknownOption();return a.val()};c.writeValue=function(b){c.hasOption(b)?(c.removeUnknownOption(),a.val(b),""===b&&c.emptyOption.prop("selected",!0)):null==b&&c.emptyOption?(c.removeUnknownOption(),a.val("")):c.renderUnknownOption(b)};c.addOption=function(a,b){Ra(a,'"option value"');""===a&&(c.emptyOption=b);var d=e.get(a)||0;e.put(a,d+1);c.ngModelCtrl.$render();b[0].hasAttribute("selected")&&(b[0].selected=
!0)};c.removeOption=function(a){var b=e.get(a);b&&(1===b?(e.remove(a),""===a&&(c.emptyOption=u)):e.put(a,b-1))};c.hasOption=function(a){return!!e.get(a)};c.registerOption=function(a,b,d,e,l){if(e){var m;d.$observe("value",function(a){y(m)&&c.removeOption(m);m=a;c.addOption(a,b)})}else l?a.$watch(l,function(a,e){d.$set("value",a);e!==a&&c.removeOption(e);c.addOption(a,b)}):c.addOption(d.value,b);b.on("$destroy",function(){c.removeOption(d.value);c.ngModelCtrl.$render()})}}],ke=function(){return{restrict:"E",
require:["select","?ngModel"],controller:Dg,priority:1,link:{pre:function(a,b,d,c){var e=c[1];if(e){var f=c[0];f.ngModelCtrl=e;e.$render=function(){f.writeValue(e.$viewValue)};b.on("change",function(){a.$apply(function(){e.$setViewValue(f.readValue())})});if(d.multiple){f.readValue=function(){var a=[];n(b.find("option"),function(b){b.selected&&a.push(b.value)});return a};f.writeValue=function(a){var c=new Sa(a);n(b.find("option"),function(a){a.selected=y(c.get(a.value))})};var g,h=NaN;a.$watch(function(){h!==
e.$viewValue||ma(g,e.$viewValue)||(g=ia(e.$viewValue),e.$render());h=e.$viewValue});e.$isEmpty=function(a){return!a||0===a.length}}}}}}},me=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){if(y(d.value))var c=a(d.value,!0);else{var e=a(b.text(),!0);e||d.$set("value",b.text())}return function(a,b,d){var k=b.parent();(k=k.data("$selectController")||k.parent().data("$selectController"))&&k.registerOption(a,b,d,c,e)}}}}],le=na({restrict:"E",terminal:!1}),Fc=function(){return{restrict:"A",
require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},Ec=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){E(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw G("ngPattern")("noregexp",f,a,ua(b));e=a||u;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||
q(e)||e.test(b)}}}}},Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=ea(a);e=isNaN(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||b.length<=e}}}}},Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=ea(a)||0;c.$validate()});c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};S.angular.bootstrap?
console.log("WARNING: Tried to load angular more than once."):(ce(),ee(fa),fa.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",
negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",pluralCat:function(a,c){var e=a|0,f=c;u===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),B(X).ready(function(){Zd(X,yc)}))})(window,document);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map
;
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width"),n=this.height=i(t.canvas,"Height");t.canvas.width=e,t.canvas.height=n;var e=this.width=t.canvas.width,n=this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(){var t=Array.prototype.slice.call(arguments,0);return t.unshift({}),a.apply(null,t)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){return t%1!==0&&f(t)?t.toString().split(".")[1].length:0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),C=(s.calculateScaleRange=function(t,i,e,s,n){var o=2,a=Math.floor(i/(1.5*e)),h=o>=a,l=g(t),r=m(t);l===r&&(l+=.5,r>=.5&&!s?r-=.5:l+=.5);for(var c=Math.abs(l-r),u=y(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=s?0:Math.floor(r/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),S=Math.round(f/v);(S>a||a>2*S)&&!h;)if(S>a)v*=2,S=Math.round(f/v),S%1!==0&&(h=!0);else if(n&&u>=0){if(v/2%1!==0)break;v/=2,S=Math.round(f/v)}else v/=2,S=Math.round(f/v);return h&&(S=o,v=f/S),{steps:S,stepValue:v,min:p,max:p+S*v}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),w=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return labelTemplateString&&n(o,function(i,n){o[n]=C(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin(2*(1*t-i)*Math.PI/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=.3*1.5),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e):s*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-w.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*w.easeInBounce(2*t):.5*w.easeOutBounce(2*t-1)+.5}}),b=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),L=(s.animationLoop=function(t,i,e,s,n,o){var a=0,h=w[e]||w.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=b(l):n.apply(o)};b(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),k=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},F=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},L(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){k(t.chart.canvas,e,i)})}),R=s.getMaximumWidth=function(t){var i=t.parentNode;return i.clientWidth},T=s.getMaximumHeight=function(t){var i=t.parentNode;return i.clientHeight},A=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),M=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},W=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},B=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return M(this.chart),this},stop:function(){return P(this.animationFrame),this},resize:function(t){this.stop();var i=this.chart.canvas,e=R(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:T(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,A(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?s.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return C(this.options.legendTemplate,this)},destroy:function(){this.clear(),F(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(){var t,i,e,n,o,a=[],l=[],r=[];return s.each(this.datasets,function(i){t=i.points||i.bars||i.segments,t[h]&&t[h].hasValue()&&a.push(t[h])}),s.each(a,function(t){l.push(t.x),r.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),o=m(r),e=g(r),n=m(l),i=g(l),{x:n>this.chart.width/2?n:i,y:(o+e)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:C(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle>=this.startAngle&&e.angle<=this.endAngle,o=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return n&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}B(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=W(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleFontSize/2:i+(1.5*this.fontSize*e+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{B(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint-this.startPoint;for(this.calculateYRange(i),this.buildYLabels(),this.calculateXLabelRotation();i>this.endPoint-this.startPoint;)i=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(i),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth+10?e/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(C(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){if(this.angleLineWidth>0){var e=this.getPointPosition(i,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(e.x,e.y),t.stroke(),t.closePath()}var s=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var o=this.labels.length,a=this.labels.length/2,h=a/2,l=h>i||i>o-h,r=i===h||i===o-h;t.textAlign=0===i?"center":i===a?"center":a>i?"left":"right",t.textBaseline=r?"middle":l?"bottom":"top",t.fillText(this.labels[i],s.x,s.y)}}}}}),s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.bars.push(new this.BarClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))
},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),e||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);
//hacer desplegable para cambiar ocnfiguracion

conexion = 'localhost:3000/websocket';

//DataLinea

datoreal='Voltaje';
dato = 'ee' ;
año = 0;
mes = 0;
dia = 0;
descargardatos =[]; 
cantidaddatos = 80;
datareal =0;
descargardatos2 =[];
descargardatos3 =[];
descargardatos22 = [];
descargardatos33 = [];
tiempovista=350000;


function vistas(tiempovistas){

setTimeout(function(){ 

asd=window.location.pathname;
asd1=asd.split("/");
if (asd1[1]==="1"){
url = "http://100.1.145.3:3000/2";
window.location.href = url;
}else if(asd1[1]==="2"){
url = "http://100.1.145.3:3000/3";
window.location.href = url; 
}else if(asd1[1]==="3"){
url = "http://100.1.145.3:3000/1";
window.location.href = url;
}


 }, tiempovistas);





}

function inicio (){

message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.tiempovista',message);
dispatcher.bind('graficos.tiempovista', function(task) {

 tiempovistas=task*1000;
 vistas(tiempovistas);


});
var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


};


function grafico1() {

graficolinea.destroy();
message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.vista1',message);
dispatcher.bind('graficos.vista1', function(task) {

lineaData["datasets"][0].data = task[0] ;

//x axis

if (task[1]=="dia"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; 
}else if(task[1]=="mes"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]; 
}else if(task[1]=="año"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12"]; 
};


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


});

dispatcher.bind('graficos.titulo1', function(task) {





titulo = task[0]+" "+task[1];
//para colocar el titulo añomesdia
//+" "+task[2]+"-"+task[3]+"-"+task[4]

document.getElementById('titulografico1').innerHTML=titulo;
document.getElementById('tiempoti').innerHTML=task[1];


});
     


};


function grafico2() {

graficolinea.destroy();
message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.vista2',message);
dispatcher.bind('graficos.vista2', function(task) {

descargardatos=task;
lineaData["datasets"][0].data = task[0] ;


//x axis

if (task[1]=="dia"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; 
}else if(task[1]=="mes"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]; 
}else if(task[1]=="año"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12"]; 
};


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


});

dispatcher.bind('graficos.titulo2', function(task) {
titulo = task[0]+" "+task[1];
//para colocar el titulo añomesdia
//+" "+task[2]+"-"+task[3]+"-"+task[4]

document.getElementById('titulografico2').innerHTML=titulo;


});
     


};

function grafico3() {

graficolinea.destroy();
message='';
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.vista3',message);
dispatcher.bind('graficos.vista3', function(task) {

descargardatos=task;

lineaData["datasets"][0].data = task[0] ;


if (task[1]=="dia"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; 
}else if(task[1]=="mes"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]; 
}else if(task[1]=="año"){
lineaData["labels"] = ["0","1","2","3","4","5","6","7","8","9","10","11","12"]; 
};


var linea = document.getElementById('linea').getContext('2d');
graficolinea = new Chart(linea).Line(lineaData,lineOption);


});

dispatcher.bind('graficos.titulo3', function(task) {
titulo = task[0]+" "+task[1]
//para colocar el titulo añomesdia
//+" "+task[2]+"-"+task[3]+"-"+task[4]

;
document.getElementById('titulografico3').innerHTML=titulo;


});
     


};
//Archivo para configurar opciones de los graficos


//Configurar grafico de linea

var lineaData = {

  labels : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"],
  
  datasets : [

    {
      
      fillColor : "rgba(172,194,132,0.4)",
      strokeColor : "#ACC26D",
      pointColor : "#fff",
      pointStrokeColor : "#9DB86D",
      data: [],
    
    },{
      fillColor : "blue",
      strokeColor : "#ACC26D",
      pointColor : "#fff",
      pointStrokeColor : "#9DB86D",
      data: [],
    
    }
  ]
}

var lineOption= {

    multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",

    scaleFontSize: 20,

    scaleFontColor:"black",

    tooltipFontSize: 20,

    animation:false,
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 2,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve : true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.3,
    //Boolean - Whether to show a dot for each point
    pointDot : false,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};




//Configurar grafico real

var lineaDataReal = {

  
  labels : ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32"],
  
  datasets : [

    {
      fillColor : "rgba(172,194,132,0.4)",
      strokeColor : "#ACC26D",
      pointColor : "#fff",
      pointStrokeColor : "#9DB86D",
      data: []
    }
  ]
};

var lineOptionReal= {
    animation:false,
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve : true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,
    //Boolean - Whether to show a dot for each point
    pointDot : false,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


//Configrar Gráfico Pie

var Piedata = [

{
        value: 200,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: ""
    },

       {
        value: 300,
        color:"#e5e6e6",
        highlight: "#FF5A5E",
        label: ""
    }
];

var Pieoptions= {

    animation:true,
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve : true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,
    //Boolean - Whether to show a dot for each point
    pointDot : false,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 60, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : false,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};

/*
WebsocketRails JavaScript Client

Setting up the dispatcher:
  var dispatcher = new WebSocketRails('localhost:3000/websocket');
  dispatcher.on_open = function() {
    // trigger a server event immediately after opening connection
    dispatcher.trigger('new_user',{user_name: 'guest'});
  })

Triggering a new event on the server
  dispatcherer.trigger('event_name',object_to_be_serialized_to_json);

Listening for new events from the server
  dispatcher.bind('event_name', function(data) {
    console.log(data.user_name);
  });
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.WebSocketRails = (function() {
    function WebSocketRails(url, use_websockets) {
      this.url = url;
      this.use_websockets = use_websockets != null ? use_websockets : true;
      this.connection_stale = __bind(this.connection_stale, this);
      this.pong = __bind(this.pong, this);
      this.supports_websockets = __bind(this.supports_websockets, this);
      this.dispatch_channel = __bind(this.dispatch_channel, this);
      this.unsubscribe = __bind(this.unsubscribe, this);
      this.subscribe_private = __bind(this.subscribe_private, this);
      this.subscribe = __bind(this.subscribe, this);
      this.dispatch = __bind(this.dispatch, this);
      this.trigger_event = __bind(this.trigger_event, this);
      this.trigger = __bind(this.trigger, this);
      this.bind = __bind(this.bind, this);
      this.connection_established = __bind(this.connection_established, this);
      this.new_message = __bind(this.new_message, this);
      this.reconnect = __bind(this.reconnect, this);
      this.callbacks = {};
      this.channels = {};
      this.queue = {};
      this.connect();
    }

    WebSocketRails.prototype.connect = function() {
      this.state = 'connecting';
      if (!(this.supports_websockets() && this.use_websockets)) {
        this._conn = new WebSocketRails.HttpConnection(this.url, this);
      } else {
        this._conn = new WebSocketRails.WebSocketConnection(this.url, this);
      }
      return this._conn.new_message = this.new_message;
    };

    WebSocketRails.prototype.disconnect = function() {
      if (this._conn) {
        this._conn.close();
        delete this._conn._conn;
        delete this._conn;
      }
      return this.state = 'disconnected';
    };

    WebSocketRails.prototype.reconnect = function() {
      var event, id, old_connection_id, _ref, _ref1;
      old_connection_id = (_ref = this._conn) != null ? _ref.connection_id : void 0;
      this.disconnect();
      this.connect();
      _ref1 = this.queue;
      for (id in _ref1) {
        event = _ref1[id];
        if (event.connection_id === old_connection_id && !event.is_result()) {
          this.trigger_event(event);
        }
      }
      return this.reconnect_channels();
    };

    WebSocketRails.prototype.new_message = function(data) {
      var event, socket_message, _i, _len, _ref, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        socket_message = data[_i];
        event = new WebSocketRails.Event(socket_message);
        if (event.is_result()) {
          if ((_ref = this.queue[event.id]) != null) {
            _ref.run_callbacks(event.success, event.data);
          }
          delete this.queue[event.id];
        } else if (event.is_channel()) {
          this.dispatch_channel(event);
        } else if (event.is_ping()) {
          this.pong();
        } else {
          this.dispatch(event);
        }
        if (this.state === 'connecting' && event.name === 'client_connected') {
          _results.push(this.connection_established(event.data));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    WebSocketRails.prototype.connection_established = function(data) {
      this.state = 'connected';
      this._conn.setConnectionId(data.connection_id);
      this._conn.flush_queue();
      if (this.on_open != null) {
        return this.on_open(data);
      }
    };

    WebSocketRails.prototype.bind = function(event_name, callback) {
      var _base;
      if ((_base = this.callbacks)[event_name] == null) {
        _base[event_name] = [];
      }
      return this.callbacks[event_name].push(callback);
    };

    WebSocketRails.prototype.trigger = function(event_name, data, success_callback, failure_callback) {
      var event, _ref;
      event = new WebSocketRails.Event([event_name, data, (_ref = this._conn) != null ? _ref.connection_id : void 0], success_callback, failure_callback);
      return this.trigger_event(event);
    };

    WebSocketRails.prototype.trigger_event = function(event) {
      var _base, _name;
      if ((_base = this.queue)[_name = event.id] == null) {
        _base[_name] = event;
      }
      if (this._conn) {
        this._conn.trigger(event);
      }
      return event;
    };

    WebSocketRails.prototype.dispatch = function(event) {
      var callback, _i, _len, _ref, _results;
      if (this.callbacks[event.name] == null) {
        return;
      }
      _ref = this.callbacks[event.name];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(event.data));
      }
      return _results;
    };

    WebSocketRails.prototype.subscribe = function(channel_name, success_callback, failure_callback) {
      var channel;
      if (this.channels[channel_name] == null) {
        channel = new WebSocketRails.Channel(channel_name, this, false, success_callback, failure_callback);
        this.channels[channel_name] = channel;
        return channel;
      } else {
        return this.channels[channel_name];
      }
    };

    WebSocketRails.prototype.subscribe_private = function(channel_name, success_callback, failure_callback) {
      var channel;
      if (this.channels[channel_name] == null) {
        channel = new WebSocketRails.Channel(channel_name, this, true, success_callback, failure_callback);
        this.channels[channel_name] = channel;
        return channel;
      } else {
        return this.channels[channel_name];
      }
    };

    WebSocketRails.prototype.unsubscribe = function(channel_name) {
      if (this.channels[channel_name] == null) {
        return;
      }
      this.channels[channel_name].destroy();
      return delete this.channels[channel_name];
    };

    WebSocketRails.prototype.dispatch_channel = function(event) {
      if (this.channels[event.channel] == null) {
        return;
      }
      return this.channels[event.channel].dispatch(event.name, event.data);
    };

    WebSocketRails.prototype.supports_websockets = function() {
      return typeof WebSocket === "function" || typeof WebSocket === "object";
    };

    WebSocketRails.prototype.pong = function() {
      var pong, _ref;
      pong = new WebSocketRails.Event(['websocket_rails.pong', {}, (_ref = this._conn) != null ? _ref.connection_id : void 0]);
      return this._conn.trigger(pong);
    };

    WebSocketRails.prototype.connection_stale = function() {
      return this.state !== 'connected';
    };

    WebSocketRails.prototype.reconnect_channels = function() {
      var callbacks, channel, name, _ref, _results;
      _ref = this.channels;
      _results = [];
      for (name in _ref) {
        channel = _ref[name];
        callbacks = channel._callbacks;
        channel.destroy();
        delete this.channels[name];
        channel = channel.is_private ? this.subscribe_private(name) : this.subscribe(name);
        channel._callbacks = callbacks;
        _results.push(channel);
      }
      return _results;
    };

    return WebSocketRails;

  })();

}).call(this);

/*
The Event object stores all the relevant event information.
 */

(function() {
  WebSocketRails.Event = (function() {
    function Event(data, success_callback, failure_callback) {
      var attr;
      this.success_callback = success_callback;
      this.failure_callback = failure_callback;
      this.name = data[0];
      attr = data[1];
      if (attr != null) {
        this.id = attr['id'] != null ? attr['id'] : ((1 + Math.random()) * 0x10000) | 0;
        this.channel = attr.channel != null ? attr.channel : void 0;
        this.data = attr.data != null ? attr.data : attr;
        this.token = attr.token != null ? attr.token : void 0;
        this.connection_id = data[2];
        if (attr.success != null) {
          this.result = true;
          this.success = attr.success;
        }
      }
    }

    Event.prototype.is_channel = function() {
      return this.channel != null;
    };

    Event.prototype.is_result = function() {
      return typeof this.result !== 'undefined';
    };

    Event.prototype.is_ping = function() {
      return this.name === 'websocket_rails.ping';
    };

    Event.prototype.serialize = function() {
      return JSON.stringify([this.name, this.attributes()]);
    };

    Event.prototype.attributes = function() {
      return {
        id: this.id,
        channel: this.channel,
        data: this.data,
        token: this.token
      };
    };

    Event.prototype.run_callbacks = function(success, result) {
      this.success = success;
      this.result = result;
      if (this.success === true) {
        return typeof this.success_callback === "function" ? this.success_callback(this.result) : void 0;
      } else {
        return typeof this.failure_callback === "function" ? this.failure_callback(this.result) : void 0;
      }
    };

    return Event;

  })();

}).call(this);

/*
 Abstract Interface for the WebSocketRails client.
 */

(function() {
  WebSocketRails.AbstractConnection = (function() {
    function AbstractConnection(url, dispatcher) {
      this.dispatcher = dispatcher;
      this.message_queue = [];
    }

    AbstractConnection.prototype.close = function() {};

    AbstractConnection.prototype.trigger = function(event) {
      if (this.dispatcher.state !== 'connected') {
        return this.message_queue.push(event);
      } else {
        return this.send_event(event);
      }
    };

    AbstractConnection.prototype.send_event = function(event) {
      if (this.connection_id != null) {
        return event.connection_id = this.connection_id;
      }
    };

    AbstractConnection.prototype.on_close = function(event) {
      var close_event;
      if (this.dispatcher && this.dispatcher._conn === this) {
        close_event = new WebSocketRails.Event(['connection_closed', event]);
        this.dispatcher.state = 'disconnected';
        return this.dispatcher.dispatch(close_event);
      }
    };

    AbstractConnection.prototype.on_error = function(event) {
      var error_event;
      if (this.dispatcher && this.dispatcher._conn === this) {
        error_event = new WebSocketRails.Event(['connection_error', event]);
        this.dispatcher.state = 'disconnected';
        return this.dispatcher.dispatch(error_event);
      }
    };

    AbstractConnection.prototype.on_message = function(event_data) {
      if (this.dispatcher && this.dispatcher._conn === this) {
        return this.dispatcher.new_message(event_data);
      }
    };

    AbstractConnection.prototype.setConnectionId = function(connection_id) {
      this.connection_id = connection_id;
    };

    AbstractConnection.prototype.flush_queue = function() {
      var event, _i, _len, _ref;
      _ref = this.message_queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.trigger(event);
      }
      return this.message_queue = [];
    };

    return AbstractConnection;

  })();

}).call(this);

/*
 HTTP Interface for the WebSocketRails client.
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  WebSocketRails.HttpConnection = (function(_super) {
    __extends(HttpConnection, _super);

    HttpConnection.prototype.connection_type = 'http';

    HttpConnection.prototype._httpFactories = function() {
      return [
        function() {
          return new XDomainRequest();
        }, function() {
          return new XMLHttpRequest();
        }, function() {
          return new ActiveXObject("Msxml2.XMLHTTP");
        }, function() {
          return new ActiveXObject("Msxml3.XMLHTTP");
        }, function() {
          return new ActiveXObject("Microsoft.XMLHTTP");
        }
      ];
    };

    function HttpConnection(url, dispatcher) {
      var e;
      this.dispatcher = dispatcher;
      HttpConnection.__super__.constructor.apply(this, arguments);
      this._url = "http://" + url;
      this._conn = this._createXMLHttpObject();
      this.last_pos = 0;
      try {
        this._conn.onreadystatechange = (function(_this) {
          return function() {
            return _this._parse_stream();
          };
        })(this);
        this._conn.addEventListener("load", this.on_close, false);
      } catch (_error) {
        e = _error;
        this._conn.onprogress = (function(_this) {
          return function() {
            return _this._parse_stream();
          };
        })(this);
        this._conn.onload = this.on_close;
        this._conn.readyState = 3;
      }
      this._conn.open("GET", this._url, true);
      this._conn.send();
    }

    HttpConnection.prototype.close = function() {
      return this._conn.abort();
    };

    HttpConnection.prototype.send_event = function(event) {
      HttpConnection.__super__.send_event.apply(this, arguments);
      return this._post_data(event.serialize());
    };

    HttpConnection.prototype._post_data = function(payload) {
      return $.ajax(this._url, {
        type: 'POST',
        data: {
          client_id: this.connection_id,
          data: payload
        },
        success: function() {}
      });
    };

    HttpConnection.prototype._createXMLHttpObject = function() {
      var e, factories, factory, xmlhttp, _i, _len;
      xmlhttp = false;
      factories = this._httpFactories();
      for (_i = 0, _len = factories.length; _i < _len; _i++) {
        factory = factories[_i];
        try {
          xmlhttp = factory();
        } catch (_error) {
          e = _error;
          continue;
        }
        break;
      }
      return xmlhttp;
    };

    HttpConnection.prototype._parse_stream = function() {
      var data, e, event_data;
      if (this._conn.readyState === 3) {
        data = this._conn.responseText.substring(this.last_pos);
        this.last_pos = this._conn.responseText.length;
        data = data.replace(/\]\]\[\[/g, "],[");
        try {
          event_data = JSON.parse(data);
          return this.on_message(event_data);
        } catch (_error) {
          e = _error;
        }
      }
    };

    return HttpConnection;

  })(WebSocketRails.AbstractConnection);

}).call(this);

/*
WebSocket Interface for the WebSocketRails client.
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  WebSocketRails.WebSocketConnection = (function(_super) {
    __extends(WebSocketConnection, _super);

    WebSocketConnection.prototype.connection_type = 'websocket';

    function WebSocketConnection(url, dispatcher) {
      this.url = url;
      this.dispatcher = dispatcher;
      WebSocketConnection.__super__.constructor.apply(this, arguments);
      if (this.url.match(/^wss?:\/\//)) {
        console.log("WARNING: Using connection urls with protocol specified is depricated");
      } else if (window.location.protocol === 'https:') {
        this.url = "wss://" + this.url;
      } else {
        this.url = "ws://" + this.url;
      }
      this._conn = new WebSocket(this.url);
      this._conn.onmessage = (function(_this) {
        return function(event) {
          var event_data;
          event_data = JSON.parse(event.data);
          return _this.on_message(event_data);
        };
      })(this);
      this._conn.onclose = (function(_this) {
        return function(event) {
          return _this.on_close(event);
        };
      })(this);
      this._conn.onerror = (function(_this) {
        return function(event) {
          return _this.on_error(event);
        };
      })(this);
    }

    WebSocketConnection.prototype.close = function() {
      return this._conn.close();
    };

    WebSocketConnection.prototype.send_event = function(event) {
      WebSocketConnection.__super__.send_event.apply(this, arguments);
      return this._conn.send(event.serialize());
    };

    return WebSocketConnection;

  })(WebSocketRails.AbstractConnection);

}).call(this);

/*
The channel object is returned when you subscribe to a channel.

For instance:
  var dispatcher = new WebSocketRails('localhost:3000/websocket');
  var awesome_channel = dispatcher.subscribe('awesome_channel');
  awesome_channel.bind('event', function(data) { console.log('channel event!'); });
  awesome_channel.trigger('awesome_event', awesome_object);
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WebSocketRails.Channel = (function() {
    function Channel(name, _dispatcher, is_private, on_success, on_failure) {
      var event, event_name, _ref;
      this.name = name;
      this._dispatcher = _dispatcher;
      this.is_private = is_private != null ? is_private : false;
      this.on_success = on_success;
      this.on_failure = on_failure;
      this._failure_launcher = __bind(this._failure_launcher, this);
      this._success_launcher = __bind(this._success_launcher, this);
      this._callbacks = {};
      this._token = void 0;
      this._queue = [];
      if (this.is_private) {
        event_name = 'websocket_rails.subscribe_private';
      } else {
        event_name = 'websocket_rails.subscribe';
      }
      this.connection_id = (_ref = this._dispatcher._conn) != null ? _ref.connection_id : void 0;
      event = new WebSocketRails.Event([
        event_name, {
          data: {
            channel: this.name
          }
        }, this.connection_id
      ], this._success_launcher, this._failure_launcher);
      this._dispatcher.trigger_event(event);
    }

    Channel.prototype.destroy = function() {
      var event, event_name, _ref;
      if (this.connection_id === ((_ref = this._dispatcher._conn) != null ? _ref.connection_id : void 0)) {
        event_name = 'websocket_rails.unsubscribe';
        event = new WebSocketRails.Event([
          event_name, {
            data: {
              channel: this.name
            }
          }, this.connection_id
        ]);
        this._dispatcher.trigger_event(event);
      }
      return this._callbacks = {};
    };

    Channel.prototype.bind = function(event_name, callback) {
      var _base;
      if ((_base = this._callbacks)[event_name] == null) {
        _base[event_name] = [];
      }
      return this._callbacks[event_name].push(callback);
    };

    Channel.prototype.trigger = function(event_name, message) {
      var event;
      event = new WebSocketRails.Event([
        event_name, {
          channel: this.name,
          data: message,
          token: this._token
        }, this.connection_id
      ]);
      if (!this._token) {
        return this._queue.push(event);
      } else {
        return this._dispatcher.trigger_event(event);
      }
    };

    Channel.prototype.dispatch = function(event_name, message) {
      var callback, _i, _len, _ref, _ref1, _results;
      if (event_name === 'websocket_rails.channel_token') {
        this.connection_id = (_ref = this._dispatcher._conn) != null ? _ref.connection_id : void 0;
        this._token = message['token'];
        return this.flush_queue();
      } else {
        if (this._callbacks[event_name] == null) {
          return;
        }
        _ref1 = this._callbacks[event_name];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          callback = _ref1[_i];
          _results.push(callback(message));
        }
        return _results;
      }
    };

    Channel.prototype._success_launcher = function(data) {
      if (this.on_success != null) {
        return this.on_success(data);
      }
    };

    Channel.prototype._failure_launcher = function(data) {
      if (this.on_failure != null) {
        return this.on_failure(data);
      }
    };

    Channel.prototype.flush_queue = function() {
      var event, _i, _len, _ref;
      _ref = this._queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this._dispatcher.trigger_event(event);
      }
      return this._queue = [];
    };

    return Channel;

  })();

}).call(this);






/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.14.3 - 2015-10-23
 * License: MIT
 */

angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.tpls",["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-popup.html","template/tooltip/tooltip-popup.html","template/tooltip/tooltip-template-popup.html","template/popover/popover-html.html","template/popover/popover-template.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.collapse",[]).directive("uibCollapse",["$animate","$injector",function(a,b){var c=b.has("$animateCss")?b.get("$animateCss"):null;return{link:function(b,d,e){function f(){d.removeClass("collapse").addClass("collapsing").attr("aria-expanded",!0).attr("aria-hidden",!1),c?c(d,{addClass:"in",easing:"ease",to:{height:d[0].scrollHeight+"px"}}).start()["finally"](g):a.addClass(d,"in",{to:{height:d[0].scrollHeight+"px"}}).then(g)}function g(){d.removeClass("collapsing").addClass("collapse").css({height:"auto"})}function h(){return d.hasClass("collapse")||d.hasClass("in")?(d.css({height:d[0].scrollHeight+"px"}).removeClass("collapse").addClass("collapsing").attr("aria-expanded",!1).attr("aria-hidden",!0),void(c?c(d,{removeClass:"in",to:{height:"0"}}).start()["finally"](i):a.removeClass(d,"in",{to:{height:"0"}}).then(i))):i()}function i(){d.css({height:"0"}),d.removeClass("collapsing").addClass("collapse")}b.$watch(e.uibCollapse,function(a){a?h():f()})}}}]),angular.module("ui.bootstrap.collapse").value("$collapseSuppressWarning",!1).directive("collapse",["$animate","$injector","$log","$collapseSuppressWarning",function(a,b,c,d){var e=b.has("$animateCss")?b.get("$animateCss"):null;return{link:function(b,f,g){function h(){f.removeClass("collapse").addClass("collapsing").attr("aria-expanded",!0).attr("aria-hidden",!1),e?e(f,{easing:"ease",to:{height:f[0].scrollHeight+"px"}}).start().done(i):a.animate(f,{},{height:f[0].scrollHeight+"px"}).then(i)}function i(){f.removeClass("collapsing").addClass("collapse in").css({height:"auto"})}function j(){return f.hasClass("collapse")||f.hasClass("in")?(f.css({height:f[0].scrollHeight+"px"}).removeClass("collapse in").addClass("collapsing").attr("aria-expanded",!1).attr("aria-hidden",!0),void(e?e(f,{to:{height:"0"}}).start().done(k):a.animate(f,{},{height:"0"}).then(k))):k()}function k(){f.css({height:"0"}),f.removeClass("collapsing").addClass("collapse")}d||c.warn("collapse is now deprecated. Use uib-collapse instead."),b.$watch(g.collapse,function(a){a?j():h()})}}}]),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("uibAccordionConfig",{closeOthers:!0}).controller("UibAccordionController",["$scope","$attrs","uibAccordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(c){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("uibAccordion",function(){return{controller:"UibAccordionController",controllerAs:"accordion",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/accordion/accordion.html"}}}).directive("uibAccordionGroup",function(){return{require:"^uibAccordion",transclude:!0,replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/accordion/accordion-group.html"},scope:{heading:"@",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){d.addGroup(a),a.openClass=c.openClass||"panel-open",a.panelClass=c.panelClass,a.$watch("isOpen",function(c){b.toggleClass(a.openClass,!!c),c&&d.closeOthers(a)}),a.toggleOpen=function(b){a.isDisabled||b&&32!==b.which||(a.isOpen=!a.isOpen)}}}}).directive("uibAccordionHeading",function(){return{transclude:!0,template:"",replace:!0,require:"^uibAccordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,angular.noop))}}}).directive("uibAccordionTransclude",function(){return{require:["?^uibAccordionGroup","?^accordionGroup"],link:function(a,b,c,d){d=d[0]?d[0]:d[1],a.$watch(function(){return d[c.uibAccordionTransclude]},function(a){a&&(b.find("span").html(""),b.find("span").append(a))})}}}),angular.module("ui.bootstrap.accordion").value("$accordionSuppressWarning",!1).controller("AccordionController",["$scope","$attrs","$controller","$log","$accordionSuppressWarning",function(a,b,c,d,e){e||d.warn("AccordionController is now deprecated. Use UibAccordionController instead."),angular.extend(this,c("UibAccordionController",{$scope:a,$attrs:b}))}]).directive("accordion",["$log","$accordionSuppressWarning",function(a,b){return{restrict:"EA",controller:"AccordionController",controllerAs:"accordion",transclude:!0,replace:!1,templateUrl:function(a,b){return b.templateUrl||"template/accordion/accordion.html"},link:function(){b||a.warn("accordion is now deprecated. Use uib-accordion instead.")}}}]).directive("accordionGroup",["$log","$accordionSuppressWarning",function(a,b){return{require:"^accordion",restrict:"EA",transclude:!0,replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/accordion/accordion-group.html"},scope:{heading:"@",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(c,d,e,f){b||a.warn("accordion-group is now deprecated. Use uib-accordion-group instead."),f.addGroup(c),c.openClass=e.openClass||"panel-open",c.panelClass=e.panelClass,c.$watch("isOpen",function(a){d.toggleClass(c.openClass,!!a),a&&f.closeOthers(c)}),c.toggleOpen=function(a){c.isDisabled||a&&32!==a.which||(c.isOpen=!c.isOpen)}}}}]).directive("accordionHeading",["$log","$accordionSuppressWarning",function(a,b){return{restrict:"EA",transclude:!0,template:"",replace:!0,require:"^accordionGroup",link:function(c,d,e,f,g){b||a.warn("accordion-heading is now deprecated. Use uib-accordion-heading instead."),f.setHeading(g(c,angular.noop))}}}]).directive("accordionTransclude",["$log","$accordionSuppressWarning",function(a,b){return{require:"^accordionGroup",link:function(c,d,e,f){b||a.warn("accordion-transclude is now deprecated. Use uib-accordion-transclude instead."),c.$watch(function(){return f[e.accordionTransclude]},function(a){a&&(d.find("span").html(""),d.find("span").append(a))})}}}]),angular.module("ui.bootstrap.alert",[]).controller("UibAlertController",["$scope","$attrs","$interpolate","$timeout",function(a,b,c,d){a.closeable=!!b.close;var e=angular.isDefined(b.dismissOnTimeout)?c(b.dismissOnTimeout)(a.$parent):null;e&&d(function(){a.close()},parseInt(e,10))}]).directive("uibAlert",function(){return{controller:"UibAlertController",controllerAs:"alert",templateUrl:function(a,b){return b.templateUrl||"template/alert/alert.html"},transclude:!0,replace:!0,scope:{type:"@",close:"&"}}}),angular.module("ui.bootstrap.alert").value("$alertSuppressWarning",!1).controller("AlertController",["$scope","$attrs","$controller","$log","$alertSuppressWarning",function(a,b,c,d,e){e||d.warn("AlertController is now deprecated. Use UibAlertController instead."),angular.extend(this,c("UibAlertController",{$scope:a,$attrs:b}))}]).directive("alert",["$log","$alertSuppressWarning",function(a,b){return{controller:"AlertController",controllerAs:"alert",templateUrl:function(a,b){return b.templateUrl||"template/alert/alert.html"},transclude:!0,replace:!0,scope:{type:"@",close:"&"},link:function(){b||a.warn("alert is now deprecated. Use uib-alert instead.")}}}]),angular.module("ui.bootstrap.buttons",[]).constant("uibButtonConfig",{activeClass:"active",toggleEvent:"click"}).controller("UibButtonsController",["uibButtonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("uibBtnRadio",function(){return{require:["uibBtnRadio","ngModel"],controller:"UibButtonsController",controllerAs:"buttons",link:function(a,b,c,d){var e=d[0],f=d[1];b.find("input").css({display:"none"}),f.$render=function(){b.toggleClass(e.activeClass,angular.equals(f.$modelValue,a.$eval(c.uibBtnRadio)))},b.on(e.toggleEvent,function(){if(!c.disabled){var d=b.hasClass(e.activeClass);(!d||angular.isDefined(c.uncheckable))&&a.$apply(function(){f.$setViewValue(d?null:a.$eval(c.uibBtnRadio)),f.$render()})}})}}}).directive("uibBtnCheckbox",function(){return{require:["uibBtnCheckbox","ngModel"],controller:"UibButtonsController",controllerAs:"button",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){return angular.isDefined(b)?a.$eval(b):c}var h=d[0],i=d[1];b.find("input").css({display:"none"}),i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},b.on(h.toggleEvent,function(){c.disabled||a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),angular.module("ui.bootstrap.buttons").value("$buttonsSuppressWarning",!1).controller("ButtonsController",["$controller","$log","$buttonsSuppressWarning",function(a,b,c){c||b.warn("ButtonsController is now deprecated. Use UibButtonsController instead."),angular.extend(this,a("UibButtonsController"))}]).directive("btnRadio",["$log","$buttonsSuppressWarning",function(a,b){return{require:["btnRadio","ngModel"],controller:"ButtonsController",controllerAs:"buttons",link:function(c,d,e,f){b||a.warn("btn-radio is now deprecated. Use uib-btn-radio instead.");var g=f[0],h=f[1];d.find("input").css({display:"none"}),h.$render=function(){d.toggleClass(g.activeClass,angular.equals(h.$modelValue,c.$eval(e.btnRadio)))},d.bind(g.toggleEvent,function(){if(!e.disabled){var a=d.hasClass(g.activeClass);(!a||angular.isDefined(e.uncheckable))&&c.$apply(function(){h.$setViewValue(a?null:c.$eval(e.btnRadio)),h.$render()})}})}}}]).directive("btnCheckbox",["$document","$log","$buttonsSuppressWarning",function(a,b,c){return{require:["btnCheckbox","ngModel"],controller:"ButtonsController",controllerAs:"button",link:function(d,e,f,g){function h(){return j(f.btnCheckboxTrue,!0)}function i(){return j(f.btnCheckboxFalse,!1)}function j(a,b){var c=d.$eval(a);return angular.isDefined(c)?c:b}c||b.warn("btn-checkbox is now deprecated. Use uib-btn-checkbox instead.");var k=g[0],l=g[1];e.find("input").css({display:"none"}),l.$render=function(){e.toggleClass(k.activeClass,angular.equals(l.$modelValue,h()))},e.bind(k.toggleEvent,function(){f.disabled||d.$apply(function(){l.$setViewValue(e.hasClass(k.activeClass)?i():h()),l.$render()})}),e.on("keypress",function(b){f.disabled||32!==b.which||a[0].activeElement!==e[0]||d.$apply(function(){l.$setViewValue(e.hasClass(k.activeClass)?i():h()),l.$render()})})}}}]),angular.module("ui.bootstrap.carousel",[]).controller("UibCarouselController",["$scope","$element","$interval","$animate",function(a,b,c,d){function e(b,c,e){s||(angular.extend(b,{direction:e,active:!0}),angular.extend(m.currentSlide||{},{direction:e,active:!1}),d.enabled()&&!a.noTransition&&!a.$currentTransition&&b.$element&&m.slides.length>1&&(b.$element.data(q,b.direction),m.currentSlide&&m.currentSlide.$element&&m.currentSlide.$element.data(q,b.direction),a.$currentTransition=!0,o?d.on("addClass",b.$element,function(b,c){"close"===c&&(a.$currentTransition=null,d.off("addClass",b))}):b.$element.one("$animate:close",function(){a.$currentTransition=null})),m.currentSlide=b,r=c,g())}function f(a){if(angular.isUndefined(n[a].index))return n[a];var b;n.length;for(b=0;b<n.length;++b)if(n[b].index==a)return n[b]}function g(){h();var b=+a.interval;!isNaN(b)&&b>0&&(k=c(i,b))}function h(){k&&(c.cancel(k),k=null)}function i(){var b=+a.interval;l&&!isNaN(b)&&b>0&&n.length?a.next():a.pause()}function j(b){b.length||(a.$currentTransition=null)}var k,l,m=this,n=m.slides=a.slides=[],o=angular.version.minor>=4,p="uib-noTransition",q="uib-slideDirection",r=-1;m.currentSlide=null;var s=!1;m.select=a.select=function(b,c){var d=a.indexOfSlide(b);void 0===c&&(c=d>m.getCurrentIndex()?"next":"prev"),b&&b!==m.currentSlide&&!a.$currentTransition&&e(b,d,c)},a.$on("$destroy",function(){s=!0}),m.getCurrentIndex=function(){return m.currentSlide&&angular.isDefined(m.currentSlide.index)?+m.currentSlide.index:r},a.indexOfSlide=function(a){return angular.isDefined(a.index)?+a.index:n.indexOf(a)},a.next=function(){var b=(m.getCurrentIndex()+1)%n.length;return 0===b&&a.noWrap()?void a.pause():m.select(f(b),"next")},a.prev=function(){var b=m.getCurrentIndex()-1<0?n.length-1:m.getCurrentIndex()-1;return a.noWrap()&&b===n.length-1?void a.pause():m.select(f(b),"prev")},a.isActive=function(a){return m.currentSlide===a},a.$watch("interval",g),a.$watchCollection("slides",j),a.$on("$destroy",h),a.play=function(){l||(l=!0,g())},a.pause=function(){a.noPause||(l=!1,h())},m.addSlide=function(b,c){b.$element=c,n.push(b),1===n.length||b.active?(m.select(n[n.length-1]),1===n.length&&a.play()):b.active=!1},m.removeSlide=function(a){angular.isDefined(a.index)&&n.sort(function(a,b){return+a.index>+b.index});var b=n.indexOf(a);n.splice(b,1),n.length>0&&a.active?b>=n.length?m.select(n[b-1]):m.select(n[b]):r>b&&r--,0===n.length&&(m.currentSlide=null)},a.$watch("noTransition",function(a){b.data(p,a)})}]).directive("uibCarousel",[function(){return{transclude:!0,replace:!0,controller:"UibCarouselController",controllerAs:"carousel",require:"carousel",templateUrl:function(a,b){return b.templateUrl||"template/carousel/carousel.html"},scope:{interval:"=",noTransition:"=",noPause:"=",noWrap:"&"}}}]).directive("uibSlide",function(){return{require:"^uibCarousel",restrict:"EA",transclude:!0,replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/carousel/slide.html"},scope:{active:"=?",actual:"=?",index:"=?"},link:function(a,b,c,d){d.addSlide(a,b),a.$on("$destroy",function(){d.removeSlide(a)}),a.$watch("active",function(b){b&&d.select(a)})}}}).animation(".item",["$injector","$animate",function(a,b){function c(a,b,c){a.removeClass(b),c&&c()}var d="uib-noTransition",e="uib-slideDirection",f=null;return a.has("$animateCss")&&(f=a.get("$animateCss")),{beforeAddClass:function(a,g,h){if("active"==g&&a.parent()&&a.parent().parent()&&!a.parent().parent().data(d)){var i=!1,j=a.data(e),k="next"==j?"left":"right",l=c.bind(this,a,k+" "+j,h);return a.addClass(j),f?f(a,{addClass:k}).start().done(l):b.addClass(a,k).then(function(){i||l(),h()}),function(){i=!0}}h()},beforeRemoveClass:function(a,g,h){if("active"===g&&a.parent()&&a.parent().parent()&&!a.parent().parent().data(d)){var i=!1,j=a.data(e),k="next"==j?"left":"right",l=c.bind(this,a,k,h);return f?f(a,{addClass:k}).start().done(l):b.addClass(a,k).then(function(){i||l(),h()}),function(){i=!0}}h()}}}]),angular.module("ui.bootstrap.carousel").value("$carouselSuppressWarning",!1).controller("CarouselController",["$scope","$element","$controller","$log","$carouselSuppressWarning",function(a,b,c,d,e){e||d.warn("CarouselController is now deprecated. Use UibCarouselController instead."),angular.extend(this,c("UibCarouselController",{$scope:a,$element:b}))}]).directive("carousel",["$log","$carouselSuppressWarning",function(a,b){return{transclude:!0,replace:!0,controller:"CarouselController",controllerAs:"carousel",require:"carousel",templateUrl:function(a,b){return b.templateUrl||"template/carousel/carousel.html"},scope:{interval:"=",noTransition:"=",noPause:"=",noWrap:"&"},link:function(){b||a.warn("carousel is now deprecated. Use uib-carousel instead.")}}}]).directive("slide",["$log","$carouselSuppressWarning",function(a,b){return{require:"^carousel",transclude:!0,replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/carousel/slide.html"},scope:{active:"=?",actual:"=?",index:"=?"},link:function(c,d,e,f){b||a.warn("slide is now deprecated. Use uib-slide instead."),f.addSlide(c,d),c.$on("$destroy",function(){f.removeSlide(c)}),c.$watch("active",function(a){a&&f.select(c)})}}}]),angular.module("ui.bootstrap.dateparser",[]).service("uibDateParser",["$log","$locale","orderByFilter",function(a,b,c){function d(a){var b=[],d=a.split("");return angular.forEach(g,function(c,e){var f=a.indexOf(e);if(f>-1){a=a.split(""),d[f]="("+c.regex+")",a[f]="$";for(var g=f+1,h=f+e.length;h>g;g++)d[g]="",a[g]="$";a=a.join(""),b.push({index:f,apply:c.apply})}}),{regex:new RegExp("^"+d.join("")+"$"),map:c(b,"index")}}function e(a,b,c){return 1>c?!1:1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}var f,g,h=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;this.init=function(){f=b.id,this.parsers={},g={yyyy:{regex:"\\d{4}",apply:function(a){this.year=+a}},yy:{regex:"\\d{2}",apply:function(a){this.year=+a+2e3}},y:{regex:"\\d{1,4}",apply:function(a){this.year=+a}},MMMM:{regex:b.DATETIME_FORMATS.MONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.MONTH.indexOf(a)}},MMM:{regex:b.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.SHORTMONTH.indexOf(a)}},MM:{regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1}},M:{regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1}},dd:{regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},d:{regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},EEEE:{regex:b.DATETIME_FORMATS.DAY.join("|")},EEE:{regex:b.DATETIME_FORMATS.SHORTDAY.join("|")},HH:{regex:"(?:0|1)[0-9]|2[0-3]",apply:function(a){this.hours=+a}},hh:{regex:"0[0-9]|1[0-2]",apply:function(a){this.hours=+a}},H:{regex:"1?[0-9]|2[0-3]",apply:function(a){this.hours=+a}},h:{regex:"[0-9]|1[0-2]",apply:function(a){this.hours=+a}},mm:{regex:"[0-5][0-9]",apply:function(a){this.minutes=+a}},m:{regex:"[0-9]|[1-5][0-9]",apply:function(a){this.minutes=+a}},sss:{regex:"[0-9][0-9][0-9]",apply:function(a){this.milliseconds=+a}},ss:{regex:"[0-5][0-9]",apply:function(a){this.seconds=+a}},s:{regex:"[0-9]|[1-5][0-9]",apply:function(a){this.seconds=+a}},a:{regex:b.DATETIME_FORMATS.AMPMS.join("|"),apply:function(a){12===this.hours&&(this.hours=0),"PM"===a&&(this.hours+=12)}}}},this.init(),this.parse=function(c,g,i){if(!angular.isString(c)||!g)return c;g=b.DATETIME_FORMATS[g]||g,g=g.replace(h,"\\$&"),b.id!==f&&this.init(),this.parsers[g]||(this.parsers[g]=d(g));var j=this.parsers[g],k=j.regex,l=j.map,m=c.match(k);if(m&&m.length){var n,o;angular.isDate(i)&&!isNaN(i.getTime())?n={year:i.getFullYear(),month:i.getMonth(),date:i.getDate(),hours:i.getHours(),minutes:i.getMinutes(),seconds:i.getSeconds(),milliseconds:i.getMilliseconds()}:(i&&a.warn("dateparser:","baseDate is not a valid date"),n={year:1900,month:0,date:1,hours:0,minutes:0,seconds:0,milliseconds:0});for(var p=1,q=m.length;q>p;p++){var r=l[p-1];r.apply&&r.apply.call(n,m[p])}return e(n.year,n.month,n.date)&&(angular.isDate(i)&&!isNaN(i.getTime())?(o=new Date(i),o.setFullYear(n.year,n.month,n.date,n.hours,n.minutes,n.seconds,n.milliseconds||0)):o=new Date(n.year,n.month,n.date,n.hours,n.minutes,n.seconds,n.milliseconds||0)),o}}}]),angular.module("ui.bootstrap.dateparser").value("$dateParserSuppressWarning",!1).service("dateParser",["$log","$dateParserSuppressWarning","uibDateParser",function(a,b,c){b||a.warn("dateParser is now deprecated. Use uibDateParser instead."),angular.extend(this,c)}]),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(a,b){function c(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}function d(a){return"static"===(c(a,"position")||"static")}var e=function(b){for(var c=a[0],e=b.offsetParent||c;e&&e!==c&&d(e);)e=e.offsetParent;return e||c};return{position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);f!=a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft);var g=b[0].getBoundingClientRect();return{width:g.width||b.prop("offsetWidth"),height:g.height||b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},offset:function(c){var d=c[0].getBoundingClientRect();return{width:d.width||c.prop("offsetWidth"),height:d.height||c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].documentElement.scrollLeft)}},positionElements:function(a,b,c,d){var e,f,g,h,i=c.split("-"),j=i[0],k=i[1]||"center";e=d?this.offset(a):this.position(a),f=b.prop("offsetWidth"),g=b.prop("offsetHeight");var l={center:function(){return e.left+e.width/2-f/2},left:function(){return e.left},right:function(){return e.left+e.width}},m={center:function(){return e.top+e.height/2-g/2},top:function(){return e.top},bottom:function(){return e.top+e.height}};switch(j){case"right":h={top:m[k](),left:l[j]()};break;case"left":h={top:m[k](),left:e.left-f};break;case"bottom":h={top:m[j](),left:l[k]()};break;default:h={top:e.top-g,left:l[k]()}}return h}}}]),angular.module("ui.bootstrap.position").value("$positionSuppressWarning",!1).service("$position",["$log","$positionSuppressWarning","$uibPosition",function(a,b,c){b||a.warn("$position is now deprecated. Use $uibPosition instead."),angular.extend(this,c)}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.position"]).value("$datepickerSuppressError",!1).constant("uibDatepickerConfig",{formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",datepickerMode:"day",minMode:"day",maxMode:"year",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null,shortcutPropagation:!1}).controller("UibDatepickerController",["$scope","$attrs","$parse","$interpolate","$log","dateFilter","uibDatepickerConfig","$datepickerSuppressError",function(a,b,c,d,e,f,g,h){var i=this,j={$setViewValue:angular.noop};this.modes=["day","month","year"],angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","showWeeks","startingDay","yearRange","shortcutPropagation"],function(c,e){i[c]=angular.isDefined(b[c])?6>e?d(b[c])(a.$parent):a.$parent.$eval(b[c]):g[c]}),angular.forEach(["minDate","maxDate"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(a){i[d]=a?new Date(a):null,i.refreshView()}):i[d]=g[d]?new Date(g[d]):null}),angular.forEach(["minMode","maxMode"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(c){i[d]=angular.isDefined(c)?c:b[d],a[d]=i[d],("minMode"==d&&i.modes.indexOf(a.datepickerMode)<i.modes.indexOf(i[d])||"maxMode"==d&&i.modes.indexOf(a.datepickerMode)>i.modes.indexOf(i[d]))&&(a.datepickerMode=i[d])}):(i[d]=g[d]||null,a[d]=i[d])}),a.datepickerMode=a.datepickerMode||g.datepickerMode,a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),angular.isDefined(b.initDate)?(this.activeDate=a.$parent.$eval(b.initDate)||new Date,a.$parent.$watch(b.initDate,function(a){a&&(j.$isEmpty(j.$modelValue)||j.$invalid)&&(i.activeDate=a,i.refreshView())})):this.activeDate=new Date,a.isActive=function(b){return 0===i.compare(b.date,i.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(a){j=a,j.$render=function(){i.render()}},this.render=function(){if(j.$viewValue){var a=new Date(j.$viewValue),b=!isNaN(a);b?this.activeDate=a:h||e.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var a=j.$viewValue?new Date(j.$viewValue):null;j.$setValidity("dateDisabled",!a||this.element&&!this.isDisabled(a))}},this.createDateObject=function(a,b){var c=j.$viewValue?new Date(j.$viewValue):null;return{date:a,label:f(a,b),selected:c&&0===this.compare(a,c),disabled:this.isDisabled(a),current:0===this.compare(a,new Date),customClass:this.customClass(a)}},this.isDisabled=function(c){return this.minDate&&this.compare(c,this.minDate)<0||this.maxDate&&this.compare(c,this.maxDate)>0||b.dateDisabled&&a.dateDisabled({date:c,mode:a.datepickerMode})},this.customClass=function(b){return a.customClass({date:b,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===i.minMode){var c=j.$viewValue?new Date(j.$viewValue):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),j.$setViewValue(c),j.$render()}else i.activeDate=b,a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)-1]},a.move=function(a){var b=i.activeDate.getFullYear()+a*(i.step.years||0),c=i.activeDate.getMonth()+a*(i.step.months||0);i.activeDate.setFullYear(b,c,1),i.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===i.maxMode&&1===b||a.datepickerMode===i.minMode&&-1===b||(a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)+b])},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var k=function(){i.element[0].focus()};a.$on("uib:datepicker.focus",k),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey)if(b.preventDefault(),i.shortcutPropagation||b.stopPropagation(),"enter"===c||"space"===c){if(i.isDisabled(i.activeDate))return;a.select(i.activeDate)}else!b.ctrlKey||"up"!==c&&"down"!==c?(i.handleKeyDown(c,b),i.refreshView()):a.toggleMode("up"===c?1:-1)}}]).controller("UibDaypickerController",["$scope","$element","dateFilter",function(a,b,c){function d(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?f[b]:29}function e(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}var f=[31,28,31,30,31,30,31,31,30,31,30,31];this.step={months:1},this.element=b,this.init=function(b){angular.extend(b,this),a.showWeeks=b.showWeeks,b.refreshView()},this.getDates=function(a,b){for(var c,d=new Array(b),e=new Date(a),f=0;b>f;)c=new Date(e),d[f++]=c,e.setDate(e.getDate()+1);return d},this._refreshView=function(){var b=this.activeDate.getFullYear(),d=this.activeDate.getMonth(),f=new Date(this.activeDate);f.setFullYear(b,d,1);var g=this.startingDay-f.getDay(),h=g>0?7-g:-g,i=new Date(f);h>0&&i.setDate(-h+1);for(var j=this.getDates(i,42),k=0;42>k;k++)j[k]=angular.extend(this.createDateObject(j[k],this.formatDay),{secondary:j[k].getMonth()!==d,uid:a.uniqueId+"-"+k});a.labels=new Array(7);for(var l=0;7>l;l++)a.labels[l]={abbr:c(j[l].date,this.formatDayHeader),full:c(j[l].date,"EEEE")};if(a.title=c(this.activeDate,this.formatDayTitle),a.rows=this.split(j,7),a.showWeeks){a.weekNumbers=[];for(var m=(11-this.startingDay)%7,n=a.rows.length,o=0;n>o;o++)a.weekNumbers.push(e(a.rows[o][m].date))}},this.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},this.handleKeyDown=function(a,b){var c=this.activeDate.getDate();if("left"===a)c-=1;else if("up"===a)c-=7;else if("right"===a)c+=1;else if("down"===a)c+=7;else if("pageup"===a||"pagedown"===a){var e=this.activeDate.getMonth()+("pageup"===a?-1:1);this.activeDate.setMonth(e,1),c=Math.min(d(this.activeDate.getFullYear(),this.activeDate.getMonth()),c)}else"home"===a?c=1:"end"===a&&(c=d(this.activeDate.getFullYear(),this.activeDate.getMonth()));this.activeDate.setDate(c)}}]).controller("UibMonthpickerController",["$scope","$element","dateFilter",function(a,b,c){this.step={years:1},this.element=b,this.init=function(a){angular.extend(a,this),a.refreshView()},this._refreshView=function(){for(var b,d=new Array(12),e=this.activeDate.getFullYear(),f=0;12>f;f++)b=new Date(this.activeDate),b.setFullYear(e,f,1),d[f]=angular.extend(this.createDateObject(b,this.formatMonth),{uid:a.uniqueId+"-"+f});a.title=c(this.activeDate,this.formatMonthTitle),a.rows=this.split(d,3)},this.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth())-new Date(b.getFullYear(),b.getMonth())},this.handleKeyDown=function(a,b){var c=this.activeDate.getMonth();if("left"===a)c-=1;else if("up"===a)c-=3;else if("right"===a)c+=1;else if("down"===a)c+=3;else if("pageup"===a||"pagedown"===a){var d=this.activeDate.getFullYear()+("pageup"===a?-1:1);this.activeDate.setFullYear(d)}else"home"===a?c=0:"end"===a&&(c=11);this.activeDate.setMonth(c)}}]).controller("UibYearpickerController",["$scope","$element","dateFilter",function(a,b,c){function d(a){return parseInt((a-1)/e,10)*e+1}var e;this.element=b,this.yearpickerInit=function(){e=this.yearRange,this.step={years:e}},this._refreshView=function(){for(var b,c=new Array(e),f=0,g=d(this.activeDate.getFullYear());e>f;f++)b=new Date(this.activeDate),b.setFullYear(g+f,0,1),c[f]=angular.extend(this.createDateObject(b,this.formatYear),{uid:a.uniqueId+"-"+f});a.title=[c[0].label,c[e-1].label].join(" - "),a.rows=this.split(c,5)},this.compare=function(a,b){return a.getFullYear()-b.getFullYear()},this.handleKeyDown=function(a,b){var c=this.activeDate.getFullYear();"left"===a?c-=1:"up"===a?c-=5:"right"===a?c+=1:"down"===a?c+=5:"pageup"===a||"pagedown"===a?c+=("pageup"===a?-1:1)*this.step.years:"home"===a?c=d(this.activeDate.getFullYear()):"end"===a&&(c=d(this.activeDate.getFullYear())+e-1),this.activeDate.setFullYear(c)}}]).directive("uibDatepicker",function(){return{replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/datepicker.html"},scope:{datepickerMode:"=?",dateDisabled:"&",customClass:"&",shortcutPropagation:"&?"},require:["uibDatepicker","^ngModel"],controller:"UibDatepickerController",controllerAs:"datepicker",link:function(a,b,c,d){var e=d[0],f=d[1];e.init(f)}}}).directive("uibDaypicker",function(){return{replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/day.html"},require:["^?uibDatepicker","uibDaypicker","^?datepicker"],controller:"UibDaypickerController",link:function(a,b,c,d){var e=d[0]||d[2],f=d[1];f.init(e)}}}).directive("uibMonthpicker",function(){return{replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/month.html"},require:["^?uibDatepicker","uibMonthpicker","^?datepicker"],controller:"UibMonthpickerController",link:function(a,b,c,d){var e=d[0]||d[2],f=d[1];f.init(e)}}}).directive("uibYearpicker",function(){return{replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/year.html"},require:["^?uibDatepicker","uibYearpicker","^?datepicker"],controller:"UibYearpickerController",link:function(a,b,c,d){var e=d[0]||d[2];angular.extend(e,d[1]),e.yearpickerInit(),e.refreshView()}}}).constant("uibDatepickerPopupConfig",{datepickerPopup:"yyyy-MM-dd",datepickerPopupTemplateUrl:"template/datepicker/popup.html",datepickerTemplateUrl:"template/datepicker/datepicker.html",html5Types:{date:"yyyy-MM-dd","datetime-local":"yyyy-MM-ddTHH:mm:ss.sss",month:"yyyy-MM"},currentText:"Today",clearText:"Clear",closeText:"Done",closeOnDateSelection:!0,appendToBody:!1,showButtonBar:!0,onOpenFocus:!0}).controller("UibDatepickerPopupController",["$scope","$element","$attrs","$compile","$parse","$document","$rootScope","$uibPosition","dateFilter","uibDateParser","uibDatepickerPopupConfig","$timeout",function(a,b,c,d,e,f,g,h,i,j,k,l){
function m(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function n(b){if(angular.isNumber(b)&&(b=new Date(b)),b){if(angular.isDate(b)&&!isNaN(b))return b;if(angular.isString(b)){var c=j.parse(b,r,a.date);return isNaN(c)?void 0:c}return void 0}return null}function o(a,b){var d=a||b;if(!c.ngRequired&&!d)return!0;if(angular.isNumber(d)&&(d=new Date(d)),d){if(angular.isDate(d)&&!isNaN(d))return!0;if(angular.isString(d)){var e=j.parse(d,r);return!isNaN(e)}return!1}return!0}function p(c){var d=A[0],e=b[0].contains(c.target),f=void 0!==d.contains&&d.contains(c.target);!a.isOpen||e||f||a.$apply(function(){a.isOpen=!1})}function q(c){27===c.which&&a.isOpen?(c.preventDefault(),c.stopPropagation(),a.$apply(function(){a.isOpen=!1}),b[0].focus()):40!==c.which||a.isOpen||(c.preventDefault(),c.stopPropagation(),a.$apply(function(){a.isOpen=!0}))}var r,s,t,u,v,w,x,y,z,A,B={},C=!1;a.watchData={},this.init=function(h){if(z=h,s=angular.isDefined(c.closeOnDateSelection)?a.$parent.$eval(c.closeOnDateSelection):k.closeOnDateSelection,t=angular.isDefined(c.datepickerAppendToBody)?a.$parent.$eval(c.datepickerAppendToBody):k.appendToBody,u=angular.isDefined(c.onOpenFocus)?a.$parent.$eval(c.onOpenFocus):k.onOpenFocus,v=angular.isDefined(c.datepickerPopupTemplateUrl)?c.datepickerPopupTemplateUrl:k.datepickerPopupTemplateUrl,w=angular.isDefined(c.datepickerTemplateUrl)?c.datepickerTemplateUrl:k.datepickerTemplateUrl,a.showButtonBar=angular.isDefined(c.showButtonBar)?a.$parent.$eval(c.showButtonBar):k.showButtonBar,k.html5Types[c.type]?(r=k.html5Types[c.type],C=!0):(r=c.datepickerPopup||c.uibDatepickerPopup||k.datepickerPopup,c.$observe("uibDatepickerPopup",function(a,b){var c=a||k.datepickerPopup;if(c!==r&&(r=c,z.$modelValue=null,!r))throw new Error("uibDatepickerPopup must have a date format specified.")})),!r)throw new Error("uibDatepickerPopup must have a date format specified.");if(C&&c.datepickerPopup)throw new Error("HTML5 date input types do not support custom formats.");if(x=angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"),x.attr({"ng-model":"date","ng-change":"dateSelection(date)","template-url":v}),y=angular.element(x.children()[0]),y.attr("template-url",w),C&&"month"===c.type&&(y.attr("datepicker-mode",'"month"'),y.attr("min-mode","month")),c.datepickerOptions){var l=a.$parent.$eval(c.datepickerOptions);l&&l.initDate&&(a.initDate=l.initDate,y.attr("init-date","initDate"),delete l.initDate),angular.forEach(l,function(a,b){y.attr(m(b),a)})}angular.forEach(["minMode","maxMode","minDate","maxDate","datepickerMode","initDate","shortcutPropagation"],function(b){if(c[b]){var d=e(c[b]);if(a.$parent.$watch(d,function(c){a.watchData[b]=c,("minDate"===b||"maxDate"===b)&&(B[b]=new Date(c))}),y.attr(m(b),"watchData."+b),"datepickerMode"===b){var f=d.assign;a.$watch("watchData."+b,function(b,c){angular.isFunction(f)&&b!==c&&f(a.$parent,b)})}}}),c.dateDisabled&&y.attr("date-disabled","dateDisabled({ date: date, mode: mode })"),c.showWeeks&&y.attr("show-weeks",c.showWeeks),c.customClass&&y.attr("custom-class","customClass({ date: date, mode: mode })"),C?z.$formatters.push(function(b){return a.date=b,b}):(z.$$parserName="date",z.$validators.date=o,z.$parsers.unshift(n),z.$formatters.push(function(b){return a.date=b,z.$isEmpty(b)?b:i(b,r)})),z.$viewChangeListeners.push(function(){a.date=j.parse(z.$viewValue,r,a.date)}),b.bind("keydown",q),A=d(x)(a),x.remove(),t?f.find("body").append(A):b.after(A),a.$on("$destroy",function(){a.isOpen===!0&&(g.$$phase||a.$apply(function(){a.isOpen=!1})),A.remove(),b.unbind("keydown",q),f.unbind("click",p)})},a.getText=function(b){return a[b+"Text"]||k[b+"Text"]},a.isDisabled=function(b){return"today"===b&&(b=new Date),a.watchData.minDate&&a.compare(b,B.minDate)<0||a.watchData.maxDate&&a.compare(b,B.maxDate)>0},a.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},a.dateSelection=function(c){angular.isDefined(c)&&(a.date=c);var d=a.date?i(a.date,r):null;b.val(d),z.$setViewValue(d),s&&(a.isOpen=!1,b[0].focus())},a.keydown=function(c){27===c.which&&(a.isOpen=!1,b[0].focus())},a.select=function(b){if("today"===b){var c=new Date;angular.isDate(a.date)?(b=new Date(a.date),b.setFullYear(c.getFullYear(),c.getMonth(),c.getDate())):b=new Date(c.setHours(0,0,0,0))}a.dateSelection(b)},a.close=function(){a.isOpen=!1,b[0].focus()},a.$watch("isOpen",function(c){c?(a.position=t?h.offset(b):h.position(b),a.position.top=a.position.top+b.prop("offsetHeight"),l(function(){u&&a.$broadcast("uib:datepicker.focus"),f.bind("click",p)},0,!1)):f.unbind("click",p)})}]).directive("uibDatepickerPopup",function(){return{require:["ngModel","uibDatepickerPopup"],controller:"UibDatepickerPopupController",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&",customClass:"&"},link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibDatepickerPopupWrap",function(){return{replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/popup.html"}}}),angular.module("ui.bootstrap.datepicker").value("$datepickerSuppressWarning",!1).controller("DatepickerController",["$scope","$attrs","$parse","$interpolate","$log","dateFilter","uibDatepickerConfig","$datepickerSuppressError","$datepickerSuppressWarning",function(a,b,c,d,e,f,g,h,i){i||e.warn("DatepickerController is now deprecated. Use UibDatepickerController instead.");var j=this,k={$setViewValue:angular.noop};this.modes=["day","month","year"],angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","showWeeks","startingDay","yearRange","shortcutPropagation"],function(c,e){j[c]=angular.isDefined(b[c])?6>e?d(b[c])(a.$parent):a.$parent.$eval(b[c]):g[c]}),angular.forEach(["minDate","maxDate"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(a){j[d]=a?new Date(a):null,j.refreshView()}):j[d]=g[d]?new Date(g[d]):null}),angular.forEach(["minMode","maxMode"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(c){j[d]=angular.isDefined(c)?c:b[d],a[d]=j[d],("minMode"==d&&j.modes.indexOf(a.datepickerMode)<j.modes.indexOf(j[d])||"maxMode"==d&&j.modes.indexOf(a.datepickerMode)>j.modes.indexOf(j[d]))&&(a.datepickerMode=j[d])}):(j[d]=g[d]||null,a[d]=j[d])}),a.datepickerMode=a.datepickerMode||g.datepickerMode,a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),angular.isDefined(b.initDate)?(this.activeDate=a.$parent.$eval(b.initDate)||new Date,a.$parent.$watch(b.initDate,function(a){a&&(k.$isEmpty(k.$modelValue)||k.$invalid)&&(j.activeDate=a,j.refreshView())})):this.activeDate=new Date,a.isActive=function(b){return 0===j.compare(b.date,j.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(a){k=a,k.$render=function(){j.render()}},this.render=function(){if(k.$viewValue){var a=new Date(k.$viewValue),b=!isNaN(a);b?this.activeDate=a:h||e.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var a=k.$viewValue?new Date(k.$viewValue):null;k.$setValidity("dateDisabled",!a||this.element&&!this.isDisabled(a))}},this.createDateObject=function(a,b){var c=k.$viewValue?new Date(k.$viewValue):null;return{date:a,label:f(a,b),selected:c&&0===this.compare(a,c),disabled:this.isDisabled(a),current:0===this.compare(a,new Date),customClass:this.customClass(a)}},this.isDisabled=function(c){return this.minDate&&this.compare(c,this.minDate)<0||this.maxDate&&this.compare(c,this.maxDate)>0||b.dateDisabled&&a.dateDisabled({date:c,mode:a.datepickerMode})},this.customClass=function(b){return a.customClass({date:b,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},this.fixTimeZone=function(a){var b=a.getHours();a.setHours(23===b?b+2:0)},a.select=function(b){if(a.datepickerMode===j.minMode){var c=k.$viewValue?new Date(k.$viewValue):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),k.$setViewValue(c),k.$render()}else j.activeDate=b,a.datepickerMode=j.modes[j.modes.indexOf(a.datepickerMode)-1]},a.move=function(a){var b=j.activeDate.getFullYear()+a*(j.step.years||0),c=j.activeDate.getMonth()+a*(j.step.months||0);j.activeDate.setFullYear(b,c,1),j.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===j.maxMode&&1===b||a.datepickerMode===j.minMode&&-1===b||(a.datepickerMode=j.modes[j.modes.indexOf(a.datepickerMode)+b])},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var l=function(){j.element[0].focus()};a.$on("uib:datepicker.focus",l),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey)if(b.preventDefault(),j.shortcutPropagation||b.stopPropagation(),"enter"===c||"space"===c){if(j.isDisabled(j.activeDate))return;a.select(j.activeDate)}else!b.ctrlKey||"up"!==c&&"down"!==c?(j.handleKeyDown(c,b),j.refreshView()):a.toggleMode("up"===c?1:-1)}}]).directive("datepicker",["$log","$datepickerSuppressWarning",function(a,b){return{replace:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/datepicker.html"},scope:{datepickerMode:"=?",dateDisabled:"&",customClass:"&",shortcutPropagation:"&?"},require:["datepicker","^ngModel"],controller:"DatepickerController",controllerAs:"datepicker",link:function(c,d,e,f){b||a.warn("datepicker is now deprecated. Use uib-datepicker instead.");var g=f[0],h=f[1];g.init(h)}}}]).directive("daypicker",["$log","$datepickerSuppressWarning",function(a,b){return{replace:!0,templateUrl:"template/datepicker/day.html",require:["^datepicker","daypicker"],controller:"UibDaypickerController",link:function(c,d,e,f){b||a.warn("daypicker is now deprecated. Use uib-daypicker instead.");var g=f[0],h=f[1];h.init(g)}}}]).directive("monthpicker",["$log","$datepickerSuppressWarning",function(a,b){return{replace:!0,templateUrl:"template/datepicker/month.html",require:["^datepicker","monthpicker"],controller:"UibMonthpickerController",link:function(c,d,e,f){b||a.warn("monthpicker is now deprecated. Use uib-monthpicker instead.");var g=f[0],h=f[1];h.init(g)}}}]).directive("yearpicker",["$log","$datepickerSuppressWarning",function(a,b){return{replace:!0,templateUrl:"template/datepicker/year.html",require:["^datepicker","yearpicker"],controller:"UibYearpickerController",link:function(c,d,e,f){b||a.warn("yearpicker is now deprecated. Use uib-yearpicker instead.");var g=f[0];angular.extend(g,f[1]),g.yearpickerInit(),g.refreshView()}}}]).directive("datepickerPopup",["$log","$datepickerSuppressWarning",function(a,b){return{require:["ngModel","datepickerPopup"],controller:"UibDatepickerPopupController",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&",customClass:"&"},link:function(c,d,e,f){b||a.warn("datepicker-popup is now deprecated. Use uib-datepicker-popup instead.");var g=f[0],h=f[1];h.init(g)}}}]).directive("datepickerPopupWrap",["$log","$datepickerSuppressWarning",function(a,b){return{replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/datepicker/popup.html"},link:function(){b||a.warn("datepicker-popup-wrap is now deprecated. Use uib-datepicker-popup-wrap instead.")}}}]),angular.module("ui.bootstrap.dropdown",["ui.bootstrap.position"]).constant("uibDropdownConfig",{openClass:"open"}).service("uibDropdownService",["$document","$rootScope",function(a,b){var c=null;this.open=function(b){c||(a.bind("click",d),a.bind("keydown",e)),c&&c!==b&&(c.isOpen=!1),c=b},this.close=function(b){c===b&&(c=null,a.unbind("click",d),a.unbind("keydown",e))};var d=function(a){if(c&&(!a||"disabled"!==c.getAutoClose())){var d=c.getToggleElement();if(!(a&&d&&d[0].contains(a.target))){var e=c.getDropdownElement();a&&"outsideClick"===c.getAutoClose()&&e&&e[0].contains(a.target)||(c.isOpen=!1,b.$$phase||c.$apply())}}},e=function(a){27===a.which?(c.focusToggleElement(),d()):c.isKeynavEnabled()&&/(38|40)/.test(a.which)&&c.isOpen&&(a.preventDefault(),a.stopPropagation(),c.focusDropdownEntry(a.which))}}]).controller("UibDropdownController",["$scope","$element","$attrs","$parse","uibDropdownConfig","uibDropdownService","$animate","$uibPosition","$document","$compile","$templateRequest",function(a,b,c,d,e,f,g,h,i,j,k){var l,m,n=this,o=a.$new(),p=e.openClass,q=angular.noop,r=c.onToggle?d(c.onToggle):angular.noop,s=!1,t=!1;b.addClass("dropdown"),this.init=function(){c.isOpen&&(m=d(c.isOpen),q=m.assign,a.$watch(m,function(a){o.isOpen=!!a})),s=angular.isDefined(c.dropdownAppendToBody),t=angular.isDefined(c.uibKeyboardNav),s&&n.dropdownMenu&&(i.find("body").append(n.dropdownMenu),b.on("$destroy",function(){n.dropdownMenu.remove()}))},this.toggle=function(a){return o.isOpen=arguments.length?!!a:!o.isOpen},this.isOpen=function(){return o.isOpen},o.getToggleElement=function(){return n.toggleElement},o.getAutoClose=function(){return c.autoClose||"always"},o.getElement=function(){return b},o.isKeynavEnabled=function(){return t},o.focusDropdownEntry=function(a){var c=n.dropdownMenu?angular.element(n.dropdownMenu).find("a"):angular.element(b).find("ul").eq(0).find("a");switch(a){case 40:angular.isNumber(n.selectedOption)?n.selectedOption=n.selectedOption===c.length-1?n.selectedOption:n.selectedOption+1:n.selectedOption=0;break;case 38:angular.isNumber(n.selectedOption)?n.selectedOption=0===n.selectedOption?0:n.selectedOption-1:n.selectedOption=c.length-1}c[n.selectedOption].focus()},o.getDropdownElement=function(){return n.dropdownMenu},o.focusToggleElement=function(){n.toggleElement&&n.toggleElement[0].focus()},o.$watch("isOpen",function(c,d){if(s&&n.dropdownMenu){var e=h.positionElements(b,n.dropdownMenu,"bottom-left",!0),i={top:e.top+"px",display:c?"block":"none"},m=n.dropdownMenu.hasClass("dropdown-menu-right");m?(i.left="auto",i.right=window.innerWidth-(e.left+b.prop("offsetWidth"))+"px"):(i.left=e.left+"px",i.right="auto"),n.dropdownMenu.css(i)}if(g[c?"addClass":"removeClass"](b,p).then(function(){angular.isDefined(c)&&c!==d&&r(a,{open:!!c})}),c)n.dropdownMenuTemplateUrl&&k(n.dropdownMenuTemplateUrl).then(function(a){l=o.$new(),j(a.trim())(l,function(a){var b=a;n.dropdownMenu.replaceWith(b),n.dropdownMenu=b})}),o.focusToggleElement(),f.open(o);else{if(n.dropdownMenuTemplateUrl){l&&l.$destroy();var t=angular.element('<ul class="dropdown-menu"></ul>');n.dropdownMenu.replaceWith(t),n.dropdownMenu=t}f.close(o),n.selectedOption=null}angular.isFunction(q)&&q(a,c)}),a.$on("$locationChangeSuccess",function(){"disabled"!==o.getAutoClose()&&(o.isOpen=!1)});var u=a.$on("$destroy",function(){o.$destroy()});o.$on("$destroy",u)}]).directive("uibDropdown",function(){return{controller:"UibDropdownController",link:function(a,b,c,d){d.init()}}}).directive("uibDropdownMenu",function(){return{restrict:"AC",require:"?^uibDropdown",link:function(a,b,c,d){if(d&&!angular.isDefined(c.dropdownNested)){b.addClass("dropdown-menu");var e=c.templateUrl;e&&(d.dropdownMenuTemplateUrl=e),d.dropdownMenu||(d.dropdownMenu=b)}}}}).directive("uibKeyboardNav",function(){return{restrict:"A",require:"?^uibDropdown",link:function(a,b,c,d){b.bind("keydown",function(a){if(-1!==[38,40].indexOf(a.which)){a.preventDefault(),a.stopPropagation();var b=d.dropdownMenu.find("a");switch(a.which){case 40:angular.isNumber(d.selectedOption)?d.selectedOption=d.selectedOption===b.length-1?d.selectedOption:d.selectedOption+1:d.selectedOption=0;break;case 38:angular.isNumber(d.selectedOption)?d.selectedOption=0===d.selectedOption?0:d.selectedOption-1:d.selectedOption=b.length-1}b[d.selectedOption].focus()}})}}}).directive("uibDropdownToggle",function(){return{require:"?^uibDropdown",link:function(a,b,c,d){if(d){b.addClass("dropdown-toggle"),d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ui.bootstrap.dropdown").value("$dropdownSuppressWarning",!1).service("dropdownService",["$log","$dropdownSuppressWarning","uibDropdownService",function(a,b,c){b||a.warn("dropdownService is now deprecated. Use uibDropdownService instead."),angular.extend(this,c)}]).controller("DropdownController",["$scope","$element","$attrs","$parse","uibDropdownConfig","uibDropdownService","$animate","$uibPosition","$document","$compile","$templateRequest","$log","$dropdownSuppressWarning",function(a,b,c,d,e,f,g,h,i,j,k,l,m){m||l.warn("DropdownController is now deprecated. Use UibDropdownController instead.");var n,o,p=this,q=a.$new(),r=e.openClass,s=angular.noop,t=c.onToggle?d(c.onToggle):angular.noop,u=!1,v=!1;b.addClass("dropdown"),this.init=function(){c.isOpen&&(o=d(c.isOpen),s=o.assign,a.$watch(o,function(a){q.isOpen=!!a})),u=angular.isDefined(c.dropdownAppendToBody),v=angular.isDefined(c.uibKeyboardNav),u&&p.dropdownMenu&&(i.find("body").append(p.dropdownMenu),b.on("$destroy",function(){p.dropdownMenu.remove()}))},this.toggle=function(a){return q.isOpen=arguments.length?!!a:!q.isOpen},this.isOpen=function(){return q.isOpen},q.getToggleElement=function(){return p.toggleElement},q.getAutoClose=function(){return c.autoClose||"always"},q.getElement=function(){return b},q.isKeynavEnabled=function(){return v},q.focusDropdownEntry=function(a){var c=p.dropdownMenu?angular.element(p.dropdownMenu).find("a"):angular.element(b).find("ul").eq(0).find("a");switch(a){case 40:angular.isNumber(p.selectedOption)?p.selectedOption=p.selectedOption===c.length-1?p.selectedOption:p.selectedOption+1:p.selectedOption=0;break;case 38:angular.isNumber(p.selectedOption)?p.selectedOption=0===p.selectedOption?0:p.selectedOption-1:p.selectedOption=c.length-1}c[p.selectedOption].focus()},q.getDropdownElement=function(){return p.dropdownMenu},q.focusToggleElement=function(){p.toggleElement&&p.toggleElement[0].focus()},q.$watch("isOpen",function(c,d){if(u&&p.dropdownMenu){var e=h.positionElements(b,p.dropdownMenu,"bottom-left",!0),i={top:e.top+"px",display:c?"block":"none"},l=p.dropdownMenu.hasClass("dropdown-menu-right");l?(i.left="auto",i.right=window.innerWidth-(e.left+b.prop("offsetWidth"))+"px"):(i.left=e.left+"px",i.right="auto"),p.dropdownMenu.css(i)}if(g[c?"addClass":"removeClass"](b,r).then(function(){angular.isDefined(c)&&c!==d&&t(a,{open:!!c})}),c)p.dropdownMenuTemplateUrl&&k(p.dropdownMenuTemplateUrl).then(function(a){n=q.$new(),j(a.trim())(n,function(a){var b=a;p.dropdownMenu.replaceWith(b),p.dropdownMenu=b})}),q.focusToggleElement(),f.open(q);else{if(p.dropdownMenuTemplateUrl){n&&n.$destroy();var m=angular.element('<ul class="dropdown-menu"></ul>');p.dropdownMenu.replaceWith(m),p.dropdownMenu=m}f.close(q),p.selectedOption=null}angular.isFunction(s)&&s(a,c)}),a.$on("$locationChangeSuccess",function(){"disabled"!==q.getAutoClose()&&(q.isOpen=!1)});var w=a.$on("$destroy",function(){q.$destroy()});q.$on("$destroy",w)}]).directive("dropdown",["$log","$dropdownSuppressWarning",function(a,b){return{controller:"DropdownController",link:function(c,d,e,f){b||a.warn("dropdown is now deprecated. Use uib-dropdown instead."),f.init()}}}]).directive("dropdownMenu",["$log","$dropdownSuppressWarning",function(a,b){return{restrict:"AC",require:"?^dropdown",link:function(c,d,e,f){if(f&&!angular.isDefined(e.dropdownNested)){b||a.warn("dropdown-menu is now deprecated. Use uib-dropdown-menu instead."),d.addClass("dropdown-menu");var g=e.templateUrl;g&&(f.dropdownMenuTemplateUrl=g),f.dropdownMenu||(f.dropdownMenu=d)}}}}]).directive("keyboardNav",["$log","$dropdownSuppressWarning",function(a,b){return{restrict:"A",require:"?^dropdown",link:function(c,d,e,f){b||a.warn("keyboard-nav is now deprecated. Use uib-keyboard-nav instead."),d.bind("keydown",function(a){if(-1!==[38,40].indexOf(a.which)){a.preventDefault(),a.stopPropagation();var b=f.dropdownMenu.find("a");switch(a.which){case 40:angular.isNumber(f.selectedOption)?f.selectedOption=f.selectedOption===b.length-1?f.selectedOption:f.selectedOption+1:f.selectedOption=0;break;case 38:angular.isNumber(f.selectedOption)?f.selectedOption=0===f.selectedOption?0:f.selectedOption-1:f.selectedOption=b.length-1}b[f.selectedOption].focus()}})}}}]).directive("dropdownToggle",["$log","$dropdownSuppressWarning",function(a,b){return{require:"?^dropdown",link:function(c,d,e,f){if(b||a.warn("dropdown-toggle is now deprecated. Use uib-dropdown-toggle instead."),f){d.addClass("dropdown-toggle"),f.toggleElement=d;var g=function(a){a.preventDefault(),d.hasClass("disabled")||e.disabled||c.$apply(function(){f.toggle()})};d.bind("click",g),d.attr({"aria-haspopup":!0,"aria-expanded":!1}),c.$watch(f.isOpen,function(a){d.attr("aria-expanded",!!a)}),c.$on("$destroy",function(){d.unbind("click",g)})}}}}]),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap"]).factory("$$multiMap",function(){return{createNew:function(){var a={};return{entries:function(){return Object.keys(a).map(function(b){return{key:b,value:a[b]}})},get:function(b){return a[b]},hasKey:function(b){return!!a[b]},keys:function(){return Object.keys(a)},put:function(b,c){a[b]||(a[b]=[]),a[b].push(c)},remove:function(b,c){var d=a[b];if(d){var e=d.indexOf(c);-1!==e&&d.splice(e,1),d.length||delete a[b]}}}}}}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(a,b,c){function d(b,d,f){d.addClass("modal-backdrop"),f.modalInClass&&(e?e(d,{addClass:f.modalInClass}).start():a.addClass(d,f.modalInClass),b.$on(c.NOW_CLOSING_EVENT,function(b,c){var g=c();e?e(d,{removeClass:f.modalInClass}).start().then(g):a.removeClass(d,f.modalInClass).then(g)}))}var e=null;return b.has("$animateCss")&&(e=b.get("$animateCss")),{replace:!0,templateUrl:"template/modal/backdrop.html",compile:function(a,b){return a.addClass(b.backdropClass),d}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animate","$injector",function(a,b,c,d){var e=null;return d.has("$animateCss")&&(e=d.get("$animateCss")),{scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(d,f,g){f.addClass(g.windowClass||""),f.addClass(g.windowTopClass||""),d.size=g.size,d.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!==c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))},f.on("click",d.close),d.$isRendered=!0;var h=b.defer();g.$observe("modalRender",function(a){"true"==a&&h.resolve()}),h.promise.then(function(){var h=null;g.modalInClass&&(h=e?e(f,{addClass:g.modalInClass}).start():c.addClass(f,g.modalInClass),d.$on(a.NOW_CLOSING_EVENT,function(a,b){var d=b();e?e(f,{removeClass:g.modalInClass}).start().then(d):c.removeClass(f,g.modalInClass).then(d)})),b.when(h).then(function(){var a=f[0].querySelector("[autofocus]");a?a.focus():f[0].focus()});var i=a.getTop();i&&a.modalRendered(i.key)})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(a,b){b.modalAnimation&&a.addClass(b.uibModalAnimationClass)}}}).directive("uibModalTransclude",function(){return{link:function(a,b,c,d,e){e(a.$parent,function(a){b.empty(),b.append(a)})}}}).factory("$uibModalStack",["$animate","$timeout","$document","$compile","$rootScope","$q","$injector","$$multiMap","$$stackedMap",function(a,b,c,d,e,f,g,h,i){function j(){for(var a=-1,b=u.keys(),c=0;c<b.length;c++)u.get(b[c]).value.backdrop&&(a=c);return a}function k(a,b){var d=c.find("body").eq(0),e=u.get(a).value;u.remove(a),n(e.modalDomEl,e.modalScope,function(){var b=e.openedClass||t;v.remove(b,a),d.toggleClass(b,v.hasKey(b)),l(!0)}),m(),b&&b.focus?b.focus():d.focus()}function l(a){var b;u.length()>0&&(b=u.top().value,b.modalDomEl.toggleClass(b.windowTopClass||"",a))}function m(){if(q&&-1==j()){var a=r;n(q,r,function(){a=null}),q=void 0,r=void 0}}function n(b,c,d){function e(){e.done||(e.done=!0,p?p(b,{event:"leave"}).start().then(function(){b.remove()}):a.leave(b),c.$destroy(),d&&d())}var g,h=null,i=function(){return g||(g=f.defer(),h=g.promise),function(){g.resolve()}};return c.$broadcast(w.NOW_CLOSING_EVENT,i),f.when(h).then(e)}function o(a,b,c){return!a.value.modalScope.$broadcast("modal.closing",b,c).defaultPrevented}var p=null;g.has("$animateCss")&&(p=g.get("$animateCss"));var q,r,s,t="modal-open",u=i.createNew(),v=h.createNew(),w={NOW_CLOSING_EVENT:"modal.stack.now-closing"},x=0,y="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";return e.$watch(j,function(a){r&&(r.index=a)}),c.bind("keydown",function(a){if(a.isDefaultPrevented())return a;var b=u.top();if(b&&b.value.keyboard)switch(a.which){case 27:a.preventDefault(),e.$apply(function(){w.dismiss(b.key,"escape key press")});break;case 9:w.loadFocusElementList(b);var c=!1;a.shiftKey?w.isFocusInFirstItem(a)&&(c=w.focusLastFocusableElement()):w.isFocusInLastItem(a)&&(c=w.focusFirstFocusableElement()),c&&(a.preventDefault(),a.stopPropagation())}}),w.open=function(a,b){var f=c[0].activeElement,g=b.openedClass||t;l(!1),u.add(a,{deferred:b.deferred,renderDeferred:b.renderDeferred,modalScope:b.scope,backdrop:b.backdrop,keyboard:b.keyboard,openedClass:b.openedClass,windowTopClass:b.windowTopClass}),v.put(g,a);var h=c.find("body").eq(0),i=j();if(i>=0&&!q){r=e.$new(!0),r.index=i;var k=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');k.attr("backdrop-class",b.backdropClass),b.animation&&k.attr("modal-animation","true"),q=d(k)(r),h.append(q)}var m=angular.element('<div uib-modal-window="modal-window"></div>');m.attr({"template-url":b.windowTemplateUrl,"window-class":b.windowClass,"window-top-class":b.windowTopClass,size:b.size,index:u.length()-1,animate:"animate"}).html(b.content),b.animation&&m.attr("modal-animation","true");var n=d(m)(b.scope);u.top().value.modalDomEl=n,u.top().value.modalOpener=f,h.append(n),h.addClass(g),w.clearFocusListCache()},w.close=function(a,b){var c=u.get(a);return c&&o(c,b,!0)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.resolve(b),k(a,c.value.modalOpener),!0):!c},w.dismiss=function(a,b){var c=u.get(a);return c&&o(c,b,!1)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.reject(b),k(a,c.value.modalOpener),!0):!c},w.dismissAll=function(a){for(var b=this.getTop();b&&this.dismiss(b.key,a);)b=this.getTop()},w.getTop=function(){return u.top()},w.modalRendered=function(a){var b=u.get(a);b&&b.value.renderDeferred.resolve()},w.focusFirstFocusableElement=function(){return s.length>0?(s[0].focus(),!0):!1},w.focusLastFocusableElement=function(){return s.length>0?(s[s.length-1].focus(),!0):!1},w.isFocusInFirstItem=function(a){return s.length>0?(a.target||a.srcElement)==s[0]:!1},w.isFocusInLastItem=function(a){return s.length>0?(a.target||a.srcElement)==s[s.length-1]:!1},w.clearFocusListCache=function(){s=[],x=0},w.loadFocusElementList=function(a){if((void 0===s||!s.length)&&a){var b=a.value.modalDomEl;b&&b.length&&(s=b[0].querySelectorAll(y))}},w}]).provider("$uibModal",function(){var a={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$templateRequest","$controller","$uibModalStack","$modalSuppressWarning","$log",function(b,c,d,e,f,g,h,i){function j(a){return a.template?d.when(a.template):e(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl)}function k(a){var c=[];return angular.forEach(a,function(a){angular.isFunction(a)||angular.isArray(a)?c.push(d.when(b.invoke(a))):angular.isString(a)?c.push(d.when(b.get(a))):c.push(d.when(a))}),c}var l={},m=null;return l.getPromiseChain=function(){return m},l.open=function(b){function e(){return r}var l=d.defer(),n=d.defer(),o=d.defer(),p={result:l.promise,opened:n.promise,rendered:o.promise,close:function(a){return g.close(p,a)},dismiss:function(a){return g.dismiss(p,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var q,r=d.all([j(b)].concat(k(b.resolve)));return q=m=d.all([m]).then(e,e).then(function(a){var d=(b.scope||c).$new();d.$close=p.close,d.$dismiss=p.dismiss,d.$on("$destroy",function(){d.$$uibDestructionScheduled||d.$dismiss("$uibUnscheduledDestruction")});var e,j={},k=1;b.controller&&(j.$scope=d,j.$uibModalInstance=p,Object.defineProperty(j,"$modalInstance",{get:function(){return h||i.warn("$modalInstance is now deprecated. Use $uibModalInstance instead."),p}}),angular.forEach(b.resolve,function(b,c){j[c]=a[k++]}),e=f(b.controller,j),b.controllerAs&&(b.bindToController&&angular.extend(e,d),d[b.controllerAs]=e)),g.open(p,{scope:d,deferred:l,renderDeferred:o,content:a[0],animation:b.animation,backdrop:b.backdrop,keyboard:b.keyboard,backdropClass:b.backdropClass,windowTopClass:b.windowTopClass,windowClass:b.windowClass,windowTemplateUrl:b.windowTemplateUrl,size:b.size,openedClass:b.openedClass}),n.resolve(!0)},function(a){n.reject(a),l.reject(a)})["finally"](function(){m===q&&(m=null)}),p},l}]};return a}),angular.module("ui.bootstrap.modal").value("$modalSuppressWarning",!1).directive("modalBackdrop",["$animate","$injector","$modalStack","$log","$modalSuppressWarning",function(a,b,c,d,e){function f(b,f,h){e||d.warn("modal-backdrop is now deprecated. Use uib-modal-backdrop instead."),f.addClass("modal-backdrop"),h.modalInClass&&(g?g(f,{addClass:h.modalInClass}).start():a.addClass(f,h.modalInClass),b.$on(c.NOW_CLOSING_EVENT,function(b,c){var d=c();g?g(f,{removeClass:h.modalInClass}).start().then(d):a.removeClass(f,h.modalInClass).then(d)}))}var g=null;return b.has("$animateCss")&&(g=b.get("$animateCss")),{replace:!0,templateUrl:"template/modal/backdrop.html",compile:function(a,b){return a.addClass(b.backdropClass),f}}}]).directive("modalWindow",["$modalStack","$q","$animate","$injector","$log","$modalSuppressWarning",function(a,b,c,d,e,f){var g=null;return d.has("$animateCss")&&(g=d.get("$animateCss")),{scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(d,h,i){f||e.warn("modal-window is now deprecated. Use uib-modal-window instead."),h.addClass(i.windowClass||""),h.addClass(i.windowTopClass||""),d.size=i.size,d.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!==c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))},h.on("click",d.close),d.$isRendered=!0;var j=b.defer();i.$observe("modalRender",function(a){"true"==a&&j.resolve()}),j.promise.then(function(){var e=null;i.modalInClass&&(e=g?g(h,{addClass:i.modalInClass}).start():c.addClass(h,i.modalInClass),d.$on(a.NOW_CLOSING_EVENT,function(a,b){var d=b();g?g(h,{removeClass:i.modalInClass}).start().then(d):c.removeClass(h,i.modalInClass).then(d)})),b.when(e).then(function(){var a=h[0].querySelector("[autofocus]");a?a.focus():h[0].focus()});var f=a.getTop();f&&a.modalRendered(f.key)})}}}]).directive("modalAnimationClass",["$log","$modalSuppressWarning",function(a,b){return{compile:function(c,d){b||a.warn("modal-animation-class is now deprecated. Use uib-modal-animation-class instead."),d.modalAnimation&&c.addClass(d.modalAnimationClass)}}}]).directive("modalTransclude",["$log","$modalSuppressWarning",function(a,b){return{link:function(c,d,e,f,g){
b||a.warn("modal-transclude is now deprecated. Use uib-modal-transclude instead."),g(c.$parent,function(a){d.empty(),d.append(a)})}}}]).service("$modalStack",["$animate","$timeout","$document","$compile","$rootScope","$q","$injector","$$multiMap","$$stackedMap","$uibModalStack","$log","$modalSuppressWarning",function(a,b,c,d,e,f,g,h,i,j,k,l){l||k.warn("$modalStack is now deprecated. Use $uibModalStack instead."),angular.extend(this,j)}]).provider("$modal",["$uibModalProvider",function(a){angular.extend(this,a),this.$get=["$injector","$log","$modalSuppressWarning",function(b,c,d){return d||c.warn("$modal is now deprecated. Use $uibModal instead."),b.invoke(a.$get)}]}]),angular.module("ui.bootstrap.pagination",[]).controller("UibPaginationController",["$scope","$attrs","$parse",function(a,b,c){var d=this,e={$setViewValue:angular.noop},f=b.numPages?c(b.numPages).assign:angular.noop;this.init=function(g,h){e=g,this.config=h,e.$render=function(){d.render()},b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){d.itemsPerPage=parseInt(b,10),a.totalPages=d.calculateTotalPages()}):this.itemsPerPage=h.itemsPerPage,a.$watch("totalItems",function(){a.totalPages=d.calculateTotalPages()}),a.$watch("totalPages",function(b){f(a.$parent,b),a.page>b?a.selectPage(b):e.$render()})},this.calculateTotalPages=function(){var b=this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage);return Math.max(b||0,1)},this.render=function(){a.page=parseInt(e.$viewValue,10)||1},a.selectPage=function(b,c){c&&c.preventDefault();var d=!a.ngDisabled||!c;d&&a.page!==b&&b>0&&b<=a.totalPages&&(c&&c.target&&c.target.blur(),e.$setViewValue(b),e.$render())},a.getText=function(b){return a[b+"Text"]||d.config[b+"Text"]},a.noPrevious=function(){return 1===a.page},a.noNext=function(){return a.page===a.totalPages}}]).constant("uibPaginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("uibPagination",["$parse","uibPaginationConfig",function(a,b){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["uibPagination","?ngModel"],controller:"UibPaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"template/pagination/pagination.html"},replace:!0,link:function(c,d,e,f){function g(a,b,c){return{number:a,text:b,active:c}}function h(a,b){var c=[],d=1,e=b,f=angular.isDefined(k)&&b>k;f&&(l?(d=Math.max(a-Math.floor(k/2),1),e=d+k-1,e>b&&(e=b,d=e-k+1)):(d=(Math.ceil(a/k)-1)*k+1,e=Math.min(d+k-1,b)));for(var h=d;e>=h;h++){var i=g(h,h,h===a);c.push(i)}if(f&&!l){if(d>1){var j=g(d-1,"...",!1);c.unshift(j)}if(b>e){var m=g(e+1,"...",!1);c.push(m)}}return c}var i=f[0],j=f[1];if(j){var k=angular.isDefined(e.maxSize)?c.$parent.$eval(e.maxSize):b.maxSize,l=angular.isDefined(e.rotate)?c.$parent.$eval(e.rotate):b.rotate;c.boundaryLinks=angular.isDefined(e.boundaryLinks)?c.$parent.$eval(e.boundaryLinks):b.boundaryLinks,c.directionLinks=angular.isDefined(e.directionLinks)?c.$parent.$eval(e.directionLinks):b.directionLinks,i.init(j,b),e.maxSize&&c.$parent.$watch(a(e.maxSize),function(a){k=parseInt(a,10),i.render()});var m=i.render;i.render=function(){m(),c.page>0&&c.page<=c.totalPages&&(c.pages=h(c.page,c.totalPages))}}}}}]).constant("uibPagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("uibPager",["uibPagerConfig",function(a){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@",ngDisabled:"="},require:["uibPager","?ngModel"],controller:"UibPaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"template/pagination/pager.html"},replace:!0,link:function(b,c,d,e){var f=e[0],g=e[1];g&&(b.align=angular.isDefined(d.align)?b.$parent.$eval(d.align):a.align,f.init(g,a))}}}]),angular.module("ui.bootstrap.pagination").value("$paginationSuppressWarning",!1).controller("PaginationController",["$scope","$attrs","$parse","$log","$paginationSuppressWarning",function(a,b,c,d,e){e||d.warn("PaginationController is now deprecated. Use UibPaginationController instead.");var f=this,g={$setViewValue:angular.noop},h=b.numPages?c(b.numPages).assign:angular.noop;this.init=function(d,e){g=d,this.config=e,g.$render=function(){f.render()},b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){f.itemsPerPage=parseInt(b,10),a.totalPages=f.calculateTotalPages()}):this.itemsPerPage=e.itemsPerPage,a.$watch("totalItems",function(){a.totalPages=f.calculateTotalPages()}),a.$watch("totalPages",function(b){h(a.$parent,b),a.page>b?a.selectPage(b):g.$render()})},this.calculateTotalPages=function(){var b=this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage);return Math.max(b||0,1)},this.render=function(){a.page=parseInt(g.$viewValue,10)||1},a.selectPage=function(b,c){c&&c.preventDefault();var d=!a.ngDisabled||!c;d&&a.page!==b&&b>0&&b<=a.totalPages&&(c&&c.target&&c.target.blur(),g.$setViewValue(b),g.$render())},a.getText=function(b){return a[b+"Text"]||f.config[b+"Text"]},a.noPrevious=function(){return 1===a.page},a.noNext=function(){return a.page===a.totalPages}}]).directive("pagination",["$parse","uibPaginationConfig","$log","$paginationSuppressWarning",function(a,b,c,d){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["pagination","?ngModel"],controller:"PaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"template/pagination/pagination.html"},replace:!0,link:function(e,f,g,h){function i(a,b,c){return{number:a,text:b,active:c}}function j(a,b){var c=[],d=1,e=b,f=angular.isDefined(m)&&b>m;f&&(n?(d=Math.max(a-Math.floor(m/2),1),e=d+m-1,e>b&&(e=b,d=e-m+1)):(d=(Math.ceil(a/m)-1)*m+1,e=Math.min(d+m-1,b)));for(var g=d;e>=g;g++){var h=i(g,g,g===a);c.push(h)}if(f&&!n){if(d>1){var j=i(d-1,"...",!1);c.unshift(j)}if(b>e){var k=i(e+1,"...",!1);c.push(k)}}return c}d||c.warn("pagination is now deprecated. Use uib-pagination instead.");var k=h[0],l=h[1];if(l){var m=angular.isDefined(g.maxSize)?e.$parent.$eval(g.maxSize):b.maxSize,n=angular.isDefined(g.rotate)?e.$parent.$eval(g.rotate):b.rotate;e.boundaryLinks=angular.isDefined(g.boundaryLinks)?e.$parent.$eval(g.boundaryLinks):b.boundaryLinks,e.directionLinks=angular.isDefined(g.directionLinks)?e.$parent.$eval(g.directionLinks):b.directionLinks,k.init(l,b),g.maxSize&&e.$parent.$watch(a(g.maxSize),function(a){m=parseInt(a,10),k.render()});var o=k.render;k.render=function(){o(),e.page>0&&e.page<=e.totalPages&&(e.pages=j(e.page,e.totalPages))}}}}}]).directive("pager",["uibPagerConfig","$log","$paginationSuppressWarning",function(a,b,c){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@",ngDisabled:"="},require:["pager","?ngModel"],controller:"PaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"template/pagination/pager.html"},replace:!0,link:function(d,e,f,g){c||b.warn("pager is now deprecated. Use uib-pager instead.");var h=g[0],i=g[1];i&&(d.align=angular.isDefined(f.align)?d.$parent.$eval(f.align):a.align,h.init(i,a))}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.stackedMap"]).provider("$uibTooltip",function(){function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"top",animation:!0,popupDelay:0,popupCloseDelay:0,useContentExp:!1},c={mouseenter:"mouseleave",click:"click",focus:"blur",none:""},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$document","$uibPosition","$interpolate","$rootScope","$parse","$$stackedMap",function(e,f,g,h,i,j,k,l,m){var n=m.createNew();return h.on("keypress",function(a){if(27===a.which){var b=n.top();b&&(b.value.close(),n.removeTop(),b=null)}}),function(e,k,m,o){function p(a){var b=(a||o.trigger||m).split(" "),d=b.map(function(a){return c[a]||a});return{show:b,hide:d}}o=angular.extend({},b,d,o);var q=a(e),r=j.startSymbol(),s=j.endSymbol(),t="<div "+q+'-popup title="'+r+"title"+s+'" '+(o.useContentExp?'content-exp="contentExp()" ':'content="'+r+"content"+s+'" ')+'placement="'+r+"placement"+s+'" popup-class="'+r+"popupClass"+s+'" animation="animation" is-open="isOpen"origin-scope="origScope" style="visibility: hidden; display: block; top: -9999px; left: -9999px;"></div>';return{compile:function(a,b){var c=f(t);return function(a,b,d,f){function j(){L.isOpen?q():m()}function m(){(!K||a.$eval(d[k+"Enable"]))&&(u(),x(),L.popupDelay?F||(F=g(r,L.popupDelay,!1)):r())}function q(){s(),L.popupCloseDelay?G||(G=g(t,L.popupCloseDelay,!1)):t()}function r(){return s(),u(),L.content?(v(),void L.$evalAsync(function(){L.isOpen=!0,y(!0),Q()})):angular.noop}function s(){F&&(g.cancel(F),F=null),H&&(g.cancel(H),H=null)}function t(){s(),u(),L&&L.$evalAsync(function(){L.isOpen=!1,y(!1),L.animation?E||(E=g(w,150,!1)):w()})}function u(){G&&(g.cancel(G),G=null),E&&(g.cancel(E),E=null)}function v(){C||(D=L.$new(),C=c(D,function(a){I?h.find("body").append(a):b.after(a)}),z())}function w(){A(),E=null,C&&(C.remove(),C=null),D&&(D.$destroy(),D=null)}function x(){L.title=d[k+"Title"],O?L.content=O(a):L.content=d[e],L.popupClass=d[k+"Class"],L.placement=angular.isDefined(d[k+"Placement"])?d[k+"Placement"]:o.placement;var b=parseInt(d[k+"PopupDelay"],10),c=parseInt(d[k+"PopupCloseDelay"],10);L.popupDelay=isNaN(b)?o.popupDelay:b,L.popupCloseDelay=isNaN(c)?o.popupCloseDelay:c}function y(b){N&&angular.isFunction(N.assign)&&N.assign(a,b)}function z(){P.length=0,O?(P.push(a.$watch(O,function(a){L.content=a,!a&&L.isOpen&&t()})),P.push(D.$watch(function(){M||(M=!0,D.$$postDigest(function(){M=!1,L&&L.isOpen&&Q()}))}))):P.push(d.$observe(e,function(a){L.content=a,!a&&L.isOpen?t():Q()})),P.push(d.$observe(k+"Title",function(a){L.title=a,L.isOpen&&Q()})),P.push(d.$observe(k+"Placement",function(a){L.placement=a?a:o.placement,L.isOpen&&Q()}))}function A(){P.length&&(angular.forEach(P,function(a){a()}),P.length=0)}function B(){var a=d[k+"Trigger"];R(),J=p(a),"none"!==J.show&&J.show.forEach(function(a,c){a===J.hide[c]?b[0].addEventListener(a,j):a&&(b[0].addEventListener(a,m),J.hide[c].split(" ").forEach(function(a){b[0].addEventListener(a,q)})),b.on("keypress",function(a){27===a.which&&q()})})}var C,D,E,F,G,H,I=angular.isDefined(o.appendToBody)?o.appendToBody:!1,J=p(void 0),K=angular.isDefined(d[k+"Enable"]),L=a.$new(!0),M=!1,N=angular.isDefined(d[k+"IsOpen"])?l(d[k+"IsOpen"]):!1,O=o.useContentExp?l(d[e]):!1,P=[],Q=function(){C&&C.html()&&(H||(H=g(function(){C.css({top:0,left:0});var a=i.positionElements(b,C,L.placement,I);a.top+="px",a.left+="px",a.visibility="visible",C.css(a),H=null},0,!1)))};L.origScope=a,L.isOpen=!1,n.add(L,{close:t}),L.contentExp=function(){return L.content},d.$observe("disabled",function(a){a&&s(),a&&L.isOpen&&t()}),N&&a.$watch(N,function(a){L&&!a===L.isOpen&&j()});var R=function(){J.show.forEach(function(a){b.unbind(a,m)}),J.hide.forEach(function(a){a.split(" ").forEach(function(a){b[0].removeEventListener(a,q)})})};B();var S=a.$eval(d[k+"Animation"]);L.animation=angular.isDefined(S)?!!S:o.animation;var T=a.$eval(d[k+"AppendToBody"]);I=angular.isDefined(T)?T:I,I&&a.$on("$locationChangeSuccess",function(){L.isOpen&&t()}),a.$on("$destroy",function(){s(),u(),R(),w(),n.remove(L),L=null})}}}}}]}).directive("uibTooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest",function(a,b,c,d){return{link:function(e,f,g){var h,i,j,k=e.$eval(g.tooltipTemplateTranscludeScope),l=0,m=function(){i&&(i.remove(),i=null),h&&(h.$destroy(),h=null),j&&(a.leave(j).then(function(){i=null}),i=j,j=null)};e.$watch(b.parseAsResourceUrl(g.uibTooltipTemplateTransclude),function(b){var g=++l;b?(d(b,!0).then(function(d){if(g===l){var e=k.$new(),i=d,n=c(i)(e,function(b){m(),a.enter(b,f)});h=e,j=n,h.$emit("$includeContentLoaded",b)}},function(){g===l&&(m(),e.$emit("$includeContentError",b))}),e.$emit("$includeContentRequested",b)):m()}),e.$on("$destroy",m)}}}]).directive("uibTooltipClasses",function(){return{restrict:"A",link:function(a,b,c){a.placement&&b.addClass(a.placement),a.popupClass&&b.addClass(a.popupClass),a.animation()&&b.addClass(c.tooltipAnimationClass)}}}).directive("uibTooltipPopup",function(){return{replace:!0,scope:{content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html",link:function(a,b){b.addClass("tooltip")}}}).directive("uibTooltip",["$uibTooltip",function(a){return a("uibTooltip","tooltip","mouseenter")}]).directive("uibTooltipTemplatePopup",function(){return{replace:!0,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"template/tooltip/tooltip-template-popup.html",link:function(a,b){b.addClass("tooltip")}}}).directive("uibTooltipTemplate",["$uibTooltip",function(a){return a("uibTooltipTemplate","tooltip","mouseenter",{useContentExp:!0})}]).directive("uibTooltipHtmlPopup",function(){return{replace:!0,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-popup.html",link:function(a,b){b.addClass("tooltip")}}}).directive("uibTooltipHtml",["$uibTooltip",function(a){return a("uibTooltipHtml","tooltip","mouseenter",{useContentExp:!0})}]),angular.module("ui.bootstrap.tooltip").value("$tooltipSuppressWarning",!1).provider("$tooltip",["$uibTooltipProvider",function(a){angular.extend(this,a),this.$get=["$log","$tooltipSuppressWarning","$injector",function(b,c,d){return c||b.warn("$tooltip is now deprecated. Use $uibTooltip instead."),d.invoke(a.$get)}]}]).directive("tooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest","$log","$tooltipSuppressWarning",function(a,b,c,d,e,f){return{link:function(g,h,i){f||e.warn("tooltip-template-transclude is now deprecated. Use uib-tooltip-template-transclude instead.");var j,k,l,m=g.$eval(i.tooltipTemplateTranscludeScope),n=0,o=function(){k&&(k.remove(),k=null),j&&(j.$destroy(),j=null),l&&(a.leave(l).then(function(){k=null}),k=l,l=null)};g.$watch(b.parseAsResourceUrl(i.tooltipTemplateTransclude),function(b){var e=++n;b?(d(b,!0).then(function(d){if(e===n){var f=m.$new(),g=d,i=c(g)(f,function(b){o(),a.enter(b,h)});j=f,l=i,j.$emit("$includeContentLoaded",b)}},function(){e===n&&(o(),g.$emit("$includeContentError",b))}),g.$emit("$includeContentRequested",b)):o()}),g.$on("$destroy",o)}}}]).directive("tooltipClasses",["$log","$tooltipSuppressWarning",function(a,b){return{restrict:"A",link:function(c,d,e){b||a.warn("tooltip-classes is now deprecated. Use uib-tooltip-classes instead."),c.placement&&d.addClass(c.placement),c.popupClass&&d.addClass(c.popupClass),c.animation()&&d.addClass(e.tooltipAnimationClass)}}}]).directive("tooltipPopup",["$log","$tooltipSuppressWarning",function(a,b){return{replace:!0,scope:{content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html",link:function(c,d){b||a.warn("tooltip-popup is now deprecated. Use uib-tooltip-popup instead."),d.addClass("tooltip")}}}]).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipTemplatePopup",["$log","$tooltipSuppressWarning",function(a,b){return{replace:!0,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"template/tooltip/tooltip-template-popup.html",link:function(c,d){b||a.warn("tooltip-template-popup is now deprecated. Use uib-tooltip-template-popup instead."),d.addClass("tooltip")}}}]).directive("tooltipTemplate",["$tooltip",function(a){return a("tooltipTemplate","tooltip","mouseenter",{useContentExp:!0})}]).directive("tooltipHtmlPopup",["$log","$tooltipSuppressWarning",function(a,b){return{replace:!0,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-popup.html",link:function(c,d){b||a.warn("tooltip-html-popup is now deprecated. Use uib-tooltip-html-popup instead."),d.addClass("tooltip")}}}]).directive("tooltipHtml",["$tooltip",function(a){return a("tooltipHtml","tooltip","mouseenter",{useContentExp:!0})}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup",function(){return{replace:!0,scope:{title:"@",contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"template/popover/popover-template.html",link:function(a,b){b.addClass("popover")}}}).directive("uibPopoverTemplate",["$uibTooltip",function(a){return a("uibPopoverTemplate","popover","click",{useContentExp:!0})}]).directive("uibPopoverHtmlPopup",function(){return{replace:!0,scope:{contentExp:"&",title:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover-html.html",link:function(a,b){b.addClass("popover")}}}).directive("uibPopoverHtml",["$uibTooltip",function(a){return a("uibPopoverHtml","popover","click",{useContentExp:!0})}]).directive("uibPopoverPopup",function(){return{replace:!0,scope:{title:"@",content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html",link:function(a,b){b.addClass("popover")}}}).directive("uibPopover",["$uibTooltip",function(a){return a("uibPopover","popover","click")}]),angular.module("ui.bootstrap.popover").value("$popoverSuppressWarning",!1).directive("popoverTemplatePopup",["$log","$popoverSuppressWarning",function(a,b){return{replace:!0,scope:{title:"@",contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"template/popover/popover-template.html",link:function(c,d){b||a.warn("popover-template-popup is now deprecated. Use uib-popover-template-popup instead."),d.addClass("popover")}}}]).directive("popoverTemplate",["$tooltip",function(a){return a("popoverTemplate","popover","click",{useContentExp:!0})}]).directive("popoverHtmlPopup",["$log","$popoverSuppressWarning",function(a,b){return{replace:!0,scope:{contentExp:"&",title:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover-html.html",link:function(c,d){b||a.warn("popover-html-popup is now deprecated. Use uib-popover-html-popup instead."),d.addClass("popover")}}}]).directive("popoverHtml",["$tooltip",function(a){return a("popoverHtml","popover","click",{useContentExp:!0})}]).directive("popoverPopup",["$log","$popoverSuppressWarning",function(a,b){return{replace:!0,scope:{title:"@",content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html",link:function(c,d){b||a.warn("popover-popup is now deprecated. Use uib-popover-popup instead."),d.addClass("popover")}}}]).directive("popover",["$tooltip",function(a){return a("popover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("uibProgressConfig",{animate:!0,max:100}).controller("UibProgressController",["$scope","$attrs","uibProgressConfig",function(a,b,c){var d=this,e=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=angular.isDefined(a.max)?a.max:c.max,this.addBar=function(b,c,f){e||c.css({transition:"none"}),this.bars.push(b),b.max=a.max,b.title=f&&angular.isDefined(f.title)?f.title:"progressbar",b.$watch("value",function(a){b.recalculatePercentage()}),b.recalculatePercentage=function(){var a=d.bars.reduce(function(a,b){return b.percent=+(100*b.value/b.max).toFixed(2),a+b.percent},0);a>100&&(b.percent-=a-100)},b.$on("$destroy",function(){c=null,d.removeBar(b)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1),this.bars.forEach(function(a){a.recalculatePercentage()})},a.$watch("max",function(b){d.bars.forEach(function(b){b.max=a.max,b.recalculatePercentage()})})}]).directive("uibProgress",function(){return{replace:!0,transclude:!0,controller:"UibProgressController",require:"uibProgress",scope:{max:"=?"},templateUrl:"template/progressbar/progress.html"}}).directive("uibBar",function(){return{replace:!0,transclude:!0,require:"^uibProgress",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b,c)}}}).directive("uibProgressbar",function(){return{replace:!0,transclude:!0,controller:"UibProgressController",scope:{value:"=",max:"=?",type:"@"},templateUrl:"template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]),{title:c.title})}}}),angular.module("ui.bootstrap.progressbar").value("$progressSuppressWarning",!1).controller("ProgressController",["$scope","$attrs","uibProgressConfig","$log","$progressSuppressWarning",function(a,b,c,d,e){e||d.warn("ProgressController is now deprecated. Use UibProgressController instead.");var f=this,g=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=angular.isDefined(a.max)?a.max:c.max,this.addBar=function(b,c,d){g||c.css({transition:"none"}),this.bars.push(b),b.max=a.max,b.title=d&&angular.isDefined(d.title)?d.title:"progressbar",b.$watch("value",function(a){b.recalculatePercentage()}),b.recalculatePercentage=function(){b.percent=+(100*b.value/b.max).toFixed(2);var a=f.bars.reduce(function(a,b){return a+b.percent},0);a>100&&(b.percent-=a-100)},b.$on("$destroy",function(){c=null,f.removeBar(b)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1)},a.$watch("max",function(b){f.bars.forEach(function(b){b.max=a.max,b.recalculatePercentage()})})}]).directive("progress",["$log","$progressSuppressWarning",function(a,b){return{replace:!0,transclude:!0,controller:"ProgressController",require:"progress",scope:{max:"=?",title:"@?"},templateUrl:"template/progressbar/progress.html",link:function(){b||a.warn("progress is now deprecated. Use uib-progress instead.")}}}]).directive("bar",["$log","$progressSuppressWarning",function(a,b){return{replace:!0,transclude:!0,require:"^progress",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/bar.html",link:function(c,d,e,f){b||a.warn("bar is now deprecated. Use uib-bar instead."),f.addBar(c,d)}}}]).directive("progressbar",["$log","$progressSuppressWarning",function(a,b){return{replace:!0,transclude:!0,controller:"ProgressController",scope:{value:"=",max:"=?",type:"@"},templateUrl:"template/progressbar/progressbar.html",link:function(c,d,e,f){b||a.warn("progressbar is now deprecated. Use uib-progressbar instead."),f.addBar(c,angular.element(d.children()[0]),{title:e.title})}}}]),angular.module("ui.bootstrap.rating",[]).constant("uibRatingConfig",{max:5,stateOn:null,stateOff:null,titles:["one","two","three","four","five"]}).controller("UibRatingController",["$scope","$attrs","uibRatingConfig",function(a,b,c){var d={$setViewValue:angular.noop};this.init=function(e){d=e,d.$render=this.render,d.$formatters.push(function(a){return angular.isNumber(a)&&a<<0!==a&&(a=Math.round(a)),a}),this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff;var f=angular.isDefined(b.titles)?a.$parent.$eval(b.titles):c.titles;this.titles=angular.isArray(f)&&f.length>0?f:c.titles;var g=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(g)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff,title:this.getTitle(b)},a[b]);return a},this.getTitle=function(a){return a>=this.titles.length?a+1:this.titles[a]},a.rate=function(b){!a.readonly&&b>=0&&b<=a.range.length&&(d.$setViewValue(d.$viewValue===b?0:b),d.$render())},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue}}]).directive("uibRating",function(){return{require:["uibRating","ngModel"],scope:{readonly:"=?",onHover:"&",onLeave:"&"},controller:"UibRatingController",templateUrl:"template/rating/rating.html",replace:!0,link:function(a,b,c,d){var e=d[0],f=d[1];e.init(f)}}}),angular.module("ui.bootstrap.rating").value("$ratingSuppressWarning",!1).controller("RatingController",["$scope","$attrs","$controller","$log","$ratingSuppressWarning",function(a,b,c,d,e){e||d.warn("RatingController is now deprecated. Use UibRatingController instead."),angular.extend(this,c("UibRatingController",{$scope:a,$attrs:b}))}]).directive("rating",["$log","$ratingSuppressWarning",function(a,b){return{require:["rating","ngModel"],scope:{readonly:"=?",onHover:"&",onLeave:"&"},controller:"RatingController",templateUrl:"template/rating/rating.html",replace:!0,link:function(c,d,e,f){b||a.warn("rating is now deprecated. Use uib-rating instead.");var g=f[0],h=f[1];g.init(h)}}}]),angular.module("ui.bootstrap.tabs",[]).controller("UibTabsetController",["$scope",function(a){var b=this,c=b.tabs=a.tabs=[];b.select=function(a){angular.forEach(c,function(b){b.active&&b!==a&&(b.active=!1,b.onDeselect(),a.selectCalled=!1)}),a.active=!0,a.selectCalled||(a.onSelect(),a.selectCalled=!0)},b.addTab=function(a){c.push(a),1===c.length&&a.active!==!1?a.active=!0:a.active?b.select(a):a.active=!1},b.removeTab=function(a){var e=c.indexOf(a);if(a.active&&c.length>1&&!d){var f=e==c.length-1?e-1:e+1;b.select(c[f])}c.splice(e,1)};var d;a.$on("$destroy",function(){d=!0})}]).directive("uibTabset",function(){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"UibTabsetController",templateUrl:"template/tabs/tabset.html",link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("uibTab",["$parse",function(a){return{require:"^uibTabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",heading:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},link:function(b,c,d,e,f){b.$watch("active",function(a){a&&e.select(b)}),b.disabled=!1,d.disable&&b.$parent.$watch(a(d.disable),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},e.addTab(b),b.$on("$destroy",function(){e.removeTab(b)}),b.$transcludeFn=f}}}]).directive("uibTabHeadingTransclude",function(){return{restrict:"A",require:["?^uibTab","?^tab"],link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}).directive("uibTabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||a.hasAttribute("x-tab-heading")||a.hasAttribute("uib-tab-heading")||a.hasAttribute("data-uib-tab-heading")||a.hasAttribute("x-uib-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase()||"x-tab-heading"===a.tagName.toLowerCase()||"uib-tab-heading"===a.tagName.toLowerCase()||"data-uib-tab-heading"===a.tagName.toLowerCase()||"x-uib-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:["?^uibTabset","?^tabset"],link:function(b,c,d){var e=b.$eval(d.uibTabContentTransclude);e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.tabs").value("$tabsSuppressWarning",!1).controller("TabsetController",["$scope","$controller","$log","$tabsSuppressWarning",function(a,b,c,d){d||c.warn("TabsetController is now deprecated. Use UibTabsetController instead."),angular.extend(this,b("UibTabsetController",{$scope:a}))}]).directive("tabset",["$log","$tabsSuppressWarning",function(a,b){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",link:function(c,d,e){b||a.warn("tabset is now deprecated. Use uib-tabset instead."),c.vertical=angular.isDefined(e.vertical)?c.$parent.$eval(e.vertical):!1,c.justified=angular.isDefined(e.justified)?c.$parent.$eval(e.justified):!1}}}]).directive("tab",["$parse","$log","$tabsSuppressWarning",function(a,b,c){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",heading:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},link:function(d,e,f,g,h){c||b.warn("tab is now deprecated. Use uib-tab instead."),d.$watch("active",function(a){a&&g.select(d)}),d.disabled=!1,f.disable&&d.$parent.$watch(a(f.disable),function(a){d.disabled=!!a}),d.select=function(){d.disabled||(d.active=!0)},g.addTab(d),d.$on("$destroy",function(){g.removeTab(d)}),d.$transcludeFn=h}}}]).directive("tabHeadingTransclude",["$log","$tabsSuppressWarning",function(a,b){return{restrict:"A",require:"^tab",link:function(c,d){b||a.warn("tab-heading-transclude is now deprecated. Use uib-tab-heading-transclude instead."),c.$watch("headingElement",function(a){a&&(d.html(""),d.append(a))})}}}]).directive("tabContentTransclude",["$log","$tabsSuppressWarning",function(a,b){function c(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||a.hasAttribute("x-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase()||"x-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^tabset",link:function(d,e,f){b||a.warn("tab-content-transclude is now deprecated. Use uib-tab-content-transclude instead.");var g=d.$eval(f.tabContentTransclude);g.$transcludeFn(g.$parent,function(a){angular.forEach(a,function(a){c(a)?g.headingElement=a:e.append(a)})})}}}]),angular.module("ui.bootstrap.timepicker",[]).constant("uibTimepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:null,readonlyInput:!1,mousewheel:!0,arrowkeys:!0,showSpinners:!0}).controller("UibTimepickerController",["$scope","$element","$attrs","$parse","$log","$locale","uibTimepickerConfig",function(a,b,c,d,e,f,g){function h(){var b=parseInt(a.hours,10),c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c?(a.showMeridian&&(12===b&&(b=0),a.meridian===r[1]&&(b+=12)),b):void 0}function i(){var b=parseInt(a.minutes,10);return b>=0&&60>b?b:void 0}function j(a){return angular.isDefined(a)&&a.toString().length<2?"0"+a:a.toString()}function k(a){l(),q.$setViewValue(new Date(p)),m(a)}function l(){q.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1}function m(b){var c=p.getHours(),d=p.getMinutes();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:j(c),"m"!==b&&(a.minutes=j(d)),a.meridian=p.getHours()<12?r[0]:r[1]}function n(a,b){var c=new Date(a.getTime()+6e4*b),d=new Date(a);return d.setHours(c.getHours(),c.getMinutes()),d}function o(a){p=n(p,a),k()}var p=new Date,q={$setViewValue:angular.noop},r=angular.isDefined(c.meridians)?a.$parent.$eval(c.meridians):g.meridians||f.DATETIME_FORMATS.AMPMS;a.tabindex=angular.isDefined(c.tabindex)?c.tabindex:0,b.removeAttr("tabindex"),this.init=function(b,d){q=b,q.$render=this.render,q.$formatters.unshift(function(a){return a?new Date(a):null});var e=d.eq(0),f=d.eq(1),h=angular.isDefined(c.mousewheel)?a.$parent.$eval(c.mousewheel):g.mousewheel;h&&this.setupMousewheelEvents(e,f);var i=angular.isDefined(c.arrowkeys)?a.$parent.$eval(c.arrowkeys):g.arrowkeys;i&&this.setupArrowkeyEvents(e,f),a.readonlyInput=angular.isDefined(c.readonlyInput)?a.$parent.$eval(c.readonlyInput):g.readonlyInput,this.setupInputEvents(e,f)};var s=g.hourStep;c.hourStep&&a.$parent.$watch(d(c.hourStep),function(a){s=parseInt(a,10)});var t=g.minuteStep;c.minuteStep&&a.$parent.$watch(d(c.minuteStep),function(a){t=parseInt(a,10)});var u;a.$parent.$watch(d(c.min),function(a){var b=new Date(a);u=isNaN(b)?void 0:b});var v;a.$parent.$watch(d(c.max),function(a){var b=new Date(a);v=isNaN(b)?void 0:b}),a.noIncrementHours=function(){var a=n(p,60*s);
return a>v||p>a&&u>a},a.noDecrementHours=function(){var a=n(p,60*-s);return u>a||a>p&&a>v},a.noIncrementMinutes=function(){var a=n(p,t);return a>v||p>a&&u>a},a.noDecrementMinutes=function(){var a=n(p,-t);return u>a||a>p&&a>v},a.noToggleMeridian=function(){return p.getHours()<13?n(p,720)>v:n(p,-720)<u},a.showMeridian=g.showMeridian,c.showMeridian&&a.$parent.$watch(d(c.showMeridian),function(b){if(a.showMeridian=!!b,q.$error.time){var c=h(),d=i();angular.isDefined(c)&&angular.isDefined(d)&&(p.setHours(c),k())}else m()}),this.setupMousewheelEvents=function(b,c){var d=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()})},this.setupArrowkeyEvents=function(b,c){b.bind("keydown",function(b){38===b.which?(b.preventDefault(),a.incrementHours(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementHours(),a.$apply())}),c.bind("keydown",function(b){38===b.which?(b.preventDefault(),a.incrementMinutes(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementMinutes(),a.$apply())})},this.setupInputEvents=function(b,c){if(a.readonlyInput)return a.updateHours=angular.noop,void(a.updateMinutes=angular.noop);var d=function(b,c){q.$setViewValue(null),q.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b),angular.isDefined(c)&&(a.invalidMinutes=c)};a.updateHours=function(){var a=h(),b=i();angular.isDefined(a)&&angular.isDefined(b)?(p.setHours(a),u>p||p>v?d(!0):k("h")):d(!0)},b.bind("blur",function(b){!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=j(a.hours)})}),a.updateMinutes=function(){var a=i(),b=h();angular.isDefined(a)&&angular.isDefined(b)?(p.setMinutes(a),u>p||p>v?d(void 0,!0):k("m")):d(void 0,!0)},c.bind("blur",function(b){!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=j(a.minutes)})})},this.render=function(){var b=q.$viewValue;isNaN(b)?(q.$setValidity("time",!1),e.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(b&&(p=b),u>p||p>v?(q.$setValidity("time",!1),a.invalidHours=!0,a.invalidMinutes=!0):l(),m())},a.showSpinners=angular.isDefined(c.showSpinners)?a.$parent.$eval(c.showSpinners):g.showSpinners,a.incrementHours=function(){a.noIncrementHours()||o(60*s)},a.decrementHours=function(){a.noDecrementHours()||o(60*-s)},a.incrementMinutes=function(){a.noIncrementMinutes()||o(t)},a.decrementMinutes=function(){a.noDecrementMinutes()||o(-t)},a.toggleMeridian=function(){a.noToggleMeridian()||o(720*(p.getHours()<12?1:-1))}}]).directive("uibTimepicker",function(){return{restrict:"EA",require:["uibTimepicker","?^ngModel"],controller:"UibTimepickerController",controllerAs:"timepicker",replace:!0,scope:{},templateUrl:function(a,b){return b.templateUrl||"template/timepicker/timepicker.html"},link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}),angular.module("ui.bootstrap.timepicker").value("$timepickerSuppressWarning",!1).controller("TimepickerController",["$scope","$element","$attrs","$controller","$log","$timepickerSuppressWarning",function(a,b,c,d,e,f){f||e.warn("TimepickerController is now deprecated. Use UibTimepickerController instead."),angular.extend(this,d("UibTimepickerController",{$scope:a,$element:b,$attrs:c}))}]).directive("timepicker",["$log","$timepickerSuppressWarning",function(a,b){return{restrict:"EA",require:["timepicker","?^ngModel"],controller:"TimepickerController",controllerAs:"timepicker",replace:!0,scope:{},templateUrl:function(a,b){return b.templateUrl||"template/timepicker/timepicker.html"},link:function(c,d,e,f){b||a.warn("timepicker is now deprecated. Use uib-timepicker instead.");var g=f[0],h=f[1];h&&g.init(h,d.find("input"))}}}]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position"]).factory("uibTypeaheadParser",["$parse",function(a){var b=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).controller("UibTypeaheadController",["$scope","$element","$attrs","$compile","$parse","$q","$timeout","$document","$window","$rootScope","$uibPosition","uibTypeaheadParser",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(){K.moveInProgress||(K.moveInProgress=!0,K.$digest()),S&&g.cancel(S),S=g(function(){K.matches.length&&n(),K.moveInProgress=!1},r)}function n(){K.position=C?k.offset(b):k.position(b),K.position.top+=b.prop("offsetHeight")}var o,p,q=[9,13,27,38,40],r=200,s=a.$eval(c.typeaheadMinLength);s||0===s||(s=1);var t,u,v=a.$eval(c.typeaheadWaitMs)||0,w=a.$eval(c.typeaheadEditable)!==!1,x=e(c.typeaheadLoading).assign||angular.noop,y=e(c.typeaheadOnSelect),z=angular.isDefined(c.typeaheadSelectOnBlur)?a.$eval(c.typeaheadSelectOnBlur):!1,A=e(c.typeaheadNoResults).assign||angular.noop,B=c.typeaheadInputFormatter?e(c.typeaheadInputFormatter):void 0,C=c.typeaheadAppendToBody?a.$eval(c.typeaheadAppendToBody):!1,D=c.typeaheadAppendToElementId||!1,E=a.$eval(c.typeaheadFocusFirst)!==!1,F=c.typeaheadSelectOnExact?a.$eval(c.typeaheadSelectOnExact):!1,G=e(c.ngModel),H=e(c.ngModel+"($$$p)"),I=function(b,c){return angular.isFunction(G(a))&&p&&p.$options&&p.$options.getterSetter?H(b,{$$$p:c}):G.assign(b,c)},J=l.parse(c.uibTypeahead),K=a.$new(),L=a.$on("$destroy",function(){K.$destroy()});K.$on("$destroy",L);var M="typeahead-"+K.$id+"-"+Math.floor(1e4*Math.random());b.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":M});var N=angular.element("<div uib-typeahead-popup></div>");N.attr({id:M,matches:"matches",active:"activeIdx",select:"select(activeIdx)","move-in-progress":"moveInProgress",query:"query",position:"position"}),angular.isDefined(c.typeaheadTemplateUrl)&&N.attr("template-url",c.typeaheadTemplateUrl),angular.isDefined(c.typeaheadPopupTemplateUrl)&&N.attr("popup-template-url",c.typeaheadPopupTemplateUrl);var O=function(){K.matches=[],K.activeIdx=-1,b.attr("aria-expanded",!1)},P=function(a){return M+"-option-"+a};K.$watch("activeIdx",function(a){0>a?b.removeAttr("aria-activedescendant"):b.attr("aria-activedescendant",P(a))});var Q=function(a,b){return K.matches.length>b&&a?a.toUpperCase()===K.matches[b].label.toUpperCase():!1},R=function(c){var d={$viewValue:c};x(a,!0),A(a,!1),f.when(J.source(a,d)).then(function(e){var f=c===o.$viewValue;if(f&&t)if(e&&e.length>0){K.activeIdx=E?0:-1,A(a,!1),K.matches.length=0;for(var g=0;g<e.length;g++)d[J.itemName]=e[g],K.matches.push({id:P(g),label:J.viewMapper(K,d),model:e[g]});K.query=c,n(),b.attr("aria-expanded",!0),F&&1===K.matches.length&&Q(c,0)&&K.select(0)}else O(),A(a,!0);f&&x(a,!1)},function(){O(),x(a,!1),A(a,!0)})};C&&(angular.element(i).bind("resize",m),h.find("body").bind("scroll",m));var S;K.moveInProgress=!1,K.query=void 0;var T,U=function(a){T=g(function(){R(a)},v)},V=function(){T&&g.cancel(T)};O(),K.select=function(d){var e,f,h={};u=!0,h[J.itemName]=f=K.matches[d].model,e=J.modelMapper(a,h),I(a,e),o.$setValidity("editable",!0),o.$setValidity("parse",!0),y(a,{$item:f,$model:e,$label:J.viewMapper(a,h)}),O(),K.$eval(c.typeaheadFocusOnSelect)!==!1&&g(function(){b[0].focus()},0,!1)},b.bind("keydown",function(a){if(0!==K.matches.length&&-1!==q.indexOf(a.which)){if(-1===K.activeIdx&&(9===a.which||13===a.which))return O(),void K.$digest();a.preventDefault(),40===a.which?(K.activeIdx=(K.activeIdx+1)%K.matches.length,K.$digest()):38===a.which?(K.activeIdx=(K.activeIdx>0?K.activeIdx:K.matches.length)-1,K.$digest()):13===a.which||9===a.which?K.$apply(function(){K.select(K.activeIdx)}):27===a.which&&(a.stopPropagation(),O(),K.$digest())}}),b.bind("blur",function(){z&&K.matches.length&&-1!==K.activeIdx&&!u&&(u=!0,K.$apply(function(){K.select(K.activeIdx)})),t=!1,u=!1});var W=function(a){b[0]!==a.target&&3!==a.which&&0!==K.matches.length&&(O(),j.$$phase||K.$digest())};h.bind("click",W),a.$on("$destroy",function(){h.unbind("click",W),(C||D)&&X.remove(),C&&(angular.element(i).unbind("resize",m),h.find("body").unbind("scroll",m)),N.remove()});var X=d(N)(K);C?h.find("body").append(X):D!==!1?angular.element(h[0].getElementById(D)).append(X):b.after(X),this.init=function(b,c){o=b,p=c,o.$parsers.unshift(function(b){return t=!0,0===s||b&&b.length>=s?v>0?(V(),U(b)):R(b):(x(a,!1),V(),O()),w?b:b?void o.$setValidity("editable",!1):(o.$setValidity("editable",!0),null)}),o.$formatters.push(function(b){var c,d,e={};return w||o.$setValidity("editable",!0),B?(e.$model=b,B(a,e)):(e[J.itemName]=b,c=J.viewMapper(a,e),e[J.itemName]=void 0,d=J.viewMapper(a,e),c!==d?c:b)})}}]).directive("uibTypeahead",function(){return{controller:"UibTypeaheadController",require:["ngModel","^?ngModelOptions","uibTypeahead"],link:function(a,b,c,d){d[2].init(d[0],d[1])}}}).directive("uibTypeaheadPopup",function(){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&"},replace:!0,templateUrl:function(a,b){return b.popupTemplateUrl||"template/typeahead/typeahead-popup.html"},link:function(a,b,c){a.templateUrl=c.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(b){return a.active==b},a.selectActive=function(b){a.active=b},a.selectMatch=function(b){a.select({activeIdx:b})}}}}).directive("uibTypeaheadMatch",["$templateRequest","$compile","$parse",function(a,b,c){return{scope:{index:"=",match:"=",query:"="},link:function(d,e,f){var g=c(f.templateUrl)(d.$parent)||"template/typeahead/typeahead-match.html";a(g).then(function(a){b(a.trim())(d,function(a){e.replaceWith(a)})})}}}]).filter("uibTypeaheadHighlight",["$sce","$injector","$log",function(a,b,c){function d(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function e(a){return/<.*>/g.test(a)}var f;return f=b.has("$sanitize"),function(b,g){return!f&&e(b)&&c.warn("Unsafe use of typeahead please use ngSanitize"),b=g?(""+b).replace(new RegExp(d(g),"gi"),"<strong>$&</strong>"):b,f||(b=a.trustAsHtml(b)),b}}]),angular.module("ui.bootstrap.typeahead").value("$typeaheadSuppressWarning",!1).service("typeaheadParser",["$parse","uibTypeaheadParser","$log","$typeaheadSuppressWarning",function(a,b,c,d){return d||c.warn("typeaheadParser is now deprecated. Use uibTypeaheadParser instead."),b}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$window","$rootScope","$uibPosition","typeaheadParser","$log","$typeaheadSuppressWarning",function(a,b,c,d,e,f,g,h,i,j,k){var l=[9,13,27,38,40],m=200;return{require:["ngModel","^?ngModelOptions"],link:function(n,o,p,q){function r(){N.moveInProgress||(N.moveInProgress=!0,N.$digest()),V&&d.cancel(V),V=d(function(){N.matches.length&&s(),N.moveInProgress=!1},m)}function s(){N.position=F?h.offset(o):h.position(o),N.position.top+=o.prop("offsetHeight")}k||j.warn("typeahead is now deprecated. Use uib-typeahead instead.");var t=q[0],u=q[1],v=n.$eval(p.typeaheadMinLength);v||0===v||(v=1);var w,x,y=n.$eval(p.typeaheadWaitMs)||0,z=n.$eval(p.typeaheadEditable)!==!1,A=b(p.typeaheadLoading).assign||angular.noop,B=b(p.typeaheadOnSelect),C=angular.isDefined(p.typeaheadSelectOnBlur)?n.$eval(p.typeaheadSelectOnBlur):!1,D=b(p.typeaheadNoResults).assign||angular.noop,E=p.typeaheadInputFormatter?b(p.typeaheadInputFormatter):void 0,F=p.typeaheadAppendToBody?n.$eval(p.typeaheadAppendToBody):!1,G=p.typeaheadAppendToElementId||!1,H=n.$eval(p.typeaheadFocusFirst)!==!1,I=p.typeaheadSelectOnExact?n.$eval(p.typeaheadSelectOnExact):!1,J=b(p.ngModel),K=b(p.ngModel+"($$$p)"),L=function(a,b){return angular.isFunction(J(n))&&u&&u.$options&&u.$options.getterSetter?K(a,{$$$p:b}):J.assign(a,b)},M=i.parse(p.typeahead),N=n.$new(),O=n.$on("$destroy",function(){N.$destroy()});N.$on("$destroy",O);var P="typeahead-"+N.$id+"-"+Math.floor(1e4*Math.random());o.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":P});var Q=angular.element("<div typeahead-popup></div>");Q.attr({id:P,matches:"matches",active:"activeIdx",select:"select(activeIdx)","move-in-progress":"moveInProgress",query:"query",position:"position"}),angular.isDefined(p.typeaheadTemplateUrl)&&Q.attr("template-url",p.typeaheadTemplateUrl),angular.isDefined(p.typeaheadPopupTemplateUrl)&&Q.attr("popup-template-url",p.typeaheadPopupTemplateUrl);var R=function(){N.matches=[],N.activeIdx=-1,o.attr("aria-expanded",!1)},S=function(a){return P+"-option-"+a};N.$watch("activeIdx",function(a){0>a?o.removeAttr("aria-activedescendant"):o.attr("aria-activedescendant",S(a))});var T=function(a,b){return N.matches.length>b&&a?a.toUpperCase()===N.matches[b].label.toUpperCase():!1},U=function(a){var b={$viewValue:a};A(n,!0),D(n,!1),c.when(M.source(n,b)).then(function(c){var d=a===t.$viewValue;if(d&&w)if(c&&c.length>0){N.activeIdx=H?0:-1,D(n,!1),N.matches.length=0;for(var e=0;e<c.length;e++)b[M.itemName]=c[e],N.matches.push({id:S(e),label:M.viewMapper(N,b),model:c[e]});N.query=a,s(),o.attr("aria-expanded",!0),I&&1===N.matches.length&&T(a,0)&&N.select(0)}else R(),D(n,!0);d&&A(n,!1)},function(){R(),A(n,!1),D(n,!0)})};F&&(angular.element(f).bind("resize",r),e.find("body").bind("scroll",r));var V;N.moveInProgress=!1,R(),N.query=void 0;var W,X=function(a){W=d(function(){U(a)},y)},Y=function(){W&&d.cancel(W)};t.$parsers.unshift(function(a){return w=!0,0===v||a&&a.length>=v?y>0?(Y(),X(a)):U(a):(A(n,!1),Y(),R()),z?a:a?void t.$setValidity("editable",!1):(t.$setValidity("editable",!0),null)}),t.$formatters.push(function(a){var b,c,d={};return z||t.$setValidity("editable",!0),E?(d.$model=a,E(n,d)):(d[M.itemName]=a,b=M.viewMapper(n,d),d[M.itemName]=void 0,c=M.viewMapper(n,d),b!==c?b:a)}),N.select=function(a){var b,c,e={};x=!0,e[M.itemName]=c=N.matches[a].model,b=M.modelMapper(n,e),L(n,b),t.$setValidity("editable",!0),t.$setValidity("parse",!0),B(n,{$item:c,$model:b,$label:M.viewMapper(n,e)}),R(),N.$eval(p.typeaheadFocusOnSelect)!==!1&&d(function(){o[0].focus()},0,!1)},o.bind("keydown",function(a){if(0!==N.matches.length&&-1!==l.indexOf(a.which)){if(-1===N.activeIdx&&(9===a.which||13===a.which))return R(),void N.$digest();a.preventDefault(),40===a.which?(N.activeIdx=(N.activeIdx+1)%N.matches.length,N.$digest()):38===a.which?(N.activeIdx=(N.activeIdx>0?N.activeIdx:N.matches.length)-1,N.$digest()):13===a.which||9===a.which?N.$apply(function(){N.select(N.activeIdx)}):27===a.which&&(a.stopPropagation(),R(),N.$digest())}}),o.bind("blur",function(){C&&N.matches.length&&-1!==N.activeIdx&&!x&&(x=!0,N.$apply(function(){N.select(N.activeIdx)})),w=!1,x=!1});var Z=function(a){o[0]!==a.target&&3!==a.which&&0!==N.matches.length&&(R(),g.$$phase||N.$digest())};e.bind("click",Z),n.$on("$destroy",function(){e.unbind("click",Z),(F||G)&&$.remove(),F&&(angular.element(f).unbind("resize",r),e.find("body").unbind("scroll",r)),Q.remove()});var $=a(Q)(N);F?e.find("body").append($):G!==!1?angular.element(e[0].getElementById(G)).append($):o.after($)}}}]).directive("typeaheadPopup",["$typeaheadSuppressWarning","$log",function(a,b){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&"},replace:!0,templateUrl:function(a,b){return b.popupTemplateUrl||"template/typeahead/typeahead-popup.html"},link:function(c,d,e){a||b.warn("typeahead-popup is now deprecated. Use uib-typeahead-popup instead."),c.templateUrl=e.templateUrl,c.isOpen=function(){return c.matches.length>0},c.isActive=function(a){return c.active==a},c.selectActive=function(a){c.active=a},c.selectMatch=function(a){c.select({activeIdx:a})}}}}]).directive("typeaheadMatch",["$templateRequest","$compile","$parse","$typeaheadSuppressWarning","$log",function(a,b,c,d,e){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(f,g,h){d||e.warn("typeahead-match is now deprecated. Use uib-typeahead-match instead.");var i=c(h.templateUrl)(f.$parent)||"template/typeahead/typeahead-match.html";a(i).then(function(a){b(a.trim())(f,function(a){g.replaceWith(a)})})}}}]).filter("typeaheadHighlight",["$sce","$injector","$log","$typeaheadSuppressWarning",function(a,b,c,d){function e(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function f(a){return/<.*>/g.test(a)}var g;return g=b.has("$sanitize"),function(b,h){return d||c.warn("typeaheadHighlight is now deprecated. Use uibTypeaheadHighlight instead."),!g&&f(b)&&c.warn("Unsafe use of typeahead please use ngSanitize"),b=h?(""+b).replace(new RegExp(e(h),"gi"),"<strong>$&</strong>"):b,g||(b=a.trustAsHtml(b)),b}}]),angular.module("template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion-group.html",'<div class="panel {{panelClass || \'panel-default\'}}">\n  <div class="panel-heading" ng-keypress="toggleOpen($event)">\n    <h4 class="panel-title">\n      <a href tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse collapse" uib-collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')}]),angular.module("template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion.html",'<div class="panel-group" ng-transclude></div>')}]),angular.module("template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("template/alert/alert.html",'<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissible\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')}]),angular.module("template/carousel/carousel.html",[]).run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n  <div class="carousel-inner" ng-transclude></div>\n  <a role="button" href class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n    <span class="sr-only">previous</span>\n  </a>\n  <a role="button" href class="right carousel-control" ng-click="next()" ng-show="slides.length > 1">\n    <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n    <span class="sr-only">next</span>\n  </a>\n  <ol class="carousel-indicators" ng-show="slides.length > 1">\n    <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n      <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n    </li>\n  </ol>\n</div>')}]),angular.module("template/carousel/slide.html",[]).run(["$templateCache",function(a){a.put("template/carousel/slide.html",'<div ng-class="{\n    \'active\': active\n  }" class="item text-center" ng-transclude></div>\n')}]),angular.module("template/datepicker/datepicker.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/datepicker.html",'<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <uib-daypicker ng-switch-when="day" tabindex="0"></uib-daypicker>\n  <uib-monthpicker ng-switch-when="month" tabindex="0"></uib-monthpicker>\n  <uib-yearpicker ng-switch-when="year" tabindex="0"></uib-yearpicker>\n</div>')}]),angular.module("template/datepicker/day.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/day.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/month.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/month.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/popup.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/popup.html",'<ul class="dropdown-menu" dropdown-nested ng-if="isOpen" style="display: block" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')}]),angular.module("template/datepicker/year.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/year.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n        <button type="button" style="min-width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(a){a.put("template/modal/backdrop.html",'<div uib-modal-animation-class="fade"\n     modal-in-class="in"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(a){a.put("template/modal/window.html",'<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n    uib-modal-animation-class="fade"\n    modal-in-class="in"\n    ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">\n    <div class="modal-dialog" ng-class="size ? \'modal-\' + size : \'\'"><div class="modal-content" uib-modal-transclude></div></div>\n</div>\n')}]),angular.module("template/pagination/pager.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pager.html",'<ul class="pager">\n  <li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n</ul>\n')}]),angular.module("template/pagination/pagination.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pagination.html",'<ul class="pagination">\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)">{{::getText(\'first\')}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)">{{::getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)">{{page.text}}</a></li>\n  <li ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)">{{::getText(\'next\')}}</a></li>\n  <li ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)">{{::getText(\'last\')}}</a></li>\n</ul>\n')}]),angular.module("template/tooltip/tooltip-html-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-html-popup.html",'<div\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n</div>\n')}]),angular.module("template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-popup.html",'<div\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')}]),angular.module("template/tooltip/tooltip-template-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-template-popup.html",'<div\n  tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner"\n    uib-tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')}]),angular.module("template/popover/popover-html.html",[]).run(["$templateCache",function(a){a.put("template/popover/popover-html.html",'<div tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind-html="contentExp()"></div>\n  </div>\n</div>\n')}]),angular.module("template/popover/popover-template.html",[]).run(["$templateCache",function(a){a.put("template/popover/popover-template.html",'<div tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content"\n        uib-tooltip-template-transclude="contentExp()"\n        tooltip-template-transclude-scope="originScope()"></div>\n  </div>\n</div>\n')}]),angular.module("template/popover/popover.html",[]).run(["$templateCache",function(a){a.put("template/popover/popover.html",'<div tooltip-animation-class="fade"\n  uib-tooltip-classes\n  ng-class="{ in: isOpen() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-if="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')}]),angular.module("template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" style="min-width: 0;" ng-transclude></div>\n')}]),angular.module("template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progress.html",'<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>')}]),angular.module("template/progressbar/progressbar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" style="min-width: 0;" ng-transclude></div>\n</div>\n')}]),angular.module("template/rating/rating.html",[]).run(["$templateCache",function(a){a.put("template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}" aria-valuetext="{{r.title}}"></i>\n</span>\n');
}]),angular.module("template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tab.html",'<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n')}]),angular.module("template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset.html",'<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("template/timepicker/timepicker.html",'<table>\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group" ng-class="{\'has-error\': invalidHours}">\n        <input style="width:50px;" type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}">\n      </td>\n      <td>:</td>\n      <td class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n        <input style="width:50px;" type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}">\n      </td>\n      <td ng-show="showMeridian"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="{{::tabindex}}"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-match.html",'<a href tabindex="-1" ng-bind-html="match.label | uibTypeaheadHighlight:query"></a>\n')}]),angular.module("template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')}]),!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>');
angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('DatepickerDemoCtrl', function ($scope) {

  $scope.today = function() {
    $scope.dt = new Date();
    
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    //$scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
});
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*
 AngularJS v1.5.0-build.4489+sha.16ccac9
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(A,q,Wa){'use strict';function za(a,b,c){if(!a)throw La("areq",b||"?",c||"required");return a}function Aa(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;aa(a)&&(a=a.join(" "));aa(b)&&(b=b.join(" "));return a+" "+b}function Ma(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function W(a,b,c){var d="";a=aa(a)?a:a&&Q(a)&&a.length?a.split(/\s+/):[];r(a,function(a,l){a&&0<a.length&&(d+=0<l?" ":"",d+=c?b+a:a+b)});return d}function Na(a){if(a instanceof I)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return I(pa(a))}if(1===a.nodeType)return I(a)}function pa(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Oa(a,b,c){r(b,function(b){a.addClass(b,c)})}function Pa(a,b,c){r(b,function(b){a.removeClass(b,c)})}function T(a){return function(b,c){c.addClass&&(Oa(a,b,c.addClass),c.addClass=null);c.removeClass&&(Pa(a,b,c.removeClass),c.removeClass=null)}}function la(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
P;a.domOperation=function(){a.$$domOperationFired=!0;b();b=P};a.$$prepared=!0}return a}function fa(a,b){Ba(a,b);Ca(a,b)}function Ba(a,b){b.from&&(a.css(b.from),b.from=null)}function Ca(a,b){b.to&&(a.css(b.to),b.to=null)}function U(a,b,c){var d=(b.addClass||"")+" "+(c.addClass||""),g=(b.removeClass||"")+" "+(c.removeClass||"");a=Qa(a.attr("class"),d,g);c.preparationClasses&&(b.preparationClasses=ba(c.preparationClasses,b.preparationClasses),delete c.preparationClasses);d=b.domOperation!==P?b.domOperation:
null;Da(b,c);d&&(b.domOperation=d);b.addClass=a.addClass?a.addClass:null;b.removeClass=a.removeClass?a.removeClass:null;return b}function Qa(a,b,c){function d(a){Q(a)&&(a=a.split(" "));var b={};r(a,function(a){a.length&&(b[a]=!0)});return b}var g={};a=d(a);b=d(b);r(b,function(a,b){g[b]=1});c=d(c);r(c,function(a,b){g[b]=1===g[b]?null:-1});var l={addClass:"",removeClass:""};r(g,function(b,c){var d,g;1===b?(d="addClass",g=!a[c]):-1===b&&(d="removeClass",g=a[c]);g&&(l[d].length&&(l[d]+=" "),l[d]+=c)});
return l}function F(a){return a instanceof q.element?a[0]:a}function Ra(a,b,c){var d="";b&&(d=W(b,"ng-",!0));c.addClass&&(d=ba(d,W(c.addClass,"-add")));c.removeClass&&(d=ba(d,W(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function ma(a,b){var c=b?"-"+b+"s":"";ia(a,[ja,c]);return[ja,c]}function qa(a,b){var c=b?"paused":"",d=X+"PlayState";ia(a,[d,c]);return[d,c]}function ia(a,b){a.style[b[0]]=b[1]}function ba(a,b){return a?b?a+" "+b:a:b}function Ea(a,b,c){var d=Object.create(null),
g=a.getComputedStyle(b)||{};r(c,function(a,b){var c=g[a];if(c){var u=c.charAt(0);if("-"===u||"+"===u||0<=u)c=Sa(c);0===c&&(c=null);d[b]=c}});return d}function Sa(a){var b=0;a=a.split(/\s*,\s*/);r(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function ra(a){return 0===a||null!=a}function Fa(a,b){var c=R,d=a+"s";b?c+="Duration":d+=" linear all";return[c,d]}function Ga(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},
count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Ha(a,b,c){r(c,function(c){a[c]=Y(a[c])?a[c]:b.style.getPropertyValue(c)})}var P=q.noop,Ia=q.copy,Da=q.extend,I=q.element,r=q.forEach,aa=q.isArray,Q=q.isString,sa=q.isObject,O=q.isUndefined,Y=q.isDefined,Ja=q.isFunction,ta=q.isElement,R,ua,X,va;O(A.ontransitionend)&&Y(A.onwebkittransitionend)?(R="WebkitTransition",ua="webkitTransitionEnd transitionend"):
(R="transition",ua="transitionend");O(A.onanimationend)&&Y(A.onwebkitanimationend)?(X="WebkitAnimation",va="webkitAnimationEnd animationend"):(X="animation",va="animationend");var na=X+"Delay",wa=X+"Duration",ja=R+"Delay";A=R+"Duration";var La=q.$$minErr("ng"),Ta={transitionDuration:A,transitionDelay:ja,transitionProperty:R+"Property",animationDuration:wa,animationDelay:na,animationIterationCount:X+"IterationCount"},Ua={transitionDuration:A,transitionDelay:ja,animationDuration:wa,animationDelay:na};
q.module("ngAnimate",[]).directive("ngAnimateSwap",["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,d,g,l,E){var z,u;b.$watchCollection(g.ngAnimateSwap||g["for"],function(g){z&&a.leave(z);u&&(u.$destroy(),u=null);if(g||0===g)u=b.$new(),E(u,function(b){z=b;a.enter(b,null,d)})})}}}]).directive("ngAnimateChildren",[function(){return function(a,b,c){a=c.ngAnimateChildren;q.isString(a)&&0===a.length?b.data("$$ngAnimateChildren",!0):
c.$observe("ngAnimateChildren",function(a){b.data("$$ngAnimateChildren","on"===a||"true"===a)})}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),E=0;E<b.length;E++)b[E]();g||a(function(){g||c()})}}var d,g;d=b.queue=[];b.waitUntilQuiet=function(b){g&&g();g=a(function(){g=null;b();c()})};return b}]).provider("$$animateQueue",["$animateProvider",function(a){function b(a){if(!a)return null;a=a.split(" ");var b=Object.create(null);
r(a,function(a){b[a]=!0});return b}function c(a,c){if(a&&c){var d=b(c);return a.split(" ").some(function(a){return d[a]})}}function d(a,b,c,d){return l[a].some(function(a){return a(b,c,d)})}function g(a,b){a=a||{};var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var l=this.rules={skip:[],cancel:[],join:[]};l.join.push(function(a,b,c){return!b.structural&&g(b.options)});l.skip.push(function(a,b,c){return!b.structural&&!g(b.options)});l.skip.push(function(a,b,c){return"leave"==
c.event&&b.structural});l.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});l.cancel.push(function(a,b,c){return c.structural&&b.structural});l.cancel.push(function(a,b,c){return 2===c.state&&b.structural});l.cancel.push(function(a,b,d){a=b.options.addClass;b=b.options.removeClass;var g=d.options.addClass;d=d.options.removeClass;return O(a)&&O(b)||O(g)&&O(d)?!1:c(a,d)||c(b,g)});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner",
"$templateRequest","$$jqLite","$$forceReflow",function(b,c,u,l,K,q,w,oa,x,y){function M(){var a=!1;return function(b){a?b():c.$$postDigest(function(){a=!0;b()})}}function v(a,b,c){var f=F(b),d=F(a),h=[];(a=B[c])&&r(a,function(a){s.call(a.node,f)?h.push(a.callback):"leave"===c&&s.call(a.node,d)&&h.push(a.callback)});return h}function h(a,f,h){function k(c,f,h,d){u(function(){var c=v(H,a,f);c.length&&b(function(){r(c,function(b){b(a,h,d)})})});c.progress(f,h,d)}function B(b){var c=a,f=m;f.preparationClasses&&
(c.removeClass(f.preparationClasses),f.preparationClasses=null);f.activeClasses&&(c.removeClass(f.activeClasses),f.activeClasses=null);Ka(a,m);fa(a,m);m.domOperation();s.complete(!b)}var m=Ia(h),y,H;if(a=Na(a))y=F(a),H=a.parent();var m=la(m),s=new w,u=M();aa(m.addClass)&&(m.addClass=m.addClass.join(" "));m.addClass&&!Q(m.addClass)&&(m.addClass=null);aa(m.removeClass)&&(m.removeClass=m.removeClass.join(" "));m.removeClass&&!Q(m.removeClass)&&(m.removeClass=null);m.from&&!sa(m.from)&&(m.from=null);
m.to&&!sa(m.to)&&(m.to=null);if(!y)return B(),s;h=[y.className,m.addClass,m.removeClass].join(" ");if(!Va(h))return B(),s;var l=0<=["enter","move","leave"].indexOf(f),e=!J||C.get(y);h=!e&&t.get(y)||{};var x=!!h.state;e||x&&1==h.state||(e=!n(a,H,f));if(e)return B(),s;l&&ya(a);e={structural:l,element:a,event:f,close:B,options:m,runner:s};if(x){if(d("skip",a,e,h)){if(2===h.state)return B(),s;U(a,h.options,m);return h.runner}if(d("cancel",a,e,h))if(2===h.state)h.runner.end();else if(h.structural)h.close();
else return U(a,h.options,e.options),h.runner;else if(d("join",a,e,h))if(2===h.state)U(a,m,{});else return Ra(a,l?f:null,m),f=e.event=h.event,m=U(a,h.options,e.options),h.runner}else U(a,m,{});(x=e.structural)||(x="animate"===e.event&&0<Object.keys(e.options.to||{}).length||g(e.options));if(!x)return B(),L(a),s;var K=(h.counter||0)+1;e.counter=K;G(a,1,e);c.$$postDigest(function(){var b=t.get(y),c=!b,b=b||{},h=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||g(b.options));if(c||b.counter!==
K||!h){c&&(Ka(a,m),fa(a,m));if(c||l&&b.event!==f)m.domOperation(),s.end();h||L(a)}else f=!b.structural&&g(b.options,!0)?"setClass":b.event,G(a,2),b=q(a,f,b.options),b.done(function(b){B(!b);(b=t.get(y))&&b.counter===K&&L(F(a));k(s,f,"close",{})}),s.setHost(b),k(s,f,"start",{})});return s}function ya(a){a=F(a).querySelectorAll("[data-ng-animate]");r(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=t.get(a);if(c)switch(b){case 2:c.runner.end();case 1:t.remove(a)}})}function L(a){a=
F(a);a.removeAttribute("data-ng-animate");t.remove(a)}function H(a,b){return F(a)===F(b)}function n(a,b,c){c=I(l[0].body);var f=H(a,c)||"HTML"===a[0].nodeName,h=H(a,u),d=!1,k;for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){h||(h=H(b,u));a=b[0];if(1!==a.nodeType)break;var B=t.get(a)||{};d||(d=B.structural||C.get(a));if(O(k)||!0===k)a=b.data("$$ngAnimateChildren"),Y(a)&&(k=a);if(d&&!1===k)break;h||(h=H(b,u),h||!(a=b.data("$ngAnimatePin")))||(b=a,h=!0);f||(f=H(b,c));b=b.parent()}return(!d||k)&&
h&&f}function G(a,b,c){c=c||{};c.state=b;a=F(a);a.setAttribute("data-ng-animate",b);c=(b=t.get(a))?Da(b,c):c;t.put(a,c)}var t=new K,C=new K,J=null,f=c.$watch(function(){return 0===oa.totalPendingRequests},function(a){a&&(f(),c.$$postDigest(function(){c.$$postDigest(function(){null===J&&(J=!0)})}))}),B={},k=a.classNameFilter(),Va=k?function(a){return k.test(a)}:function(){return!0},Ka=T(x),s=Node.prototype.contains||function(a){return this===a||!!(this.compareDocumentPosition(a)&16)};return{on:function(a,
b,c){b=pa(b);B[a]=B[a]||[];B[a].push({node:b,callback:c})},off:function(a,b,c){function f(a,b,c){var h=pa(b);return a.filter(function(a){return!(a.node===h&&(!c||a.callback===c))})}var h=B[a];h&&(B[a]=1===arguments.length?null:f(h,b,c))},pin:function(a,b){za(ta(a),"element","not an element");za(ta(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=c||{};c.domOperation=f;return h(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!J;else if(ta(a)){var f=
F(a),h=C.get(f);1===c?b=!h:(b=!!b)?h&&C.remove(f):C.put(f,!0)}else b=J=!!a;return b}}}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,g,l,E,z,u){function e(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,L=d.parentNode;g.put(d,a);for(var e;L;){if(e=g.get(L)){e.processed||(e=b(e));break}L=
L.parentNode}(e||c).children.push(a);return a}var c={children:[]},d,g=new z;for(d=0;d<a.length;d++){var e=a[d];g.put(e.domNode,a[d]={domNode:e.domNode,fn:e.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var g=0,e=[];for(d=0;d<c.length;d++){var t=c[d];0>=a&&(a=g,g=0,b.push(e),e=[]);e.push(t.fn);t.children.forEach(function(a){g++;c.push(a)});a--}e.length&&b.push(e);return b}(c)}var K=[],q=T(a);return function(w,
z,x){function y(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];r(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function M(a){var b=[],c={};r(a,function(a,f){var d=F(a.element),h=0<=["enter","move"].indexOf(a.event),d=a.structural?y(d):[];if(d.length){var g=h?"to":"from";r(d,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][g]={animationID:f,element:I(a)}})}else b.push(a)});var d={},h={};r(c,function(c,
g){var k=c.from,e=c.to;if(k&&e){var C=a[k.animationID],t=a[e.animationID],y=k.animationID.toString();if(!h[y]){var n=h[y]={structural:!0,beforeStart:function(){C.beforeStart();t.beforeStart()},close:function(){C.close();t.close()},classes:v(C.classes,t.classes),from:C,to:t,anchors:[]};n.classes.length?b.push(n):(b.push(C),b.push(t))}h[y].anchors.push({out:k.element,"in":e.element})}else k=k?k.animationID:e.animationID,e=k.toString(),d[e]||(d[e]=!0,b.push(a[k]))});return b}function v(a,b){a=a.split(" ");
b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var h=a[d];if("ng-"!==h.substring(0,3))for(var e=0;e<b.length;e++)if(h===b[e]){c.push(h);break}}return c.join(" ")}function h(a){for(var b=c.length-1;0<=b;b--){var d=c[b];if(l.has(d)&&(d=l.get(d)(a)))return d}}function ya(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function L(){var a=b(w);!a||"leave"===z&&x.$$domOperationFired||a.end()}function H(b){w.off("$destroy",L);w.removeData("$$animationRunner");
q(w,x);fa(w,x);x.domOperation();C&&a.removeClass(w,C);w.removeClass("ng-animate");G.complete(!b)}x=la(x);var n=0<=["enter","move","leave"].indexOf(z),G=new E({end:function(){H()},cancel:function(){H(!0)}});if(!c.length)return H(),G;w.data("$$animationRunner",G);var t=Aa(w.attr("class"),Aa(x.addClass,x.removeClass)),C=x.tempClasses;C&&(t+=" "+C,x.tempClasses=null);var J;n&&(J="ng-"+z+"-prepare",a.addClass(w,J));K.push({element:w,classes:t,event:z,structural:n,options:x,beforeStart:function(){w.addClass("ng-animate");
C&&a.addClass(w,C);J&&(a.removeClass(w,J),J=null)},close:H});w.on("$destroy",L);if(1<K.length)return G;g.$$postDigest(function(){var a=[];r(K,function(c){b(c.element)?a.push(c):c.close()});K.length=0;var c=M(a),d=[];r(c,function(a){d.push({domNode:F(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var f=h(a);f&&(c=f.start)}c?(c=c(),c.done(function(a){d(!a)}),ya(a,c)):d()}})});u(e(d))});return G}}]}]).provider("$animateCss",
["$animateProvider",function(a){var b=Ga(),c=Ga();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,g,l,E,z,u,e,K){function q(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++M))+"-"+a.getAttribute("class")+"-"+b}function w(h,e,y,u){var n;0<b.count(y)&&(n=c.get(y),n||(e=W(e,"-stagger"),g.addClass(h,e),n=Ea(a,h,u),n.animationDuration=Math.max(n.animationDuration,0),n.transitionDuration=
Math.max(n.transitionDuration,0),g.removeClass(h,e),c.put(y,n)));return n||{}}function oa(a){v.push(a);e.waitUntilQuiet(function(){b.flush();c.flush();for(var a=z(),d=0;d<v.length;d++)v[d](a);v.length=0})}function x(c,e,g){e=b.get(g);e||(e=Ea(a,c,Ta),"infinite"===e.animationIterationCount&&(e.animationIterationCount=1));b.put(g,e);c=e;g=c.animationDelay;e=c.transitionDelay;c.maxDelay=g&&e?Math.max(g,e):g||e;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);
return c}var y=T(g),M=0,v=[];return function(a,c){function d(){n()}function e(){n(!0)}function n(b){if(!(M||xa&&ca)){M=!0;ca=!1;f.$$skipPreparationClasses||g.removeClass(a,da);g.removeClass(a,ba);qa(k,!1);ma(k,!1);r(v,function(a){k.style[a[0]]=""});y(a,f);fa(a,f);Object.keys(B).length&&r(B,function(a,b){a?k.style.setProperty(b,a):k.style.removeProperty(b)});if(f.onDone)f.onDone();ea&&ea.length&&a.off(ea.join(" "),C);A&&A.complete(!b)}}function G(a){p.blockTransition&&ma(k,a);p.blockKeyframeAnimation&&
qa(k,!!a)}function t(){A=new l({end:d,cancel:e});oa(P);n();return{$$willAnimate:!1,start:function(){return A},end:d}}function C(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-T,0)>=O&&b>=N&&(xa=!0,n())}function J(){function b(){if(!M){G(!1);r(v,function(a){k.style[a[0]]=a[1]});y(a,f);g.addClass(a,ba);if(p.recalculateTimingStyles){ka=k.className+" "+da;ga=q(k,ka);D=x(k,ka,ga);Z=D.maxDelay;m=Math.max(Z,0);N=D.maxDuration;
if(0===N){n();return}p.hasTransitions=0<D.transitionDuration;p.hasAnimations=0<D.animationDuration}p.applyAnimationDelay&&(Z="boolean"!==typeof f.delay&&ra(f.delay)?parseFloat(f.delay):Z,m=Math.max(Z,0),D.animationDelay=Z,$=[na,Z+"s"],v.push($),k.style[$[0]]=$[1]);O=1E3*m;Q=1E3*N;if(f.easing){var d,e=f.easing;p.hasTransitions&&(d=R+"TimingFunction",v.push([d,e]),k.style[d]=e);p.hasAnimations&&(d=X+"TimingFunction",v.push([d,e]),k.style[d]=e)}D.transitionDuration&&ea.push(ua);D.animationDuration&&
ea.push(va);T=Date.now();var t=O+1.5*Q;d=T+t;var e=a.data("$$animateCss")||[],J=!0;if(e.length){var u=e[0];(J=d>u.expectedEndTime)?E.cancel(u.timer):e.push(n)}J&&(t=E(c,t,!1),e[0]={timer:t,expectedEndTime:d},e.push(n),a.data("$$animateCss",e));if(ea.length)a.on(ea.join(" "),C);f.to&&(f.cleanupStyles&&Ha(B,k,Object.keys(f.to)),Ca(a,f))}}function c(){var b=a.data("$$animateCss");if(b){for(var d=1;d<b.length;d++)b[d]();a.removeData("$$animateCss")}}if(!M)if(k.parentNode){var d=function(a){if(xa)ca&&
a&&(ca=!1,n());else if(ca=!a,D.animationDuration)if(a=qa(k,ca),ca)v.push(a);else{var b=v,c=b.indexOf(a);0<=a&&b.splice(c,1)}},e=0<Y&&(D.transitionDuration&&0===V.transitionDuration||D.animationDuration&&0===V.animationDuration)&&Math.max(V.animationDelay,V.transitionDelay);e?E(b,Math.floor(e*Y*1E3),!1):b();I.resume=function(){d(!0)};I.pause=function(){d(!1)}}else n()}var f=Ia(c),B={},k=F(a);if(!k||!k.parentNode||!K.enabled())return t();var f=la(f),v=[],z=a.attr("class"),s=Ma(f),M,ca,xa,A,I,m,O,N,
Q,T,ea=[];if(0===f.duration||!u.animations&&!u.transitions)return t();var ha=f.event&&aa(f.event)?f.event.join(" "):f.event,U="",S="";ha&&f.structural?U=W(ha,"ng-",!0):ha&&(U=ha);f.addClass&&(S+=W(f.addClass,"-add"));f.removeClass&&(S.length&&(S+=" "),S+=W(f.removeClass,"-remove"));f.applyClassesEarly&&S.length&&y(a,f);var da=[U,S].join(" ").trim(),ka=z+" "+da,ba=W(da,"-active"),z=s.to&&0<Object.keys(s.to).length;if(!(0<(f.keyframeStyle||"").length||z||da))return t();var ga,V;0<f.stagger?(s=parseFloat(f.stagger),
V={transitionDelay:s,animationDelay:s,transitionDuration:0,animationDuration:0}):(ga=q(k,ka),V=w(k,da,ga,Ua));f.$$skipPreparationClasses||g.addClass(a,da);f.transitionStyle&&(s=[R,f.transitionStyle],ia(k,s),v.push(s));0<=f.duration&&(s=0<k.style[R].length,s=Fa(f.duration,s),ia(k,s),v.push(s));f.keyframeStyle&&(s=[X,f.keyframeStyle],ia(k,s),v.push(s));var Y=V?0<=f.staggerIndex?f.staggerIndex:b.count(ga):0;(ha=0===Y)&&!f.skipBlocking&&ma(k,9999);var D=x(k,ka,ga),Z=D.maxDelay;m=Math.max(Z,0);N=D.maxDuration;
var p={};p.hasTransitions=0<D.transitionDuration;p.hasAnimations=0<D.animationDuration;p.hasTransitionAll=p.hasTransitions&&"all"==D.transitionProperty;p.applyTransitionDuration=z&&(p.hasTransitions&&!p.hasTransitionAll||p.hasAnimations&&!p.hasTransitions);p.applyAnimationDuration=f.duration&&p.hasAnimations;p.applyTransitionDelay=ra(f.delay)&&(p.applyTransitionDuration||p.hasTransitions);p.applyAnimationDelay=ra(f.delay)&&p.hasAnimations;p.recalculateTimingStyles=0<S.length;if(p.applyTransitionDuration||
p.applyAnimationDuration)N=f.duration?parseFloat(f.duration):N,p.applyTransitionDuration&&(p.hasTransitions=!0,D.transitionDuration=N,s=0<k.style[R+"Property"].length,v.push(Fa(N,s))),p.applyAnimationDuration&&(p.hasAnimations=!0,D.animationDuration=N,v.push([wa,N+"s"]));if(0===N&&!p.recalculateTimingStyles)return t();if(null!=f.delay){var $;"boolean"!==typeof f.delay&&($=parseFloat(f.delay),m=Math.max($,0));p.applyTransitionDelay&&v.push([ja,$+"s"]);p.applyAnimationDelay&&v.push([na,$+"s"])}null==
f.duration&&0<D.transitionDuration&&(p.recalculateTimingStyles=p.recalculateTimingStyles||ha);O=1E3*m;Q=1E3*N;f.skipBlocking||(p.blockTransition=0<D.transitionDuration,p.blockKeyframeAnimation=0<D.animationDuration&&0<V.animationDelay&&0===V.animationDuration);f.from&&(f.cleanupStyles&&Ha(B,k,Object.keys(f.from)),Ba(a,f));p.blockTransition||p.blockKeyframeAnimation?G(N):f.skipBlocking||ma(k,!1);return{$$willAnimate:!0,end:d,start:function(){if(!M)return I={end:d,cancel:e,resume:null,pause:null},A=
new l(I),oa(J),A}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,c,d,g,l,E,z){function u(a){return a.replace(/\bng-\S+\b/g,"")}function e(a,b){Q(a)&&(a=a.split(" "));Q(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function K(c,g,v){function h(a){var b={},c=F(a).getBoundingClientRect();
r(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=A.scrollTop;break;case "left":d+=A.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function l(){var c=u(v.attr("class")||""),d=e(c,n),c=e(n,c),d=a(E,{to:h(v),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function z(){E.remove();g.removeClass("ng-animate-shim");v.removeClass("ng-animate-shim")}var E=I(F(g).cloneNode(!0)),n=u(E.attr("class")||"");g.addClass("ng-animate-shim");
v.addClass("ng-animate-shim");E.addClass("ng-anchor");x.append(E);var G;c=function(){var c=a(E,{addClass:"ng-anchor-out",delay:!0,from:h(g)});return c.$$willAnimate?c:null}();if(!c&&(G=l(),!G))return z();var t=c||G;return{start:function(){function a(){c&&c.end()}var b,c=t.start();c.done(function(){c=null;if(!G&&(G=l()))return c=G.start(),c.done(function(){c=null;z();b.complete()}),c;z();b.complete()});return b=new d({end:a,cancel:a})}}}function q(a,b,c,e){var g=w(a,P),u=w(b,P),l=[];r(e,function(a){(a=
K(c,a.out,a["in"]))&&l.push(a)});if(g||u||0!==l.length)return{start:function(){function a(){r(b,function(a){a.end()})}var b=[];g&&b.push(g.start());u&&b.push(u.start());r(l,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function w(c){var d=c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=ba(e.event,e.preparationClasses));
c=a(d,e);return c.$$willAnimate?c:null}if(!l.animations&&!l.transitions)return P;var A=z[0].body;c=F(g);var x=I(c.parentNode&&11===c.parentNode.nodeType||A.contains(c)?c:A);T(E);return function(a){return a.from&&a.to?q(a.from,a.to,a.classes,a.anchors):w(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,c,d){function g(c){c=aa(c)?c:c.split(" ");for(var d=[],g={},e=0;e<c.length;e++){var l=c[e],r=a.$$registeredAnimations[l];
r&&!g[l]&&(d.push(b.get(r)),g[l]=!0)}return d}var l=T(d);return function(a,b,d,e){function q(){e.domOperation();l(a,e)}function A(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,y,M,f];break;case "addClass":b=[b,y,f];break;case "removeClass":b=[b,M,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Ja(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Ja(a))return a;return P}function w(a,b,d,e,f){var g=[];r(e,function(e){var h=e[f];h&&g.push(function(){var e,
f,g=!1,k=function(a){g||(g=!0,(f||P)(a),e.complete(!a))};e=new c({end:function(){k()},cancel:function(){k(!0)}});f=A(h,a,b,d,function(a){k(!1===a)});return e})});return g}function F(a,b,d,e,f){var g=w(a,b,d,e,f);if(0===g.length){var h,l;"beforeSetClass"===f?(h=w(a,"removeClass",d,e,"beforeRemoveClass"),l=w(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(h=w(a,"removeClass",d,e,"removeClass"),l=w(a,"addClass",d,e,"addClass"));h&&(g=g.concat(h));l&&(g=g.concat(l))}if(0!==g.length)return function(a){var b=
[];g.length&&r(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){r(b,function(b){a?b.cancel():b.end()})}}}var x=!1;3===arguments.length&&sa(d)&&(e=d,d=null);e=la(e);d||(d=a.attr("class")||"",e.addClass&&(d+=" "+e.addClass),e.removeClass&&(d+=" "+e.removeClass));var y=e.addClass,M=e.removeClass,v=g(d),h,I;if(v.length){var L,H;"leave"==b?(H="leave",L="afterLeave"):(H="before"+b.charAt(0).toUpperCase()+b.substr(1),L=b);"enter"!==b&&"move"!==b&&(h=F(a,b,e,v,H));I=F(a,b,e,v,L)}if(h||
I){var n;return{$$willAnimate:!0,end:function(){n?n.end():(x=!0,q(),fa(a,e),n=new c,n.complete(!0));return n},start:function(){function b(c){x=!0;q();fa(a,e);n.complete(c)}if(n)return n;n=new c;var d,g=[];h&&g.push(function(a){d=h(a)});g.length?g.push(function(a){q();a(!0)}):q();I&&g.push(function(a){d=I(a)});n.setHost({end:function(){x||((d||P)(void 0),b(void 0))},cancel:function(){x||((d||P)(!0),b(!0))}});c.chain(g,b);return n}}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");
this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),q=d(a.to);if(b||q)return{start:function(){function a(){return function(){r(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());q&&d.push(q.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map
;
// some data to export
function descargar(){


var numero = descargardatos.length;
var data =[numero];
var fecha = año+"/"+mes+"/"+dia;
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": fecha, "dato": descargardatos[i]}
 
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "Fecha" + '","' + dato + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","' + item.dato + '"');
});


// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});


link = document.getElementById('link');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);


}




function descargarreal(){


var numero = descargardatos22.length;
var data =[numero];
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": i, "dato": descargardatos22[i], "dato1": descargardatos33[i]}
 
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "ID" + '","' + "Voltaje (V)" + '","' + "Corriente (A)" + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","' + item.dato + '","' + item.dato1 + '"');
});


// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});


link = document.getElementById('link');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);
descargardatos2=[];

}



;
/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */

(function(window, angular, undefined) {'use strict';

/* jshint ignore:start */
var noop        = angular.noop;
var extend      = angular.extend;
var jqLite      = angular.element;
var forEach     = angular.forEach;
var isArray     = angular.isArray;
var isString    = angular.isString;
var isObject    = angular.isObject;
var isUndefined = angular.isUndefined;
var isDefined   = angular.isDefined;
var isFunction  = angular.isFunction;
var isElement   = angular.isElement;

var ELEMENT_NODE = 1;
var COMMENT_NODE = 8;

var ADD_CLASS_SUFFIX = '-add';
var REMOVE_CLASS_SUFFIX = '-remove';
var EVENT_CLASS_PREFIX = 'ng-';
var ACTIVE_CLASS_SUFFIX = '-active';

var NG_ANIMATE_CLASSNAME = 'ng-animate';
var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';

// Detect proper transitionend/animationend event names.
var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;

// If unprefixed events are not supported but webkit-prefixed are, use the latter.
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.
// Register both events in case `window.onanimationend` is not supported because of that,
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit
// therefore there is no reason to test anymore for other vendor prefixes:
// http://caniuse.com/#search=transition
if (isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend)) {
  CSS_PREFIX = '-webkit-';
  TRANSITION_PROP = 'WebkitTransition';
  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
} else {
  TRANSITION_PROP = 'transition';
  TRANSITIONEND_EVENT = 'transitionend';
}

if (isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend)) {
  CSS_PREFIX = '-webkit-';
  ANIMATION_PROP = 'WebkitAnimation';
  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
} else {
  ANIMATION_PROP = 'animation';
  ANIMATIONEND_EVENT = 'animationend';
}

var DURATION_KEY = 'Duration';
var PROPERTY_KEY = 'Property';
var DELAY_KEY = 'Delay';
var TIMING_KEY = 'TimingFunction';
var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
var ANIMATION_PLAYSTATE_KEY = 'PlayState';
var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;

var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;
var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;
var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;
var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;

var isPromiseLike = function(p) {
  return p && p.then ? true : false;
};

function assertArg(arg, name, reason) {
  if (!arg) {
    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));
  }
  return arg;
}

function mergeClasses(a,b) {
  if (!a && !b) return '';
  if (!a) return b;
  if (!b) return a;
  if (isArray(a)) a = a.join(' ');
  if (isArray(b)) b = b.join(' ');
  return a + ' ' + b;
}

function packageStyles(options) {
  var styles = {};
  if (options && (options.to || options.from)) {
    styles.to = options.to;
    styles.from = options.from;
  }
  return styles;
}

function pendClasses(classes, fix, isPrefix) {
  var className = '';
  classes = isArray(classes)
      ? classes
      : classes && isString(classes) && classes.length
          ? classes.split(/\s+/)
          : [];
  forEach(classes, function(klass, i) {
    if (klass && klass.length > 0) {
      className += (i > 0) ? ' ' : '';
      className += isPrefix ? fix + klass
                            : klass + fix;
    }
  });
  return className;
}

function removeFromArray(arr, val) {
  var index = arr.indexOf(val);
  if (val >= 0) {
    arr.splice(index, 1);
  }
}

function stripCommentsFromElement(element) {
  if (element instanceof jqLite) {
    switch (element.length) {
      case 0:
        return [];
        break;

      case 1:
        // there is no point of stripping anything if the element
        // is the only element within the jqLite wrapper.
        // (it's important that we retain the element instance.)
        if (element[0].nodeType === ELEMENT_NODE) {
          return element;
        }
        break;

      default:
        return jqLite(extractElementNode(element));
        break;
    }
  }

  if (element.nodeType === ELEMENT_NODE) {
    return jqLite(element);
  }
}

function extractElementNode(element) {
  if (!element[0]) return element;
  for (var i = 0; i < element.length; i++) {
    var elm = element[i];
    if (elm.nodeType == ELEMENT_NODE) {
      return elm;
    }
  }
}

function $$addClass($$jqLite, element, className) {
  forEach(element, function(elm) {
    $$jqLite.addClass(elm, className);
  });
}

function $$removeClass($$jqLite, element, className) {
  forEach(element, function(elm) {
    $$jqLite.removeClass(elm, className);
  });
}

function applyAnimationClassesFactory($$jqLite) {
  return function(element, options) {
    if (options.addClass) {
      $$addClass($$jqLite, element, options.addClass);
      options.addClass = null;
    }
    if (options.removeClass) {
      $$removeClass($$jqLite, element, options.removeClass);
      options.removeClass = null;
    }
  }
}

function prepareAnimationOptions(options) {
  options = options || {};
  if (!options.$$prepared) {
    var domOperation = options.domOperation || noop;
    options.domOperation = function() {
      options.$$domOperationFired = true;
      domOperation();
      domOperation = noop;
    };
    options.$$prepared = true;
  }
  return options;
}

function applyAnimationStyles(element, options) {
  applyAnimationFromStyles(element, options);
  applyAnimationToStyles(element, options);
}

function applyAnimationFromStyles(element, options) {
  if (options.from) {
    element.css(options.from);
    options.from = null;
  }
}

function applyAnimationToStyles(element, options) {
  if (options.to) {
    element.css(options.to);
    options.to = null;
  }
}

function mergeAnimationOptions(element, target, newOptions) {
  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');
  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');
  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);

  if (newOptions.preparationClasses) {
    target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);
    delete newOptions.preparationClasses;
  }

  // noop is basically when there is no callback; otherwise something has been set
  var realDomOperation = target.domOperation !== noop ? target.domOperation : null;

  extend(target, newOptions);

  // TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
  if (realDomOperation) {
    target.domOperation = realDomOperation;
  }

  if (classes.addClass) {
    target.addClass = classes.addClass;
  } else {
    target.addClass = null;
  }

  if (classes.removeClass) {
    target.removeClass = classes.removeClass;
  } else {
    target.removeClass = null;
  }

  return target;
}

function resolveElementClasses(existing, toAdd, toRemove) {
  var ADD_CLASS = 1;
  var REMOVE_CLASS = -1;

  var flags = {};
  existing = splitClassesToLookup(existing);

  toAdd = splitClassesToLookup(toAdd);
  forEach(toAdd, function(value, key) {
    flags[key] = ADD_CLASS;
  });

  toRemove = splitClassesToLookup(toRemove);
  forEach(toRemove, function(value, key) {
    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
  });

  var classes = {
    addClass: '',
    removeClass: ''
  };

  forEach(flags, function(val, klass) {
    var prop, allow;
    if (val === ADD_CLASS) {
      prop = 'addClass';
      allow = !existing[klass];
    } else if (val === REMOVE_CLASS) {
      prop = 'removeClass';
      allow = existing[klass];
    }
    if (allow) {
      if (classes[prop].length) {
        classes[prop] += ' ';
      }
      classes[prop] += klass;
    }
  });

  function splitClassesToLookup(classes) {
    if (isString(classes)) {
      classes = classes.split(' ');
    }

    var obj = {};
    forEach(classes, function(klass) {
      // sometimes the split leaves empty string values
      // incase extra spaces were applied to the options
      if (klass.length) {
        obj[klass] = true;
      }
    });
    return obj;
  }

  return classes;
}

function getDomNode(element) {
  return (element instanceof angular.element) ? element[0] : element;
}

function applyGeneratedPreparationClasses(element, event, options) {
  var classes = '';
  if (event) {
    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);
  }
  if (options.addClass) {
    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));
  }
  if (options.removeClass) {
    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));
  }
  if (classes.length) {
    options.preparationClasses = classes;
    element.addClass(classes);
  }
}

function clearGeneratedClasses(element, options) {
  if (options.preparationClasses) {
    element.removeClass(options.preparationClasses);
    options.preparationClasses = null;
  }
  if (options.activeClasses) {
    element.removeClass(options.activeClasses);
    options.activeClasses = null;
  }
}

function blockTransitions(node, duration) {
  // we use a negative delay value since it performs blocking
  // yet it doesn't kill any existing transitions running on the
  // same element which makes this safe for class-based animations
  var value = duration ? '-' + duration + 's' : '';
  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);
  return [TRANSITION_DELAY_PROP, value];
}

function blockKeyframeAnimations(node, applyBlock) {
  var value = applyBlock ? 'paused' : '';
  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
  applyInlineStyle(node, [key, value]);
  return [key, value];
}

function applyInlineStyle(node, styleTuple) {
  var prop = styleTuple[0];
  var value = styleTuple[1];
  node.style[prop] = value;
}

function concatWithSpace(a,b) {
  if (!a) return b;
  if (!b) return a;
  return a + ' ' + b;
}

var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {
  var queue, cancelFn;

  function scheduler(tasks) {
    // we make a copy since RAFScheduler mutates the state
    // of the passed in array variable and this would be difficult
    // to track down on the outside code
    queue = queue.concat(tasks);
    nextTick();
  }

  queue = scheduler.queue = [];

  /* waitUntilQuiet does two things:
   * 1. It will run the FINAL `fn` value only when an uncancelled RAF has passed through
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.
   *
   * The motivation here is that animation code can request more time from the scheduler
   * before the next wave runs. This allows for certain DOM properties such as classes to
   * be resolved in time for the next animation to run.
   */
  scheduler.waitUntilQuiet = function(fn) {
    if (cancelFn) cancelFn();

    cancelFn = $$rAF(function() {
      cancelFn = null;
      fn();
      nextTick();
    });
  };

  return scheduler;

  function nextTick() {
    if (!queue.length) return;

    var items = queue.shift();
    for (var i = 0; i < items.length; i++) {
      items[i]();
    }

    if (!cancelFn) {
      $$rAF(function() {
        if (!cancelFn) nextTick();
      });
    }
  }
}];

var $$AnimateChildrenDirective = [function() {
  return function(scope, element, attrs) {
    var val = attrs.ngAnimateChildren;
    if (angular.isString(val) && val.length === 0) { //empty attribute
      element.data(NG_ANIMATE_CHILDREN_DATA, true);
    } else {
      attrs.$observe('ngAnimateChildren', function(value) {
        value = value === 'on' || value === 'true';
        element.data(NG_ANIMATE_CHILDREN_DATA, value);
      });
    }
  };
}];

var ANIMATE_TIMER_KEY = '$$animateCss';

/**
 * @ngdoc service
 * @name $animateCss
 * @kind object
 *
 * @description
 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes
 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT
 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or
 * directives to create more complex animations that can be purely driven using CSS code.
 *
 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of
 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).
 *
 * ## Usage
 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that
 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,
 * any automatic control over cancelling animations and/or preventing animations from being run on
 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to
 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger
 * the CSS animation.
 *
 * The example below shows how we can create a folding animation on an element using `ng-if`:
 *
 * ```html
 * <!-- notice the `fold-animation` CSS class -->
 * <div ng-if="onOff" class="fold-animation">
 *   This element will go BOOM
 * </div>
 * <button ng-click="onOff=true">Fold In</button>
 * ```
 *
 * Now we create the **JavaScript animation** that will trigger the CSS transition:
 *
 * ```js
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var height = element[0].offsetHeight;
 *       return $animateCss(element, {
 *         from: { height:'0px' },
 *         to: { height:height + 'px' },
 *         duration: 1 // one second
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * ## More Advanced Uses
 *
 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
 *
 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
 * to provide a working animation that will run in CSS.
 *
 * The example below showcases a more advanced version of the `.fold-animation` from the example above:
 *
 * ```js
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var height = element[0].offsetHeight;
 *       return $animateCss(element, {
 *         addClass: 'red large-text pulse-twice',
 *         easing: 'ease-out',
 *         from: { height:'0px' },
 *         to: { height:height + 'px' },
 *         duration: 1 // one second
 *       });
 *     }
 *   }
 * }]);
 * ```
 *
 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:
 *
 * ```css
 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,
 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/
 * .red { background:red; }
 * .large-text { font-size:20px; }
 *
 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/
 * .pulse-twice {
 *   animation: 0.5s pulse linear 2;
 *   -webkit-animation: 0.5s pulse linear 2;
 * }
 *
 * @keyframes pulse {
 *   from { transform: scale(0.5); }
 *   to { transform: scale(1.5); }
 * }
 *
 * @-webkit-keyframes pulse {
 *   from { -webkit-transform: scale(0.5); }
 *   to { -webkit-transform: scale(1.5); }
 * }
 * ```
 *
 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
 *
 * ## How the Options are handled
 *
 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
 * styles using the `from` and `to` properties.
 *
 * ```js
 * var animator = $animateCss(element, {
 *   from: { background:'red' },
 *   to: { background:'blue' }
 * });
 * animator.start();
 * ```
 *
 * ```css
 * .rotating-animation {
 *   animation:0.5s rotate linear;
 *   -webkit-animation:0.5s rotate linear;
 * }
 *
 * @keyframes rotate {
 *   from { transform: rotate(0deg); }
 *   to { transform: rotate(360deg); }
 * }
 *
 * @-webkit-keyframes rotate {
 *   from { -webkit-transform: rotate(0deg); }
 *   to { -webkit-transform: rotate(360deg); }
 * }
 * ```
 *
 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
 * and spread across the transition and keyframe animation.
 *
 * ## What is returned
 *
 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
 *
 * ```js
 * var animator = $animateCss(element, { ... });
 * ```
 *
 * Now what do the contents of our `animator` variable look like:
 *
 * ```js
 * {
 *   // starts the animation
 *   start: Function,
 *
 *   // ends (aborts) the animation
 *   end: Function
 * }
 * ```
 *
 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and stlyes may have been
 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
 * and that changing them will not reconfigure the parameters of the animation.
 *
 * ### runner.done() vs runner.then()
 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
 * unless you really need a digest to kick off afterwards.
 *
 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).
 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.
 *
 * @param {DOMElement} element the element that will be animated
 * @param {object} options the animation-related options that will be applied during the animation
 *
 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).
 * * `transitionStyle` - The raw CSS transition style that will be used (e.g. `1s linear all`).
 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).
 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.
 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition.
 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
 * is provided then the animation will be skipped entirely.
 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
 * CSS delay value.
 * * `stagger` - A numeric time value representing the delay between successively animated elements
 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})
 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
 * * `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)
 * * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occuring on the classes being added and removed.)
 * * `cleanupStyles` - Whether or not the provided `from` and `to` styles will be removed once
 *    the animation is closed. This is useful for when the styles are used purely for the sake of
 *    the animation and do not have a lasting visual effect on the element (e.g. a colapse and open animation).
 *    By default this value is set to `false`.
 *
 * @return {object} an object with start and end methods and details about the animation.
 *
 * * `start` - The method to start the animation. This will return a `Promise` when called.
 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.
 */
var ONE_SECOND = 1000;
var BASE_TEN = 10;

var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
var CLOSING_TIME_BUFFER = 1.5;

var DETECT_CSS_PROPERTIES = {
  transitionDuration:      TRANSITION_DURATION_PROP,
  transitionDelay:         TRANSITION_DELAY_PROP,
  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,
  animationDuration:       ANIMATION_DURATION_PROP,
  animationDelay:          ANIMATION_DELAY_PROP,
  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
};

var DETECT_STAGGER_CSS_PROPERTIES = {
  transitionDuration:      TRANSITION_DURATION_PROP,
  transitionDelay:         TRANSITION_DELAY_PROP,
  animationDuration:       ANIMATION_DURATION_PROP,
  animationDelay:          ANIMATION_DELAY_PROP
};

function getCssKeyframeDurationStyle(duration) {
  return [ANIMATION_DURATION_PROP, duration + 's'];
}

function getCssDelayStyle(delay, isKeyframeAnimation) {
  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
  return [prop, delay + 's'];
}

function computeCssStyles($window, element, properties) {
  var styles = Object.create(null);
  var detectedStyles = $window.getComputedStyle(element) || {};
  forEach(properties, function(formalStyleName, actualStyleName) {
    var val = detectedStyles[formalStyleName];
    if (val) {
      var c = val.charAt(0);

      // only numerical-based values have a negative sign or digit as the first value
      if (c === '-' || c === '+' || c >= 0) {
        val = parseMaxTime(val);
      }

      // by setting this to null in the event that the delay is not set or is set directly as 0
      // then we can still allow for zegative values to be used later on and not mistake this
      // value for being greater than any other negative value.
      if (val === 0) {
        val = null;
      }
      styles[actualStyleName] = val;
    }
  });

  return styles;
}

function parseMaxTime(str) {
  var maxValue = 0;
  var values = str.split(/\s*,\s*/);
  forEach(values, function(value) {
    // it's always safe to consider only second values and omit `ms` values since
    // getComputedStyle will always handle the conversion for us
    if (value.charAt(value.length - 1) == 's') {
      value = value.substring(0, value.length - 1);
    }
    value = parseFloat(value) || 0;
    maxValue = maxValue ? Math.max(value, maxValue) : value;
  });
  return maxValue;
}

function truthyTimingValue(val) {
  return val === 0 || val != null;
}

function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
  var style = TRANSITION_PROP;
  var value = duration + 's';
  if (applyOnlyDuration) {
    style += DURATION_KEY;
  } else {
    value += ' linear all';
  }
  return [style, value];
}

function createLocalCacheLookup() {
  var cache = Object.create(null);
  return {
    flush: function() {
      cache = Object.create(null);
    },

    count: function(key) {
      var entry = cache[key];
      return entry ? entry.total : 0;
    },

    get: function(key) {
      var entry = cache[key];
      return entry && entry.value;
    },

    put: function(key, value) {
      if (!cache[key]) {
        cache[key] = { total: 1, value: value };
      } else {
        cache[key].total++;
      }
    }
  };
}

// we do not reassign an already present style value since
// if we detect the style property value again we may be
// detecting styles that were added via the `from` styles.
// We make use of `isDefined` here since an empty string
// or null value (which is what getPropertyValue will return
// for a non-existing style) will still be marked as a valid
// value for the style (a falsy value implies that the style
// is to be removed at the end of the animation). If we had a simple
// "OR" statement then it would not be enough to catch that.
function registerRestorableStyles(backup, node, properties) {
  forEach(properties, function(prop) {
    backup[prop] = isDefined(backup[prop])
        ? backup[prop]
        : node.style.getPropertyValue(prop);
  });
}

var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {
  var gcsLookup = createLocalCacheLookup();
  var gcsStaggerLookup = createLocalCacheLookup();

  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',
               '$$forceReflow', '$sniffer', '$$rAFScheduler', '$animate',
       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,
                $$forceReflow,   $sniffer,   $$rAFScheduler, $animate) {

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    var parentCounter = 0;
    function gcsHashFn(node, extraClasses) {
      var KEY = "$$ngAnimateParentKey";
      var parentNode = node.parentNode;
      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;
    }

    function computeCachedCssStyles(node, className, cacheKey, properties) {
      var timings = gcsLookup.get(cacheKey);

      if (!timings) {
        timings = computeCssStyles($window, node, properties);
        if (timings.animationIterationCount === 'infinite') {
          timings.animationIterationCount = 1;
        }
      }

      // we keep putting this in multiple times even though the value and the cacheKey are the same
      // because we're keeping an interal tally of how many duplicate animations are detected.
      gcsLookup.put(cacheKey, timings);
      return timings;
    }

    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
      var stagger;

      // if we have one or more existing matches of matching elements
      // containing the same parent + CSS styles (which is how cacheKey works)
      // then staggering is possible
      if (gcsLookup.count(cacheKey) > 0) {
        stagger = gcsStaggerLookup.get(cacheKey);

        if (!stagger) {
          var staggerClassName = pendClasses(className, '-stagger');

          $$jqLite.addClass(node, staggerClassName);

          stagger = computeCssStyles($window, node, properties);

          // force the conversion of a null value to zero incase not set
          stagger.animationDuration = Math.max(stagger.animationDuration, 0);
          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);

          $$jqLite.removeClass(node, staggerClassName);

          gcsStaggerLookup.put(cacheKey, stagger);
        }
      }

      return stagger || {};
    }

    var cancelLastRAFRequest;
    var rafWaitQueue = [];
    function waitUntilQuiet(callback) {
      rafWaitQueue.push(callback);
      $$rAFScheduler.waitUntilQuiet(function() {
        gcsLookup.flush();
        gcsStaggerLookup.flush();

        // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.
        // PLEASE EXAMINE THE `$$forceReflow` service to understand why.
        var pageWidth = $$forceReflow();

        // we use a for loop to ensure that if the queue is changed
        // during this looping then it will consider new requests
        for (var i = 0; i < rafWaitQueue.length; i++) {
          rafWaitQueue[i](pageWidth);
        }
        rafWaitQueue.length = 0;
      });
    }

    function computeTimings(node, className, cacheKey) {
      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);
      var aD = timings.animationDelay;
      var tD = timings.transitionDelay;
      timings.maxDelay = aD && tD
          ? Math.max(aD, tD)
          : (aD || tD);
      timings.maxDuration = Math.max(
          timings.animationDuration * timings.animationIterationCount,
          timings.transitionDuration);

      return timings;
    }

    return function init(element, options) {
      var restoreStyles = {};
      var node = getDomNode(element);
      if (!node
          || !node.parentNode
          || !$animate.enabled()) {
        return closeAndReturnNoopAnimator();
      }

      options = prepareAnimationOptions(options);

      var temporaryStyles = [];
      var classes = element.attr('class');
      var styles = packageStyles(options);
      var animationClosed;
      var animationPaused;
      var animationCompleted;
      var runner;
      var runnerHost;
      var maxDelay;
      var maxDelayTime;
      var maxDuration;
      var maxDurationTime;

      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {
        return closeAndReturnNoopAnimator();
      }

      var method = options.event && isArray(options.event)
            ? options.event.join(' ')
            : options.event;

      var isStructural = method && options.structural;
      var structuralClassName = '';
      var addRemoveClassName = '';

      if (isStructural) {
        structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);
      } else if (method) {
        structuralClassName = method;
      }

      if (options.addClass) {
        addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);
      }

      if (options.removeClass) {
        if (addRemoveClassName.length) {
          addRemoveClassName += ' ';
        }
        addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);
      }

      // there may be a situation where a structural animation is combined together
      // with CSS classes that need to resolve before the animation is computed.
      // However this means that there is no explicit CSS code to block the animation
      // from happening (by setting 0s none in the class name). If this is the case
      // we need to apply the classes before the first rAF so we know to continue if
      // there actually is a detected transition or keyframe animation
      if (options.applyClassesEarly && addRemoveClassName.length) {
        applyAnimationClasses(element, options);
      }

      var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();
      var fullClassName = classes + ' ' + preparationClasses;
      var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);
      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;
      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;

      // there is no way we can trigger an animation if no styles and
      // no classes are being applied which would then trigger a transition,
      // unless there a is raw keyframe value that is applied to the element.
      if (!containsKeyframeAnimation
           && !hasToStyles
           && !preparationClasses) {
        return closeAndReturnNoopAnimator();
      }

      var cacheKey, stagger;
      if (options.stagger > 0) {
        var staggerVal = parseFloat(options.stagger);
        stagger = {
          transitionDelay: staggerVal,
          animationDelay: staggerVal,
          transitionDuration: 0,
          animationDuration: 0
        };
      } else {
        cacheKey = gcsHashFn(node, fullClassName);
        stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
      }

      if (!options.$$skipPreparationClasses) {
        $$jqLite.addClass(element, preparationClasses);
      }

      var applyOnlyDuration;

      if (options.transitionStyle) {
        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];
        applyInlineStyle(node, transitionStyle);
        temporaryStyles.push(transitionStyle);
      }

      if (options.duration >= 0) {
        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);

        // we set the duration so that it will be picked up by getComputedStyle later
        applyInlineStyle(node, durationStyle);
        temporaryStyles.push(durationStyle);
      }

      if (options.keyframeStyle) {
        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];
        applyInlineStyle(node, keyframeStyle);
        temporaryStyles.push(keyframeStyle);
      }

      var itemIndex = stagger
          ? options.staggerIndex >= 0
              ? options.staggerIndex
              : gcsLookup.count(cacheKey)
          : 0;

      var isFirst = itemIndex === 0;

      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY
      // without causing any combination of transitions to kick in. By adding a negative delay value
      // it forces the setup class' transition to end immediately. We later then remove the negative
      // transition delay to allow for the transition to naturally do it's thing. The beauty here is
      // that if there is no transition defined then nothing will happen and this will also allow
      // other transitions to be stacked on top of each other without any chopping them out.
      if (isFirst && !options.skipBlocking) {
        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
      }

      var timings = computeTimings(node, fullClassName, cacheKey);
      var relativeDelay = timings.maxDelay;
      maxDelay = Math.max(relativeDelay, 0);
      maxDuration = timings.maxDuration;

      var flags = {};
      flags.hasTransitions          = timings.transitionDuration > 0;
      flags.hasAnimations           = timings.animationDuration > 0;
      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';
      flags.applyTransitionDuration = hasToStyles && (
                                        (flags.hasTransitions && !flags.hasTransitionAll)
                                         || (flags.hasAnimations && !flags.hasTransitions));
      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;
      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;
      flags.recalculateTimingStyles = addRemoveClassName.length > 0;

      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {
        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;

        if (flags.applyTransitionDuration) {
          flags.hasTransitions = true;
          timings.transitionDuration = maxDuration;
          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;
          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));
        }

        if (flags.applyAnimationDuration) {
          flags.hasAnimations = true;
          timings.animationDuration = maxDuration;
          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));
        }
      }

      if (maxDuration === 0 && !flags.recalculateTimingStyles) {
        return closeAndReturnNoopAnimator();
      }

      if (options.delay != null) {
        var delayStyle = parseFloat(options.delay);

        if (flags.applyTransitionDelay) {
          temporaryStyles.push(getCssDelayStyle(delayStyle));
        }

        if (flags.applyAnimationDelay) {
          temporaryStyles.push(getCssDelayStyle(delayStyle, true));
        }
      }

      // we need to recalculate the delay value since we used a pre-emptive negative
      // delay value and the delay value is required for the final event checking. This
      // property will ensure that this will happen after the RAF phase has passed.
      if (options.duration == null && timings.transitionDuration > 0) {
        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;
      }

      maxDelayTime = maxDelay * ONE_SECOND;
      maxDurationTime = maxDuration * ONE_SECOND;
      if (!options.skipBlocking) {
        flags.blockTransition = timings.transitionDuration > 0;
        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&
                                       stagger.animationDelay > 0 &&
                                       stagger.animationDuration === 0;
      }

      if (options.from) {
        if (options.cleanupStyles) {
          registerRestorableStyles(restoreStyles, node, Object.keys(options.from));
        }
        applyAnimationFromStyles(element, options);
      }

      if (flags.blockTransition || flags.blockKeyframeAnimation) {
        applyBlocking(maxDuration);
      } else if (!options.skipBlocking) {
        blockTransitions(node, false);
      }

      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging
      return {
        $$willAnimate: true,
        end: endFn,
        start: function() {
          if (animationClosed) return;

          runnerHost = {
            end: endFn,
            cancel: cancelFn,
            resume: null, //this will be set during the start() phase
            pause: null
          };

          runner = new $$AnimateRunner(runnerHost);

          waitUntilQuiet(start);

          // we don't have access to pause/resume the animation
          // since it hasn't run yet. AnimateRunner will therefore
          // set noop functions for resume and pause and they will
          // later be overridden once the animation is triggered
          return runner;
        }
      };

      function endFn() {
        close();
      }

      function cancelFn() {
        close(true);
      }

      function close(rejected) { // jshint ignore:line
        // if the promise has been called already then we shouldn't close
        // the animation again
        if (animationClosed || (animationCompleted && animationPaused)) return;
        animationClosed = true;
        animationPaused = false;

        if (!options.$$skipPreparationClasses) {
          $$jqLite.removeClass(element, preparationClasses);
        }
        $$jqLite.removeClass(element, activeClasses);

        blockKeyframeAnimations(node, false);
        blockTransitions(node, false);

        forEach(temporaryStyles, function(entry) {
          // There is only one way to remove inline style properties entirely from elements.
          // By using `removeProperty` this works, but we need to convert camel-cased CSS
          // styles down to hyphenated values.
          node.style[entry[0]] = '';
        });

        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);

        if (Object.keys(restoreStyles).length) {
          forEach(restoreStyles, function(value, prop) {
            value ? node.style.setProperty(prop, value)
                  : node.style.removeProperty(prop);
          });
        }

        // the reason why we have this option is to allow a synchronous closing callback
        // that is fired as SOON as the animation ends (when the CSS is removed) or if
        // the animation never takes off at all. A good example is a leave animation since
        // the element must be removed just after the animation is over or else the element
        // will appear on screen for one animation frame causing an overbearing flicker.
        if (options.onDone) {
          options.onDone();
        }

        // if the preparation function fails then the promise is not setup
        if (runner) {
          runner.complete(!rejected);
        }
      }

      function applyBlocking(duration) {
        if (flags.blockTransition) {
          blockTransitions(node, duration);
        }

        if (flags.blockKeyframeAnimation) {
          blockKeyframeAnimations(node, !!duration);
        }
      }

      function closeAndReturnNoopAnimator() {
        runner = new $$AnimateRunner({
          end: endFn,
          cancel: cancelFn
        });

        // should flush the cache animation
        waitUntilQuiet(noop);
        close();

        return {
          $$willAnimate: false,
          start: function() {
            return runner;
          },
          end: endFn
        };
      }

      function start() {
        if (animationClosed) return;
        if (!node.parentNode) {
          close();
          return;
        }

        var startTime, events = [];

        // even though we only pause keyframe animations here the pause flag
        // will still happen when transitions are used. Only the transition will
        // not be paused since that is not possible. If the animation ends when
        // paused then it will not complete until unpaused or cancelled.
        var playPause = function(playAnimation) {
          if (!animationCompleted) {
            animationPaused = !playAnimation;
            if (timings.animationDuration) {
              var value = blockKeyframeAnimations(node, animationPaused);
              animationPaused
                  ? temporaryStyles.push(value)
                  : removeFromArray(temporaryStyles, value);
            }
          } else if (animationPaused && playAnimation) {
            animationPaused = false;
            close();
          }
        };

        // checking the stagger duration prevents an accidently cascade of the CSS delay style
        // being inherited from the parent. If the transition duration is zero then we can safely
        // rely that the delay value is an intential stagger delay style.
        var maxStagger = itemIndex > 0
                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||
                            (timings.animationDuration && stagger.animationDuration === 0))
                         && Math.max(stagger.animationDelay, stagger.transitionDelay);
        if (maxStagger) {
          $timeout(triggerAnimationStart,
                   Math.floor(maxStagger * itemIndex * ONE_SECOND),
                   false);
        } else {
          triggerAnimationStart();
        }

        // this will decorate the existing promise runner with pause/resume methods
        runnerHost.resume = function() {
          playPause(true);
        };

        runnerHost.pause = function() {
          playPause(false);
        };

        function triggerAnimationStart() {
          // just incase a stagger animation kicks in when the animation
          // itself was cancelled entirely
          if (animationClosed) return;

          applyBlocking(false);

          forEach(temporaryStyles, function(entry) {
            var key = entry[0];
            var value = entry[1];
            node.style[key] = value;
          });

          applyAnimationClasses(element, options);
          $$jqLite.addClass(element, activeClasses);

          if (flags.recalculateTimingStyles) {
            fullClassName = node.className + ' ' + preparationClasses;
            cacheKey = gcsHashFn(node, fullClassName);

            timings = computeTimings(node, fullClassName, cacheKey);
            relativeDelay = timings.maxDelay;
            maxDelay = Math.max(relativeDelay, 0);
            maxDuration = timings.maxDuration;

            if (maxDuration === 0) {
              close();
              return;
            }

            flags.hasTransitions = timings.transitionDuration > 0;
            flags.hasAnimations = timings.animationDuration > 0;
          }

          if (flags.applyAnimationDelay) {
            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)
                  ? parseFloat(options.delay)
                  : relativeDelay;

            maxDelay = Math.max(relativeDelay, 0);
            timings.animationDelay = relativeDelay;
            delayStyle = getCssDelayStyle(relativeDelay, true);
            temporaryStyles.push(delayStyle);
            node.style[delayStyle[0]] = delayStyle[1];
          }

          maxDelayTime = maxDelay * ONE_SECOND;
          maxDurationTime = maxDuration * ONE_SECOND;

          if (options.easing) {
            var easeProp, easeVal = options.easing;
            if (flags.hasTransitions) {
              easeProp = TRANSITION_PROP + TIMING_KEY;
              temporaryStyles.push([easeProp, easeVal]);
              node.style[easeProp] = easeVal;
            }
            if (flags.hasAnimations) {
              easeProp = ANIMATION_PROP + TIMING_KEY;
              temporaryStyles.push([easeProp, easeVal]);
              node.style[easeProp] = easeVal;
            }
          }

          if (timings.transitionDuration) {
            events.push(TRANSITIONEND_EVENT);
          }

          if (timings.animationDuration) {
            events.push(ANIMATIONEND_EVENT);
          }

          startTime = Date.now();
          var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;
          var endTime = startTime + timerTime;

          var animationsData = element.data(ANIMATE_TIMER_KEY) || [];
          var setupFallbackTimer = true;
          if (animationsData.length) {
            var currentTimerData = animationsData[0];
            setupFallbackTimer = endTime > currentTimerData.expectedEndTime;
            if (setupFallbackTimer) {
              $timeout.cancel(currentTimerData.timer);
            } else {
              animationsData.push(close);
            }
          }

          if (setupFallbackTimer) {
            var timer = $timeout(onAnimationExpired, timerTime, false);
            animationsData[0] = {
              timer: timer,
              expectedEndTime: endTime
            };
            animationsData.push(close);
            element.data(ANIMATE_TIMER_KEY, animationsData);
          }

          element.on(events.join(' '), onAnimationProgress);
          if (options.to) {
            if (options.cleanupStyles) {
              registerRestorableStyles(restoreStyles, node, Object.keys(options.to));
            }
            applyAnimationToStyles(element, options);
          }
        }

        function onAnimationExpired() {
          var animationsData = element.data(ANIMATE_TIMER_KEY);

          // this will be false in the event that the element was
          // removed from the DOM (via a leave animation or something
          // similar)
          if (animationsData) {
            for (var i = 1; i < animationsData.length; i++) {
              animationsData[i]();
            }
            element.removeData(ANIMATE_TIMER_KEY);
          }
        }

        function onAnimationProgress(event) {
          event.stopPropagation();
          var ev = event.originalEvent || event;
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();

          /* Firefox (or possibly just Gecko) likes to not round values up
           * when a ms measurement is used for the animation */
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));

          /* $manualTimeStamp is a mocked timeStamp value which is set
           * within browserTrigger(). This is only here so that tests can
           * mock animations properly. Real events fallback to event.timeStamp,
           * or, if they don't, then a timeStamp is automatically created for them.
           * We're checking to see if the timeStamp surpasses the expected delay,
           * but we're using elapsedTime instead of the timeStamp on the 2nd
           * pre-condition since animations sometimes close off early */
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
            // we set this flag to ensure that if the transition is paused then, when resumed,
            // the animation will automatically close itself since transitions cannot be paused.
            animationCompleted = true;
            close();
          }
        }
      }
    };
  }];
}];

var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {
  $$animationProvider.drivers.push('$$animateCssDriver');

  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';
  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';

  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';
  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';

  function isDocumentFragment(node) {
    return node.parentNode && node.parentNode.nodeType === 11;
  }

  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$sniffer', '$$jqLite', '$document',
       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $sniffer,   $$jqLite,   $document) {

    // only browsers that support these properties can render animations
    if (!$sniffer.animations && !$sniffer.transitions) return noop;

    var bodyNode = $document[0].body;
    var rootNode = getDomNode($rootElement);

    var rootBodyElement = jqLite(
      // this is to avoid using something that exists outside of the body
      // we also special case the doc fragement case because our unit test code
      // appends the $rootElement to the body after the app has been bootstrapped
      isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode
    );

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    return function initDriverFn(animationDetails) {
      return animationDetails.from && animationDetails.to
          ? prepareFromToAnchorAnimation(animationDetails.from,
                                         animationDetails.to,
                                         animationDetails.classes,
                                         animationDetails.anchors)
          : prepareRegularAnimation(animationDetails);
    };

    function filterCssClasses(classes) {
      //remove all the `ng-` stuff
      return classes.replace(/\bng-\S+\b/g, '');
    }

    function getUniqueValues(a, b) {
      if (isString(a)) a = a.split(' ');
      if (isString(b)) b = b.split(' ');
      return a.filter(function(val) {
        return b.indexOf(val) === -1;
      }).join(' ');
    }

    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));
      var startingClasses = filterCssClasses(getClassVal(clone));

      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);

      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);

      rootBodyElement.append(clone);

      var animatorIn, animatorOut = prepareOutAnimation();

      // the user may not end up using the `out` animation and
      // only making use of the `in` animation or vice-versa.
      // In either case we should allow this and not assume the
      // animation is over unless both animations are not used.
      if (!animatorOut) {
        animatorIn = prepareInAnimation();
        if (!animatorIn) {
          return end();
        }
      }

      var startingAnimator = animatorOut || animatorIn;

      return {
        start: function() {
          var runner;

          var currentAnimation = startingAnimator.start();
          currentAnimation.done(function() {
            currentAnimation = null;
            if (!animatorIn) {
              animatorIn = prepareInAnimation();
              if (animatorIn) {
                currentAnimation = animatorIn.start();
                currentAnimation.done(function() {
                  currentAnimation = null;
                  end();
                  runner.complete();
                });
                return currentAnimation;
              }
            }
            // in the event that there is no `in` animation
            end();
            runner.complete();
          });

          runner = new $$AnimateRunner({
            end: endFn,
            cancel: endFn
          });

          return runner;

          function endFn() {
            if (currentAnimation) {
              currentAnimation.end();
            }
          }
        }
      };

      function calculateAnchorStyles(anchor) {
        var styles = {};

        var coords = getDomNode(anchor).getBoundingClientRect();

        // we iterate directly since safari messes up and doesn't return
        // all the keys for the coods object when iterated
        forEach(['width','height','top','left'], function(key) {
          var value = coords[key];
          switch (key) {
            case 'top':
              value += bodyNode.scrollTop;
              break;
            case 'left':
              value += bodyNode.scrollLeft;
              break;
          }
          styles[key] = Math.floor(value) + 'px';
        });
        return styles;
      }

      function prepareOutAnimation() {
        var animator = $animateCss(clone, {
          addClass: NG_OUT_ANCHOR_CLASS_NAME,
          delay: true,
          from: calculateAnchorStyles(outAnchor)
        });

        // read the comment within `prepareRegularAnimation` to understand
        // why this check is necessary
        return animator.$$willAnimate ? animator : null;
      }

      function getClassVal(element) {
        return element.attr('class') || '';
      }

      function prepareInAnimation() {
        var endingClasses = filterCssClasses(getClassVal(inAnchor));
        var toAdd = getUniqueValues(endingClasses, startingClasses);
        var toRemove = getUniqueValues(startingClasses, endingClasses);

        var animator = $animateCss(clone, {
          to: calculateAnchorStyles(inAnchor),
          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,
          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,
          delay: true
        });

        // read the comment within `prepareRegularAnimation` to understand
        // why this check is necessary
        return animator.$$willAnimate ? animator : null;
      }

      function end() {
        clone.remove();
        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
      }
    }

    function prepareFromToAnchorAnimation(from, to, classes, anchors) {
      var fromAnimation = prepareRegularAnimation(from, noop);
      var toAnimation = prepareRegularAnimation(to, noop);

      var anchorAnimations = [];
      forEach(anchors, function(anchor) {
        var outElement = anchor['out'];
        var inElement = anchor['in'];
        var animator = prepareAnchoredAnimation(classes, outElement, inElement);
        if (animator) {
          anchorAnimations.push(animator);
        }
      });

      // no point in doing anything when there are no elements to animate
      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;

      return {
        start: function() {
          var animationRunners = [];

          if (fromAnimation) {
            animationRunners.push(fromAnimation.start());
          }

          if (toAnimation) {
            animationRunners.push(toAnimation.start());
          }

          forEach(anchorAnimations, function(animation) {
            animationRunners.push(animation.start());
          });

          var runner = new $$AnimateRunner({
            end: endFn,
            cancel: endFn // CSS-driven animations cannot be cancelled, only ended
          });

          $$AnimateRunner.all(animationRunners, function(status) {
            runner.complete(status);
          });

          return runner;

          function endFn() {
            forEach(animationRunners, function(runner) {
              runner.end();
            });
          }
        }
      };
    }

    function prepareRegularAnimation(animationDetails) {
      var element = animationDetails.element;
      var options = animationDetails.options || {};

      if (animationDetails.structural) {
        options.event = animationDetails.event;
        options.structural = true;
        options.applyClassesEarly = true;

        // we special case the leave animation since we want to ensure that
        // the element is removed as soon as the animation is over. Otherwise
        // a flicker might appear or the element may not be removed at all
        if (animationDetails.event === 'leave') {
          options.onDone = options.domOperation;
        }
      }

      // We assign the preparationClasses as the actual animation event since
      // the internals of $animateCss will just suffix the event token values
      // with `-active` to trigger the animation.
      if (options.preparationClasses) {
        options.event = concatWithSpace(options.event, options.preparationClasses);
      }

      var animator = $animateCss(element, options);

      // the driver lookup code inside of $$animation attempts to spawn a
      // driver one by one until a driver returns a.$$willAnimate animator object.
      // $animateCss will always return an object, however, it will pass in
      // a flag as a hint as to whether an animation was detected or not
      return animator.$$willAnimate ? animator : null;
    }
  }];
}];

// TODO(matsko): use caching here to speed things up for detection
// TODO(matsko): add documentation
//  by the time...

var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {
  this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',
       function($injector,   $$AnimateRunner,   $$jqLite) {

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
         // $animateJs(element, 'enter');
    return function(element, event, classes, options) {
      // the `classes` argument is optional and if it is not used
      // then the classes will be resolved from the element's className
      // property as well as options.addClass/options.removeClass.
      if (arguments.length === 3 && isObject(classes)) {
        options = classes;
        classes = null;
      }

      options = prepareAnimationOptions(options);
      if (!classes) {
        classes = element.attr('class') || '';
        if (options.addClass) {
          classes += ' ' + options.addClass;
        }
        if (options.removeClass) {
          classes += ' ' + options.removeClass;
        }
      }

      var classesToAdd = options.addClass;
      var classesToRemove = options.removeClass;

      // the lookupAnimations function returns a series of animation objects that are
      // matched up with one or more of the CSS classes. These animation objects are
      // defined via the module.animation factory function. If nothing is detected then
      // we don't return anything which then makes $animation query the next driver.
      var animations = lookupAnimations(classes);
      var before, after;
      if (animations.length) {
        var afterFn, beforeFn;
        if (event == 'leave') {
          beforeFn = 'leave';
          afterFn = 'afterLeave'; // TODO(matsko): get rid of this
        } else {
          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);
          afterFn = event;
        }

        if (event !== 'enter' && event !== 'move') {
          before = packageAnimations(element, event, options, animations, beforeFn);
        }
        after  = packageAnimations(element, event, options, animations, afterFn);
      }

      // no matching animations
      if (!before && !after) return;

      function applyOptions() {
        options.domOperation();
        applyAnimationClasses(element, options);
      }

      return {
        start: function() {
          var closeActiveAnimations;
          var chain = [];

          if (before) {
            chain.push(function(fn) {
              closeActiveAnimations = before(fn);
            });
          }

          if (chain.length) {
            chain.push(function(fn) {
              applyOptions();
              fn(true);
            });
          } else {
            applyOptions();
          }

          if (after) {
            chain.push(function(fn) {
              closeActiveAnimations = after(fn);
            });
          }

          var animationClosed = false;
          var runner = new $$AnimateRunner({
            end: function() {
              endAnimations();
            },
            cancel: function() {
              endAnimations(true);
            }
          });

          $$AnimateRunner.chain(chain, onComplete);
          return runner;

          function onComplete(success) {
            animationClosed = true;
            applyOptions();
            applyAnimationStyles(element, options);
            runner.complete(success);
          }

          function endAnimations(cancelled) {
            if (!animationClosed) {
              (closeActiveAnimations || noop)(cancelled);
              onComplete(cancelled);
            }
          }
        }
      };

      function executeAnimationFn(fn, element, event, options, onDone) {
        var args;
        switch (event) {
          case 'animate':
            args = [element, options.from, options.to, onDone];
            break;

          case 'setClass':
            args = [element, classesToAdd, classesToRemove, onDone];
            break;

          case 'addClass':
            args = [element, classesToAdd, onDone];
            break;

          case 'removeClass':
            args = [element, classesToRemove, onDone];
            break;

          default:
            args = [element, onDone];
            break;
        }

        args.push(options);

        var value = fn.apply(fn, args);
        if (value) {
          if (isFunction(value.start)) {
            value = value.start();
          }

          if (value instanceof $$AnimateRunner) {
            value.done(onDone);
          } else if (isFunction(value)) {
            // optional onEnd / onCancel callback
            return value;
          }
        }

        return noop;
      }

      function groupEventedAnimations(element, event, options, animations, fnName) {
        var operations = [];
        forEach(animations, function(ani) {
          var animation = ani[fnName];
          if (!animation) return;

          // note that all of these animations will run in parallel
          operations.push(function() {
            var runner;
            var endProgressCb;

            var resolved = false;
            var onAnimationComplete = function(rejected) {
              if (!resolved) {
                resolved = true;
                (endProgressCb || noop)(rejected);
                runner.complete(!rejected);
              }
            };

            runner = new $$AnimateRunner({
              end: function() {
                onAnimationComplete();
              },
              cancel: function() {
                onAnimationComplete(true);
              }
            });

            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
              var cancelled = result === false;
              onAnimationComplete(cancelled);
            });

            return runner;
          });
        });

        return operations;
      }

      function packageAnimations(element, event, options, animations, fnName) {
        var operations = groupEventedAnimations(element, event, options, animations, fnName);
        if (operations.length === 0) {
          var a,b;
          if (fnName === 'beforeSetClass') {
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');
            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');
          } else if (fnName === 'setClass') {
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');
            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');
          }

          if (a) {
            operations = operations.concat(a);
          }
          if (b) {
            operations = operations.concat(b);
          }
        }

        if (operations.length === 0) return;

        // TODO(matsko): add documentation
        return function startAnimation(callback) {
          var runners = [];
          if (operations.length) {
            forEach(operations, function(animateFn) {
              runners.push(animateFn());
            });
          }

          runners.length ? $$AnimateRunner.all(runners, callback) : callback();

          return function endFn(reject) {
            forEach(runners, function(runner) {
              reject ? runner.cancel() : runner.end();
            });
          };
        };
      }
    };

    function lookupAnimations(classes) {
      classes = isArray(classes) ? classes : classes.split(' ');
      var matches = [], flagMap = {};
      for (var i=0; i < classes.length; i++) {
        var klass = classes[i],
            animationFactory = $animateProvider.$$registeredAnimations[klass];
        if (animationFactory && !flagMap[klass]) {
          matches.push($injector.get(animationFactory));
          flagMap[klass] = true;
        }
      }
      return matches;
    }
  }];
}];

var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {
  $$animationProvider.drivers.push('$$animateJsDriver');
  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {
    return function initDriverFn(animationDetails) {
      if (animationDetails.from && animationDetails.to) {
        var fromAnimation = prepareAnimation(animationDetails.from);
        var toAnimation = prepareAnimation(animationDetails.to);
        if (!fromAnimation && !toAnimation) return;

        return {
          start: function() {
            var animationRunners = [];

            if (fromAnimation) {
              animationRunners.push(fromAnimation.start());
            }

            if (toAnimation) {
              animationRunners.push(toAnimation.start());
            }

            $$AnimateRunner.all(animationRunners, done);

            var runner = new $$AnimateRunner({
              end: endFnFactory(),
              cancel: endFnFactory()
            });

            return runner;

            function endFnFactory() {
              return function() {
                forEach(animationRunners, function(runner) {
                  // at this point we cannot cancel animations for groups just yet. 1.5+
                  runner.end();
                });
              };
            }

            function done(status) {
              runner.complete(status);
            }
          }
        };
      } else {
        return prepareAnimation(animationDetails);
      }
    };

    function prepareAnimation(animationDetails) {
      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations
      var element = animationDetails.element;
      var event = animationDetails.event;
      var options = animationDetails.options;
      var classes = animationDetails.classes;
      return $$animateJs(element, event, classes, options);
    }
  }];
}];

var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';
var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';
var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {
  var PRE_DIGEST_STATE = 1;
  var RUNNING_STATE = 2;

  var rules = this.rules = {
    skip: [],
    cancel: [],
    join: []
  };

  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
    return rules[ruleType].some(function(fn) {
      return fn(element, currentAnimation, previousAnimation);
    });
  }

  function hasAnimationClasses(options, and) {
    options = options || {};
    var a = (options.addClass || '').length > 0;
    var b = (options.removeClass || '').length > 0;
    return and ? a && b : a || b;
  }

  rules.join.push(function(element, newAnimation, currentAnimation) {
    // if the new animation is class-based then we can just tack that on
    return !newAnimation.structural && hasAnimationClasses(newAnimation.options);
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // there is no need to animate anything if no classes are being added and
    // there is no structural animation that will be triggered
    return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // why should we trigger a new structural animation if the element will
    // be removed from the DOM anyway?
    return currentAnimation.event == 'leave' && newAnimation.structural;
  });

  rules.skip.push(function(element, newAnimation, currentAnimation) {
    // if there is an ongoing current animation then don't even bother running the class-based animation
    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    // there can never be two structural animations running at the same time
    return currentAnimation.structural && newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    // if the previous animation is already running, but the new animation will
    // be triggered, but the new animation is structural
    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
  });

  rules.cancel.push(function(element, newAnimation, currentAnimation) {
    var nO = newAnimation.options;
    var cO = currentAnimation.options;

    // if the exact same CSS class is added/removed then it's safe to cancel it
    return (nO.addClass && nO.addClass === cO.removeClass) || (nO.removeClass && nO.removeClass === cO.addClass);
  });

  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$HashMap',
               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite', '$$forceReflow',
       function($$rAF,   $rootScope,   $rootElement,   $document,   $$HashMap,
                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite,   $$forceReflow) {

    var activeAnimationsLookup = new $$HashMap();
    var disabledElementsLookup = new $$HashMap();
    var animationsEnabled = null;

    function postDigestTaskFactory() {
      var postDigestCalled = false;
      return function(fn) {
        // we only issue a call to postDigest before
        // it has first passed. This prevents any callbacks
        // from not firing once the animation has completed
        // since it will be out of the digest cycle.
        if (postDigestCalled) {
          fn();
        } else {
          $rootScope.$$postDigest(function() {
            postDigestCalled = true;
            fn();
          });
        }
      };
    }

    // Wait until all directive and route-related templates are downloaded and
    // compiled. The $templateRequest.totalPendingRequests variable keeps track of
    // all of the remote templates being currently downloaded. If there are no
    // templates currently downloading then the watcher will still fire anyway.
    var deregisterWatch = $rootScope.$watch(
      function() { return $templateRequest.totalPendingRequests === 0; },
      function(isEmpty) {
        if (!isEmpty) return;
        deregisterWatch();

        // Now that all templates have been downloaded, $animate will wait until
        // the post digest queue is empty before enabling animations. By having two
        // calls to $postDigest calls we can ensure that the flag is enabled at the
        // very end of the post digest queue. Since all of the animations in $animate
        // use $postDigest, it's important that the code below executes at the end.
        // This basically means that the page is fully downloaded and compiled before
        // any animations are triggered.
        $rootScope.$$postDigest(function() {
          $rootScope.$$postDigest(function() {
            // we check for null directly in the event that the application already called
            // .enabled() with whatever arguments that it provided it with
            if (animationsEnabled === null) {
              animationsEnabled = true;
            }
          });
        });
      }
    );

    var callbackRegistry = {};

    // remember that the classNameFilter is set during the provider/config
    // stage therefore we can optimize here and setup a helper function
    var classNameFilter = $animateProvider.classNameFilter();
    var isAnimatableClassName = !classNameFilter
              ? function() { return true; }
              : function(className) {
                return classNameFilter.test(className);
              };

    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    function normalizeAnimationOptions(element, options) {
      return mergeAnimationOptions(element, options, {});
    }

    function findCallbacks(element, event) {
      var targetNode = getDomNode(element);

      var matches = [];
      var entries = callbackRegistry[event];
      if (entries) {
        forEach(entries, function(entry) {
          if (entry.node.contains(targetNode)) {
            matches.push(entry.callback);
          }
        });
      }

      return matches;
    }

    return {
      on: function(event, container, callback) {
        var node = extractElementNode(container);
        callbackRegistry[event] = callbackRegistry[event] || [];
        callbackRegistry[event].push({
          node: node,
          callback: callback
        });
      },

      off: function(event, container, callback) {
        var entries = callbackRegistry[event];
        if (!entries) return;

        callbackRegistry[event] = arguments.length === 1
            ? null
            : filterFromRegistry(entries, container, callback);

        function filterFromRegistry(list, matchContainer, matchCallback) {
          var containerNode = extractElementNode(matchContainer);
          return list.filter(function(entry) {
            var isMatch = entry.node === containerNode &&
                            (!matchCallback || entry.callback === matchCallback);
            return !isMatch;
          });
        }
      },

      pin: function(element, parentElement) {
        assertArg(isElement(element), 'element', 'not an element');
        assertArg(isElement(parentElement), 'parentElement', 'not an element');
        element.data(NG_ANIMATE_PIN_DATA, parentElement);
      },

      push: function(element, event, options, domOperation) {
        options = options || {};
        options.domOperation = domOperation;
        return queueAnimation(element, event, options);
      },

      // this method has four signatures:
      //  () - global getter
      //  (bool) - global setter
      //  (element) - element getter
      //  (element, bool) - element setter<F37>
      enabled: function(element, bool) {
        var argCount = arguments.length;

        if (argCount === 0) {
          // () - Global getter
          bool = !!animationsEnabled;
        } else {
          var hasElement = isElement(element);

          if (!hasElement) {
            // (bool) - Global setter
            bool = animationsEnabled = !!element;
          } else {
            var node = getDomNode(element);
            var recordExists = disabledElementsLookup.get(node);

            if (argCount === 1) {
              // (element) - Element getter
              bool = !recordExists;
            } else {
              // (element, bool) - Element setter
              bool = !!bool;
              if (!bool) {
                disabledElementsLookup.put(node, true);
              } else if (recordExists) {
                disabledElementsLookup.remove(node);
              }
            }
          }
        }

        return bool;
      }
    };

    function queueAnimation(element, event, options) {
      var node, parent;
      element = stripCommentsFromElement(element);
      if (element) {
        node = getDomNode(element);
        parent = element.parent();
      }

      options = prepareAnimationOptions(options);

      // we create a fake runner with a working promise.
      // These methods will become available after the digest has passed
      var runner = new $$AnimateRunner();

      // this is used to trigger callbacks in postDigest mode
      var runInNextPostDigestOrNow = postDigestTaskFactory();

      if (isArray(options.addClass)) {
        options.addClass = options.addClass.join(' ');
      }

      if (options.addClass && !isString(options.addClass)) {
        options.addClass = null;
      }

      if (isArray(options.removeClass)) {
        options.removeClass = options.removeClass.join(' ');
      }

      if (options.removeClass && !isString(options.removeClass)) {
        options.removeClass = null;
      }

      if (options.from && !isObject(options.from)) {
        options.from = null;
      }

      if (options.to && !isObject(options.to)) {
        options.to = null;
      }

      // there are situations where a directive issues an animation for
      // a jqLite wrapper that contains only comment nodes... If this
      // happens then there is no way we can perform an animation
      if (!node) {
        close();
        return runner;
      }

      var className = [node.className, options.addClass, options.removeClass].join(' ');
      if (!isAnimatableClassName(className)) {
        close();
        return runner;
      }

      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;

      // this is a hard disable of all animations for the application or on
      // the element itself, therefore  there is no need to continue further
      // past this point if not enabled
      var skipAnimations = !animationsEnabled || disabledElementsLookup.get(node);
      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};
      var hasExistingAnimation = !!existingAnimation.state;

      // there is no point in traversing the same collection of parent ancestors if a followup
      // animation will be run on the same element that already did all that checking work
      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {
        skipAnimations = !areAnimationsAllowed(element, parent, event);
      }

      if (skipAnimations) {
        close();
        return runner;
      }

      if (isStructural) {
        closeChildAnimations(element);
      }

      var newAnimation = {
        structural: isStructural,
        element: element,
        event: event,
        close: close,
        options: options,
        runner: runner
      };

      if (hasExistingAnimation) {
        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);
        if (skipAnimationFlag) {
          if (existingAnimation.state === RUNNING_STATE) {
            close();
            return runner;
          } else {
            mergeAnimationOptions(element, existingAnimation.options, options);
            return existingAnimation.runner;
          }
        }

        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);
        if (cancelAnimationFlag) {
          if (existingAnimation.state === RUNNING_STATE) {
            // this will end the animation right away and it is safe
            // to do so since the animation is already running and the
            // runner callback code will run in async
            existingAnimation.runner.end();
          } else if (existingAnimation.structural) {
            // this means that the animation is queued into a digest, but
            // hasn't started yet. Therefore it is safe to run the close
            // method which will call the runner methods in async.
            existingAnimation.close();
          } else {
            // this will merge the new animation options into existing animation options
            mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);
            return existingAnimation.runner;
          }
        } else {
          // a joined animation means that this animation will take over the existing one
          // so an example would involve a leave animation taking over an enter. Then when
          // the postDigest kicks in the enter will be ignored.
          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);
          if (joinAnimationFlag) {
            if (existingAnimation.state === RUNNING_STATE) {
              normalizeAnimationOptions(element, options);
            } else {
              applyGeneratedPreparationClasses(element, isStructural ? event : null, options);

              event = newAnimation.event = existingAnimation.event;
              options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);

              //we return the same runner since only the option values of this animation will
              //be fed into the `existingAnimation`.
              return existingAnimation.runner;
            }
          }
        }
      } else {
        // normalization in this case means that it removes redundant CSS classes that
        // already exist (addClass) or do not exist (removeClass) on the element
        normalizeAnimationOptions(element, options);
      }

      // when the options are merged and cleaned up we may end up not having to do
      // an animation at all, therefore we should check this before issuing a post
      // digest callback. Structural animations will always run no matter what.
      var isValidAnimation = newAnimation.structural;
      if (!isValidAnimation) {
        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present
        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0)
                            || hasAnimationClasses(newAnimation.options);
      }

      if (!isValidAnimation) {
        close();
        clearElementAnimationState(element);
        return runner;
      }

      // the counter keeps track of cancelled animations
      var counter = (existingAnimation.counter || 0) + 1;
      newAnimation.counter = counter;

      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);

      $rootScope.$$postDigest(function() {
        var animationDetails = activeAnimationsLookup.get(node);
        var animationCancelled = !animationDetails;
        animationDetails = animationDetails || {};

        // if addClass/removeClass is called before something like enter then the
        // registered parent element may not be present. The code below will ensure
        // that a final value for parent element is obtained
        var parentElement = element.parent() || [];

        // animate/structural/class-based animations all have requirements. Otherwise there
        // is no point in performing an animation. The parent node must also be set.
        var isValidAnimation = parentElement.length > 0
                                && (animationDetails.event === 'animate'
                                    || animationDetails.structural
                                    || hasAnimationClasses(animationDetails.options));

        // this means that the previous animation was cancelled
        // even if the follow-up animation is the same event
        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {
          // if another animation did not take over then we need
          // to make sure that the domOperation and options are
          // handled accordingly
          if (animationCancelled) {
            applyAnimationClasses(element, options);
            applyAnimationStyles(element, options);
          }

          // if the event changed from something like enter to leave then we do
          // it, otherwise if it's the same then the end result will be the same too
          if (animationCancelled || (isStructural && animationDetails.event !== event)) {
            options.domOperation();
            runner.end();
          }

          // in the event that the element animation was not cancelled or a follow-up animation
          // isn't allowed to animate from here then we need to clear the state of the element
          // so that any future animations won't read the expired animation data.
          if (!isValidAnimation) {
            clearElementAnimationState(element);
          }

          return;
        }

        // this combined multiple class to addClass / removeClass into a setClass event
        // so long as a structural event did not take over the animation
        event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, true)
            ? 'setClass'
            : animationDetails.event;

        markElementAnimationState(element, RUNNING_STATE);
        var realRunner = $$animation(element, event, animationDetails.options);

        realRunner.done(function(status) {
          close(!status);
          var animationDetails = activeAnimationsLookup.get(node);
          if (animationDetails && animationDetails.counter === counter) {
            clearElementAnimationState(getDomNode(element));
          }
          notifyProgress(runner, event, 'close', {});
        });

        // this will update the runner's flow-control events based on
        // the `realRunner` object.
        runner.setHost(realRunner);
        notifyProgress(runner, event, 'start', {});
      });

      return runner;

      function notifyProgress(runner, event, phase, data) {
        runInNextPostDigestOrNow(function() {
          var callbacks = findCallbacks(element, event);
          if (callbacks.length) {
            // do not optimize this call here to RAF because
            // we don't know how heavy the callback code here will
            // be and if this code is buffered then this can
            // lead to a performance regression.
            $$rAF(function() {
              forEach(callbacks, function(callback) {
                callback(element, phase, data);
              });
            });
          }
        });
        runner.progress(event, phase, data);
      }

      function close(reject) { // jshint ignore:line
        clearGeneratedClasses(element, options);
        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);
        options.domOperation();
        runner.complete(!reject);
      }
    }

    function closeChildAnimations(element) {
      var node = getDomNode(element);
      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');
      forEach(children, function(child) {
        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));
        var animationDetails = activeAnimationsLookup.get(child);
        switch (state) {
          case RUNNING_STATE:
            animationDetails.runner.end();
            /* falls through */
          case PRE_DIGEST_STATE:
            if (animationDetails) {
              activeAnimationsLookup.remove(child);
            }
            break;
        }
      });
    }

    function clearElementAnimationState(element) {
      var node = getDomNode(element);
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);
      activeAnimationsLookup.remove(node);
    }

    function isMatchingElement(nodeOrElmA, nodeOrElmB) {
      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
    }

    function areAnimationsAllowed(element, parentElement, event) {
      var bodyElement = jqLite($document[0].body);
      var bodyElementDetected = isMatchingElement(element, bodyElement) || element[0].nodeName === 'HTML';
      var rootElementDetected = isMatchingElement(element, $rootElement);
      var parentAnimationDetected = false;
      var animateChildren;

      var parentHost = element.data(NG_ANIMATE_PIN_DATA);
      if (parentHost) {
        parentElement = parentHost;
      }

      while (parentElement && parentElement.length) {
        if (!rootElementDetected) {
          // angular doesn't want to attempt to animate elements outside of the application
          // therefore we need to ensure that the rootElement is an ancestor of the current element
          rootElementDetected = isMatchingElement(parentElement, $rootElement);
        }

        var parentNode = parentElement[0];
        if (parentNode.nodeType !== ELEMENT_NODE) {
          // no point in inspecting the #document element
          break;
        }

        var details = activeAnimationsLookup.get(parentNode) || {};
        // either an enter, leave or move animation will commence
        // therefore we can't allow any animations to take place
        // but if a parent animation is class-based then that's ok
        if (!parentAnimationDetected) {
          parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode);
        }

        if (isUndefined(animateChildren) || animateChildren === true) {
          var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);
          if (isDefined(value)) {
            animateChildren = value;
          }
        }

        // there is no need to continue traversing at this point
        if (parentAnimationDetected && animateChildren === false) break;

        if (!rootElementDetected) {
          // angular doesn't want to attempt to animate elements outside of the application
          // therefore we need to ensure that the rootElement is an ancestor of the current element
          rootElementDetected = isMatchingElement(parentElement, $rootElement);
          if (!rootElementDetected) {
            parentHost = parentElement.data(NG_ANIMATE_PIN_DATA);
            if (parentHost) {
              parentElement = parentHost;
            }
          }
        }

        if (!bodyElementDetected) {
          // we also need to ensure that the element is or will be apart of the body element
          // otherwise it is pointless to even issue an animation to be rendered
          bodyElementDetected = isMatchingElement(parentElement, bodyElement);
        }

        parentElement = parentElement.parent();
      }

      var allowAnimation = !parentAnimationDetected || animateChildren;
      return allowAnimation && rootElementDetected && bodyElementDetected;
    }

    function markElementAnimationState(element, state, details) {
      details = details || {};
      details.state = state;

      var node = getDomNode(element);
      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);

      var oldValue = activeAnimationsLookup.get(node);
      var newValue = oldValue
          ? extend(oldValue, details)
          : details;
      activeAnimationsLookup.put(node, newValue);
    }
  }];
}];

var $$AnimateAsyncRunFactory = ['$$rAF', function($$rAF) {
  var waitQueue = [];

  function waitForTick(fn) {
    waitQueue.push(fn);
    if (waitQueue.length > 1) return;
    $$rAF(function() {
      for (var i = 0; i < waitQueue.length; i++) {
        waitQueue[i]();
      }
      waitQueue = [];
    });
  }

  return function() {
    var passed = false;
    waitForTick(function() {
      passed = true;
    });
    return function(callback) {
      passed ? callback() : waitForTick(callback);
    };
  };
}];

var $$AnimateRunnerFactory = ['$q', '$sniffer', '$$animateAsyncRun',
                      function($q,   $sniffer,   $$animateAsyncRun) {

  var INITIAL_STATE = 0;
  var DONE_PENDING_STATE = 1;
  var DONE_COMPLETE_STATE = 2;

  AnimateRunner.chain = function(chain, callback) {
    var index = 0;

    next();
    function next() {
      if (index === chain.length) {
        callback(true);
        return;
      }

      chain[index](function(response) {
        if (response === false) {
          callback(false);
          return;
        }
        index++;
        next();
      });
    }
  };

  AnimateRunner.all = function(runners, callback) {
    var count = 0;
    var status = true;
    forEach(runners, function(runner) {
      runner.done(onProgress);
    });

    function onProgress(response) {
      status = status && response;
      if (++count === runners.length) {
        callback(status);
      }
    }
  };

  function AnimateRunner(host) {
    this.setHost(host);

    this._doneCallbacks = [];
    this._runInAnimationFrame = $$animateAsyncRun();
    this._state = 0;
  }

  AnimateRunner.prototype = {
    setHost: function(host) {
      this.host = host || {};
    },

    done: function(fn) {
      if (this._state === DONE_COMPLETE_STATE) {
        fn();
      } else {
        this._doneCallbacks.push(fn);
      }
    },

    progress: noop,

    getPromise: function() {
      if (!this.promise) {
        var self = this;
        this.promise = $q(function(resolve, reject) {
          self.done(function(status) {
            status === false ? reject() : resolve();
          });
        });
      }
      return this.promise;
    },

    then: function(resolveHandler, rejectHandler) {
      return this.getPromise().then(resolveHandler, rejectHandler);
    },

    'catch': function(handler) {
      return this.getPromise()['catch'](handler);
    },

    'finally': function(handler) {
      return this.getPromise()['finally'](handler);
    },

    pause: function() {
      if (this.host.pause) {
        this.host.pause();
      }
    },

    resume: function() {
      if (this.host.resume) {
        this.host.resume();
      }
    },

    end: function() {
      if (this.host.end) {
        this.host.end();
      }
      this._resolve(true);
    },

    cancel: function() {
      if (this.host.cancel) {
        this.host.cancel();
      }
      this._resolve(false);
    },

    complete: function(response) {
      var self = this;
      if (self._state === INITIAL_STATE) {
        self._state = DONE_PENDING_STATE;
        self._runInAnimationFrame(function() {
          self._resolve(response);
        });
      }
    },

    _resolve: function(response) {
      if (this._state !== DONE_COMPLETE_STATE) {
        forEach(this._doneCallbacks, function(fn) {
          fn(response);
        });
        this._doneCallbacks.length = 0;
        this._state = DONE_COMPLETE_STATE;
      }
    }
  };

  return AnimateRunner;
}];

var $$AnimationProvider = ['$animateProvider', function($animateProvider) {
  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';

  var drivers = this.drivers = [];

  var RUNNER_STORAGE_KEY = '$$animationRunner';

  function setRunner(element, runner) {
    element.data(RUNNER_STORAGE_KEY, runner);
  }

  function removeRunner(element) {
    element.removeData(RUNNER_STORAGE_KEY);
  }

  function getRunner(element) {
    return element.data(RUNNER_STORAGE_KEY);
  }

  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$HashMap', '$$rAFScheduler',
       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$HashMap,   $$rAFScheduler) {

    var animationQueue = [];
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);

    function sortAnimations(animations) {
      var tree = { children: [] };
      var i, lookup = new $$HashMap();

      // this is done first beforehand so that the hashmap
      // is filled with a list of the elements that will be animated
      for (i = 0; i < animations.length; i++) {
        var animation = animations[i];
        lookup.put(animation.domNode, animations[i] = {
          domNode: animation.domNode,
          fn: animation.fn,
          children: []
        });
      }

      for (i = 0; i < animations.length; i++) {
        processNode(animations[i]);
      }

      return flatten(tree);

      function processNode(entry) {
        if (entry.processed) return entry;
        entry.processed = true;

        var elementNode = entry.domNode;
        var parentNode = elementNode.parentNode;
        lookup.put(elementNode, entry);

        var parentEntry;
        while (parentNode) {
          parentEntry = lookup.get(parentNode);
          if (parentEntry) {
            if (!parentEntry.processed) {
              parentEntry = processNode(parentEntry);
            }
            break;
          }
          parentNode = parentNode.parentNode;
        }

        (parentEntry || tree).children.push(entry);
        return entry;
      }

      function flatten(tree) {
        var result = [];
        var queue = [];
        var i;

        for (i = 0; i < tree.children.length; i++) {
          queue.push(tree.children[i]);
        }

        var remainingLevelEntries = queue.length;
        var nextLevelEntries = 0;
        var row = [];

        for (i = 0; i < queue.length; i++) {
          var entry = queue[i];
          if (remainingLevelEntries <= 0) {
            remainingLevelEntries = nextLevelEntries;
            nextLevelEntries = 0;
            result.push(row);
            row = [];
          }
          row.push(entry.fn);
          entry.children.forEach(function(childEntry) {
            nextLevelEntries++;
            queue.push(childEntry);
          });
          remainingLevelEntries--;
        }

        if (row.length) {
          result.push(row);
        }

        return result;
      }
    }

    // TODO(matsko): document the signature in a better way
    return function(element, event, options) {
      options = prepareAnimationOptions(options);
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;

      // there is no animation at the current moment, however
      // these runner methods will get later updated with the
      // methods leading into the driver's end/cancel methods
      // for now they just stop the animation from starting
      var runner = new $$AnimateRunner({
        end: function() { close(); },
        cancel: function() { close(true); }
      });

      if (!drivers.length) {
        close();
        return runner;
      }

      setRunner(element, runner);

      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));
      var tempClasses = options.tempClasses;
      if (tempClasses) {
        classes += ' ' + tempClasses;
        options.tempClasses = null;
      }

      animationQueue.push({
        // this data is used by the postDigest code and passed into
        // the driver step function
        element: element,
        classes: classes,
        event: event,
        structural: isStructural,
        options: options,
        beforeStart: beforeStart,
        close: close
      });

      element.on('$destroy', handleDestroyedElement);

      // we only want there to be one function called within the post digest
      // block. This way we can group animations for all the animations that
      // were apart of the same postDigest flush call.
      if (animationQueue.length > 1) return runner;

      $rootScope.$$postDigest(function() {
        var animations = [];
        forEach(animationQueue, function(entry) {
          // the element was destroyed early on which removed the runner
          // form its storage. This means we can't animate this element
          // at all and it already has been closed due to destruction.
          if (getRunner(entry.element)) {
            animations.push(entry);
          } else {
            entry.close();
          }
        });

        // now any future animations will be in another postDigest
        animationQueue.length = 0;

        var groupedAnimations = groupAnimations(animations);
        var toBeSortedAnimations = [];

        forEach(groupedAnimations, function(animationEntry) {
          toBeSortedAnimations.push({
            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),
            fn: function triggerAnimationStart() {
              // it's important that we apply the `ng-animate` CSS class and the
              // temporary classes before we do any driver invoking since these
              // CSS classes may be required for proper CSS detection.
              animationEntry.beforeStart();

              var startAnimationFn, closeFn = animationEntry.close;

              // in the event that the element was removed before the digest runs or
              // during the RAF sequencing then we should not trigger the animation.
              var targetElement = animationEntry.anchors
                  ? (animationEntry.from.element || animationEntry.to.element)
                  : animationEntry.element;

              if (getRunner(targetElement)) {
                var operation = invokeFirstDriver(animationEntry);
                if (operation) {
                  startAnimationFn = operation.start;
                }
              }

              if (!startAnimationFn) {
                closeFn();
              } else {
                var animationRunner = startAnimationFn();
                animationRunner.done(function(status) {
                  closeFn(!status);
                });
                updateAnimationRunners(animationEntry, animationRunner);
              }
            }
          });
        });

        // we need to sort each of the animations in order of parent to child
        // relationships. This ensures that the child classes are applied at the
        // right time.
        $$rAFScheduler(sortAnimations(toBeSortedAnimations));
      });

      return runner;

      // TODO(matsko): change to reference nodes
      function getAnchorNodes(node) {
        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';
        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)
              ? [node]
              : node.querySelectorAll(SELECTOR);
        var anchors = [];
        forEach(items, function(node) {
          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
          if (attr && attr.length) {
            anchors.push(node);
          }
        });
        return anchors;
      }

      function groupAnimations(animations) {
        var preparedAnimations = [];
        var refLookup = {};
        forEach(animations, function(animation, index) {
          var element = animation.element;
          var node = getDomNode(element);
          var event = animation.event;
          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;
          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];

          if (anchorNodes.length) {
            var direction = enterOrMove ? 'to' : 'from';

            forEach(anchorNodes, function(anchor) {
              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
              refLookup[key] = refLookup[key] || {};
              refLookup[key][direction] = {
                animationID: index,
                element: jqLite(anchor)
              };
            });
          } else {
            preparedAnimations.push(animation);
          }
        });

        var usedIndicesLookup = {};
        var anchorGroups = {};
        forEach(refLookup, function(operations, key) {
          var from = operations.from;
          var to = operations.to;

          if (!from || !to) {
            // only one of these is set therefore we can't have an
            // anchor animation since all three pieces are required
            var index = from ? from.animationID : to.animationID;
            var indexKey = index.toString();
            if (!usedIndicesLookup[indexKey]) {
              usedIndicesLookup[indexKey] = true;
              preparedAnimations.push(animations[index]);
            }
            return;
          }

          var fromAnimation = animations[from.animationID];
          var toAnimation = animations[to.animationID];
          var lookupKey = from.animationID.toString();
          if (!anchorGroups[lookupKey]) {
            var group = anchorGroups[lookupKey] = {
              structural: true,
              beforeStart: function() {
                fromAnimation.beforeStart();
                toAnimation.beforeStart();
              },
              close: function() {
                fromAnimation.close();
                toAnimation.close();
              },
              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
              from: fromAnimation,
              to: toAnimation,
              anchors: [] // TODO(matsko): change to reference nodes
            };

            // the anchor animations require that the from and to elements both have at least
            // one shared CSS class which effictively marries the two elements together to use
            // the same animation driver and to properly sequence the anchor animation.
            if (group.classes.length) {
              preparedAnimations.push(group);
            } else {
              preparedAnimations.push(fromAnimation);
              preparedAnimations.push(toAnimation);
            }
          }

          anchorGroups[lookupKey].anchors.push({
            'out': from.element, 'in': to.element
          });
        });

        return preparedAnimations;
      }

      function cssClassesIntersection(a,b) {
        a = a.split(' ');
        b = b.split(' ');
        var matches = [];

        for (var i = 0; i < a.length; i++) {
          var aa = a[i];
          if (aa.substring(0,3) === 'ng-') continue;

          for (var j = 0; j < b.length; j++) {
            if (aa === b[j]) {
              matches.push(aa);
              break;
            }
          }
        }

        return matches.join(' ');
      }

      function invokeFirstDriver(animationDetails) {
        // we loop in reverse order since the more general drivers (like CSS and JS)
        // may attempt more elements, but custom drivers are more particular
        for (var i = drivers.length - 1; i >= 0; i--) {
          var driverName = drivers[i];
          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check

          var factory = $injector.get(driverName);
          var driver = factory(animationDetails);
          if (driver) {
            return driver;
          }
        }
      }

      function beforeStart() {
        element.addClass(NG_ANIMATE_CLASSNAME);
        if (tempClasses) {
          $$jqLite.addClass(element, tempClasses);
        }
      }

      function updateAnimationRunners(animation, newRunner) {
        if (animation.from && animation.to) {
          update(animation.from.element);
          update(animation.to.element);
        } else {
          update(animation.element);
        }

        function update(element) {
          getRunner(element).setHost(newRunner);
        }
      }

      function handleDestroyedElement() {
        var runner = getRunner(element);
        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {
          runner.end();
        }
      }

      function close(rejected) { // jshint ignore:line
        element.off('$destroy', handleDestroyedElement);
        removeRunner(element);

        applyAnimationClasses(element, options);
        applyAnimationStyles(element, options);
        options.domOperation();

        if (tempClasses) {
          $$jqLite.removeClass(element, tempClasses);
        }

        element.removeClass(NG_ANIMATE_CLASSNAME);
        runner.complete(!rejected);
      }
    };
  }];
}];

/* global angularAnimateModule: true,

   $$AnimateAsyncRunFactory,
   $$rAFSchedulerFactory,
   $$AnimateChildrenDirective,
   $$AnimateRunnerFactory,
   $$AnimateQueueProvider,
   $$AnimationProvider,
   $AnimateCssProvider,
   $$AnimateCssDriverProvider,
   $$AnimateJsProvider,
   $$AnimateJsDriverProvider,
*/

/**
 * @ngdoc module
 * @name ngAnimate
 * @description
 *
 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` the animation hooks are enabled for an Angular app.
 *
 * <div doc-module-components="ngAnimate"></div>
 *
 * # Usage
 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
 * the HTML element that the animation will be triggered on.
 *
 * ## Directive Support
 * The following directives are "animation aware":
 *
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *
 * (More information can be found by visiting each the documentation associated with each directive.)
 *
 * ## CSS-based Animations
 *
 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
 *
 * The example below shows how an `enter` animation can be made possible on an element using `ng-if`:
 *
 * ```html
 * <div ng-if="bool" class="fade">
 *    Fade me in out
 * </div>
 * <button ng-click="bool=true">Fade In!</button>
 * <button ng-click="bool=false">Fade Out!</button>
 * ```
 *
 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:
 *
 * ```css
 * /&#42; The starting CSS styles for the enter animation &#42;/
 * .fade.ng-enter {
 *   transition:0.5s linear all;
 *   opacity:0;
 * }
 *
 * /&#42; The finishing CSS styles for the enter animation &#42;/
 * .fade.ng-enter.ng-enter-active {
 *   opacity:1;
 * }
 * ```
 *
 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
 *
 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
 *
 * ```css
 * /&#42; now the element will fade out before it is removed from the DOM &#42;/
 * .fade.ng-leave {
 *   transition:0.5s linear all;
 *   opacity:1;
 * }
 * .fade.ng-leave.ng-leave-active {
 *   opacity:0;
 * }
 * ```
 *
 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:
 *
 * ```css
 * /&#42; there is no need to define anything inside of the destination
 * CSS class since the keyframe will take charge of the animation &#42;/
 * .fade.ng-leave {
 *   animation: my_fade_animation 0.5s linear;
 *   -webkit-animation: my_fade_animation 0.5s linear;
 * }
 *
 * @keyframes my_fade_animation {
 *   from { opacity:1; }
 *   to { opacity:0; }
 * }
 *
 * @-webkit-keyframes my_fade_animation {
 *   from { opacity:1; }
 *   to { opacity:0; }
 * }
 * ```
 *
 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.
 *
 * ### CSS Class-based Animations
 *
 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
 * and removed.
 *
 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class:
 *
 * ```html
 * <div ng-show="bool" class="fade">
 *   Show and hide me
 * </div>
 * <button ng-click="bool=true">Toggle</button>
 *
 * <style>
 * .fade.ng-hide {
 *   transition:0.5s linear all;
 *   opacity:0;
 * }
 * </style>
 * ```
 *
 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.
 *
 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
 * with CSS styles.
 *
 * ```html
 * <div ng-class="{on:onOff}" class="highlight">
 *   Highlight this box
 * </div>
 * <button ng-click="onOff=!onOff">Toggle</button>
 *
 * <style>
 * .highlight {
 *   transition:0.5s linear all;
 * }
 * .highlight.on-add {
 *   background:white;
 * }
 * .highlight.on {
 *   background:yellow;
 * }
 * .highlight.on-remove {
 *   background:black;
 * }
 * </style>
 * ```
 *
 * We can also make use of CSS keyframes by placing them within the CSS classes.
 *
 *
 * ### CSS Staggering Animations
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).
 *
 * ```css
 * .my-animation.ng-enter {
 *   /&#42; standard transition code &#42;/
 *   transition: 1s linear all;
 *   opacity:0;
 * }
 * .my-animation.ng-enter-stagger {
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/
 *   transition-delay: 0.1s;
 *
 *   /&#42; As of 1.4.4, this must always be set: it signals ngAnimate
 *     to not accidentally inherit a delay property from another CSS class &#42;/
 *   transition-duration: 0s;
 * }
 * .my-animation.ng-enter.ng-enter-active {
 *   /&#42; standard transition styles &#42;/
 *   opacity:1;
 * }
 * ```
 *
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.
 *
 * The following code will issue the **ng-leave-stagger** event on the element provided:
 *
 * ```js
 * var kids = parent.children();
 *
 * $animate.leave(kids[0]); //stagger index=0
 * $animate.leave(kids[1]); //stagger index=1
 * $animate.leave(kids[2]); //stagger index=2
 * $animate.leave(kids[3]); //stagger index=3
 * $animate.leave(kids[4]); //stagger index=4
 *
 * window.requestAnimationFrame(function() {
 *   //stagger has reset itself
 *   $animate.leave(kids[5]); //stagger index=0
 *   $animate.leave(kids[6]); //stagger index=1
 *
 *   $scope.$digest();
 * });
 * ```
 *
 * Stagger animations are currently only supported within CSS-defined animations.
 *
 * ### The `ng-animate` CSS class
 *
 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
 *
 * Therefore, animations can be applied to an element using this temporary class directly via CSS.
 *
 * ```css
 * .zipper.ng-animate {
 *   transition:0.5s linear all;
 * }
 * .zipper.ng-enter {
 *   opacity:0;
 * }
 * .zipper.ng-enter.ng-enter-active {
 *   opacity:1;
 * }
 * .zipper.ng-leave {
 *   opacity:1;
 * }
 * .zipper.ng-leave.ng-leave-active {
 *   opacity:0;
 * }
 * ```
 *
 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
 * the CSS class once an animation has completed.)
 *
 *
 * ## JavaScript-based Animations
 *
 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
 * `module.animation()` module function we can register the ainmation.
 *
 * Let's see an example of a enter/leave animation using `ngRepeat`:
 *
 * ```html
 * <div ng-repeat="item in items" class="slide">
 *   {{ item }}
 * </div>
 * ```
 *
 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
 *
 * ```js
 * myModule.animation('.slide', [function() {
 *   return {
 *     // make note that other events (like addClass/removeClass)
 *     // have different function input parameters
 *     enter: function(element, doneFn) {
 *       jQuery(element).fadeIn(1000, doneFn);
 *
 *       // remember to call doneFn so that angular
 *       // knows that the animation has concluded
 *     },
 *
 *     move: function(element, doneFn) {
 *       jQuery(element).fadeIn(1000, doneFn);
 *     },
 *
 *     leave: function(element, doneFn) {
 *       jQuery(element).fadeOut(1000, doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
 * greensock.js and velocity.js.
 *
 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
 * our animations inside of the same registered animation, however, the function input arguments are a bit different:
 *
 * ```html
 * <div ng-class="color" class="colorful">
 *   this box is moody
 * </div>
 * <button ng-click="color='red'">Change to red</button>
 * <button ng-click="color='blue'">Change to blue</button>
 * <button ng-click="color='green'">Change to green</button>
 * ```
 *
 * ```js
 * myModule.animation('.colorful', [function() {
 *   return {
 *     addClass: function(element, className, doneFn) {
 *       // do some cool animation and call the doneFn
 *     },
 *     removeClass: function(element, className, doneFn) {
 *       // do some cool animation and call the doneFn
 *     },
 *     setClass: function(element, addedClass, removedClass, doneFn) {
 *       // do some cool animation and call the doneFn
 *     }
 *   }
 * }]
 * ```
 *
 * ## CSS + JS Animations Together
 *
 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
 * charge of the animation**:
 *
 * ```html
 * <div ng-if="bool" class="slide">
 *   Slide in and out
 * </div>
 * ```
 *
 * ```js
 * myModule.animation('.slide', [function() {
 *   return {
 *     enter: function(element, doneFn) {
 *       jQuery(element).slideIn(1000, doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * ```css
 * .slide.ng-enter {
 *   transition:0.5s linear all;
 *   transform:translateY(-100px);
 * }
 * .slide.ng-enter.ng-enter-active {
 *   transform:translateY(0);
 * }
 * ```
 *
 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
 * our own JS-based animation code:
 *
 * ```js
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.
 *       var runner = $animateCss(element, {
 *         event: 'enter',
 *         structural: true
 *       }).start();
*        runner.done(doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
 *
 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
 * data into `$animateCss` directly:
 *
 * ```js
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {
 *   return {
 *     enter: function(element, doneFn) {
 *       var runner = $animateCss(element, {
 *         event: 'enter',
 *         structural: true,
 *         addClass: 'maroon-setting',
 *         from: { height:0 },
 *         to: { height: 200 }
 *       }).start();
 *
 *       runner.done(doneFn);
 *     }
 *   }
 * }]
 * ```
 *
 * Now we can fill in the rest via our transition CSS code:
 *
 * ```css
 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/
 * .slide.ng-enter { transition:0.5s linear all; }
 *
 * /&#42; this extra CSS class will be absorbed into the transition
 * since the $animateCss code is adding the class &#42;/
 * .maroon-setting { background:red; }
 * ```
 *
 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
 *
 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.
 *
 * ## Animation Anchoring (via `ng-animate-ref`)
 *
 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between
 * structural areas of an application (like views) by pairing up elements using an attribute
 * called `ng-animate-ref`.
 *
 * Let's say for example we have two views that are managed by `ng-view` and we want to show
 * that there is a relationship between two components situated in within these views. By using the
 * `ng-animate-ref` attribute we can identify that the two components are paired together and we
 * can then attach an animation, which is triggered when the view changes.
 *
 * Say for example we have the following template code:
 *
 * ```html
 * <!-- index.html -->
 * <div ng-view class="view-animation">
 * </div>
 *
 * <!-- home.html -->
 * <a href="#/banner-page">
 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
 * </a>
 *
 * <!-- banner-page.html -->
 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">
 * ```
 *
 * Now, when the view changes (once the link is clicked), ngAnimate will examine the
 * HTML contents to see if there is a match reference between any components in the view
 * that is leaving and the view that is entering. It will scan both the view which is being
 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that
 * contain a matching ref value.
 *
 * The two images match since they share the same ref value. ngAnimate will now create a
 * transport element (which is a clone of the first image element) and it will then attempt
 * to animate to the position of the second image element in the next view. For the animation to
 * work a special CSS class called `ng-anchor` will be added to the transported element.
 *
 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then
 * ngAnimate will handle the entire transition for us as well as the addition and removal of
 * any changes of CSS classes between the elements:
 *
 * ```css
 * .banner.ng-anchor {
 *   /&#42; this animation will last for 1 second since there are
 *          two phases to the animation (an `in` and an `out` phase) &#42;/
 *   transition:0.5s linear all;
 * }
 * ```
 *
 * We also **must** include animations for the views that are being entered and removed
 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).
 *
 * ```css
 * .view-animation.ng-enter, .view-animation.ng-leave {
 *   transition:0.5s linear all;
 *   position:fixed;
 *   left:0;
 *   top:0;
 *   width:100%;
 * }
 * .view-animation.ng-enter {
 *   transform:translateX(100%);
 * }
 * .view-animation.ng-leave,
 * .view-animation.ng-enter.ng-enter-active {
 *   transform:translateX(0%);
 * }
 * .view-animation.ng-leave.ng-leave-active {
 *   transform:translateX(-100%);
 * }
 * ```
 *
 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:
 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away
 * from its origin. Once that animation is over then the `in` stage occurs which animates the
 * element to its destination. The reason why there are two animations is to give enough time
 * for the enter animation on the new element to be ready.
 *
 * The example above sets up a transition for both the in and out phases, but we can also target the out or
 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.
 *
 * ```css
 * .banner.ng-anchor-out {
 *   transition: 0.5s linear all;
 *
 *   /&#42; the scale will be applied during the out animation,
 *          but will be animated away when the in animation runs &#42;/
 *   transform: scale(1.2);
 * }
 *
 * .banner.ng-anchor-in {
 *   transition: 1s linear all;
 * }
 * ```
 *
 *
 *
 *
 * ### Anchoring Demo
 *
  <example module="anchoringExample"
           name="anchoringExample"
           id="anchoringExample"
           deps="angular-animate.js;angular-route.js"
           animations="true">
    <file name="index.html">
      <a href="#/">Home</a>
      <hr />
      <div class="view-container">
        <div ng-view class="view"></div>
      </div>
    </file>
    <file name="script.js">
      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController as home'
          });
          $routeProvider.when('/profile/:id', {
            templateUrl: 'profile.html',
            controller: 'ProfileController as profile'
          });
        }])
        .run(['$rootScope', function($rootScope) {
          $rootScope.records = [
            { id:1, title: "Miss Beulah Roob" },
            { id:2, title: "Trent Morissette" },
            { id:3, title: "Miss Ava Pouros" },
            { id:4, title: "Rod Pouros" },
            { id:5, title: "Abdul Rice" },
            { id:6, title: "Laurie Rutherford Sr." },
            { id:7, title: "Nakia McLaughlin" },
            { id:8, title: "Jordon Blanda DVM" },
            { id:9, title: "Rhoda Hand" },
            { id:10, title: "Alexandrea Sauer" }
          ];
        }])
        .controller('HomeController', [function() {
          //empty
        }])
        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {
          var index = parseInt($routeParams.id, 10);
          var record = $rootScope.records[index - 1];

          this.title = record.title;
          this.id = record.id;
        }]);
    </file>
    <file name="home.html">
      <h2>Welcome to the home page</h1>
      <p>Please click on an element</p>
      <a class="record"
         ng-href="#/profile/{{ record.id }}"
         ng-animate-ref="{{ record.id }}"
         ng-repeat="record in records">
        {{ record.title }}
      </a>
    </file>
    <file name="profile.html">
      <div class="profile record" ng-animate-ref="{{ profile.id }}">
        {{ profile.title }}
      </div>
    </file>
    <file name="animations.css">
      .record {
        display:block;
        font-size:20px;
      }
      .profile {
        background:black;
        color:white;
        font-size:100px;
      }
      .view-container {
        position:relative;
      }
      .view-container > .view.ng-animate {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        min-height:500px;
      }
      .view.ng-enter, .view.ng-leave,
      .record.ng-anchor {
        transition:0.5s linear all;
      }
      .view.ng-enter {
        transform:translateX(100%);
      }
      .view.ng-enter.ng-enter-active, .view.ng-leave {
        transform:translateX(0%);
      }
      .view.ng-leave.ng-leave-active {
        transform:translateX(-100%);
      }
      .record.ng-anchor-out {
        background:red;
      }
    </file>
  </example>
 *
 * ### How is the element transported?
 *
 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element
 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match
 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
 * will become visible since the shim class will be removed.
 *
 * ### How is the morphing handled?
 *
 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out
 * what CSS classes differ between the starting element and the destination element. These different CSS classes
 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided
 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will
 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that
 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since
 * the cloned element is placed inside of root element which is likely close to the body element).
 *
 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.
 *
 *
 * ## Using $animate in your directive code
 *
 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
 * imagine we have a greeting box that shows and hides itself when the data changes
 *
 * ```html
 * <greeting-box active="onOrOff">Hi there</greeting-box>
 * ```
 *
 * ```js
 * ngModule.directive('greetingBox', ['$animate', function($animate) {
 *   return function(scope, element, attrs) {
 *     attrs.$observe('active', function(value) {
 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');
 *     });
 *   });
 * }]);
 * ```
 *
 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
 * in our HTML code then we can trigger a CSS or JS animation to happen.
 *
 * ```css
 * /&#42; normally we would create a CSS class to reference on the element &#42;/
 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }
 * ```
 *
 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
 * possible be sure to visit the {@link ng.$animate $animate service API page}.
 *
 *
 * ### Preventing Collisions With Third Party Libraries
 *
 * Some third-party frameworks place animation duration defaults across many element or className
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which
 * is expecting actual animations on these elements and has to wait for their completion.
 *
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:
 *
 * ```css
 * /&#42; prefixed with animate- &#42;/
 * .animate-fade-add.animate-fade-add-active {
 *   transition:1s linear all;
 *   opacity:0;
 * }
 * ```
 *
 * You then configure `$animate` to enforce this prefix:
 *
 * ```js
 * $animateProvider.classNameFilter(/animate-/);
 * ```
 *
 * This also may provide your application with a speed boost since only specific elements containing CSS class prefix
 * will be evaluated for animation when any DOM changes occur in the application.
 *
 * ## Callbacks and Promises
 *
 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
 * ended by chaining onto the returned promise that animation method returns.
 *
 * ```js
 * // somewhere within the depths of the directive
 * $animate.enter(element, parent).then(function() {
 *   //the animation has completed
 * });
 * ```
 *
 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
 * anymore.)
 *
 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view
 * routing controller to hook into that:
 *
 * ```js
 * ngModule.controller('HomePageController', ['$animate', function($animate) {
 *   $animate.on('enter', ngViewElement, function(element) {
 *     // the animation for this route has completed
 *   }]);
 * }])
 * ```
 *
 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
 */

/**
 * @ngdoc service
 * @name $animate
 * @kind object
 *
 * @description
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.
 *
 * Click here {@link ng.$animate to learn more about animations with `$animate`}.
 */
angular.module('ngAnimate', [])
  .directive('ngAnimateChildren', $$AnimateChildrenDirective)
  .factory('$$rAFScheduler', $$rAFSchedulerFactory)

  .factory('$$AnimateRunner', $$AnimateRunnerFactory)
  .factory('$$animateAsyncRun', $$AnimateAsyncRunFactory)

  .provider('$$animateQueue', $$AnimateQueueProvider)
  .provider('$$animation', $$AnimationProvider)

  .provider('$animateCss', $AnimateCssProvider)
  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)

  .provider('$$animateJs', $$AnimateJsProvider)
  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);


})(window, window.angular);
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "a.m.",
      "p.m."
    ],
    "DAY": [
      "domingo",
      "lunes",
      "martes",
      "mi\u00e9rcoles",
      "jueves",
      "viernes",
      "s\u00e1bado"
    ],
    "MONTH": [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ],
    "SHORTDAY": [
      "dom",
      "lun",
      "mar",
      "mi\u00e9",
      "jue",
      "vie",
      "s\u00e1b"
    ],
    "SHORTMONTH": [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic"
    ],
    "fullDate": "EEEE, d 'de' MMMM 'de' y",
    "longDate": "d 'de' MMMM 'de' y",
    "medium": "dd/MM/yyyy HH:mm:ss",
    "mediumDate": "dd/MM/yyyy",
    "mediumTime": "HH:mm:ss",
    "short": "dd/MM/yy HH:mm",
    "shortDate": "dd/MM/yy",
    "shortTime": "HH:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20ac",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": ".",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "macFrac": 0,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "macFrac": 0,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "es-es",
  "pluralCat": function (n) {  if (n == 1) {   return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
kwh = 'kWh'
kw = 'kW'
mwh = 'MWh'


function actualizardatos1(){

var message;
var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.datos1',message);


dispatcher.bind('graficos.data11', function(task) {


//generacion solar
document.getElementById('generaciónactualsolar').innerHTML=task[0]+" "+kw;
document.getElementById('energiageneradahoysolar').innerHTML=task[1]+" "+kwh;
document.getElementById('energiageneradaesteañosolar').innerHTML=task[2]+" "+mwh;
document.getElementById('energiainyectadasolar').innerHTML=14+" "+kwh;
//consumo edificio
document.getElementById('energiaconsumidactualee').innerHTML=task[4]+" "+kw;
document.getElementById('energiaconsumidahoyee').innerHTML=task[5]+" "+kwh;
document.getElementById('energiaconsumidaesteañoee').innerHTML=task[6]+" "+mwh;
document.getElementById('energiatotalconsumidaee').innerHTML=task[7]+" "+mwh;


var dinero = task[8];
var co2 = task[9];
var ar = task[10];

//tabla ahorros

if (dinero > 999999) {

	dinero = (dinero/1000000).toFixed(1);
	document.getElementById('ahorrosolar').innerHTML="$ "+dinero+" M";
}
else{

document.getElementById('ahorrosolar').innerHTML="$ "+dinero;

};

if (co2 > 999999) {

	co2 = (co2/1000000).toFixed(1);
	document.getElementById('co2solar').innerHTML=co2+" TM";
}
else{

document.getElementById('co2solar').innerHTML=co2+" TON";

};

if (ar > 999999) {

	ar = (ar/1000000).toFixed(1);
	document.getElementById('arbolsolar').innerHTML=ar+" UM";
}
else{

document.getElementById('arbolsolar').innerHTML=ar+" unidades";

};



});

};
     
function actualizardatos2(){

var message;
var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.datos2',message);


dispatcher.bind('graficos.data22', function(task) {


//generacion solar
document.getElementById('generaciónactualsolar').innerHTML=task[0]+" "+kw;
document.getElementById('energiageneradahoysolar').innerHTML=task[1]+" "+kwh;
document.getElementById('energiageneradaesteañosolar').innerHTML=task[2]+" "+mwh;
document.getElementById('energiainyectadasolar').innerHTML=14+" "+kwh;
//tabla ahorros
var dinero = task[4];
var co2 = task[5];
var ar = task[6];

//tabla ahorros

if (dinero > 999999) {

	dinero = (dinero/1000000).toFixed(1);
	document.getElementById('ahorrosolar').innerHTML="$ "+dinero+" M";
}
else{

document.getElementById('ahorrosolar').innerHTML="$ "+dinero;

};

if (co2 > 999999) {

	co2 = (co2/1000000).toFixed(1);
	document.getElementById('co2solar').innerHTML=co2+" TM";
}
else{

document.getElementById('co2solar').innerHTML=co2+" TON";

};

if (ar > 999999) {

	ar = (ar/1000000).toFixed(1);
	document.getElementById('arbolsolar').innerHTML=ar+" UM";
}
else{

document.getElementById('arbolsolar').innerHTML=ar+" unidades";

};

});     





 
};
function actualizardatos3(){

var message;

var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.datos3',message);


dispatcher.bind('graficos.data33', function(task) {

console.log(task);

//consumo edificio
document.getElementById('energiaconsumidactualee').innerHTML=task[0]+" "+kw;
document.getElementById('energiaconsumidahoyee').innerHTML=task[1]+" "+kwh;
document.getElementById('energiaconsumidaesteañoee').innerHTML=task[2]+" "+mwh;
document.getElementById('energiatotalconsumidaee').innerHTML=task[3]+" "+mwh;
var dinero = task[4];
var co2 = task[5];
var ar = task[6];

//tabla ahorros

if (dinero > 999999) {

	dinero = (dinero/1000000).toFixed(1);
	document.getElementById('gastoee').innerHTML="$ "+dinero+" M";
}
else{

document.getElementById('gastoee').innerHTML="$ "+dinero;

};

if (co2 > 999999) {

	co2 = (co2/1000000).toFixed(1);
	document.getElementById('co2ee').innerHTML=co2+" TM";
}
else{

document.getElementById('co2ee').innerHTML=co2+" TON";

};

if (ar > 999999) {

	ar = (ar/1000000).toFixed(1);
	document.getElementById('arbolee').innerHTML=ar+" UM";
}
else{

document.getElementById('arbolee').innerHTML=ar+" unidades";

};
});     





 
};


function configuracion(){
datodes='ee';
tipodes='mes';	
tiempo=10000;
titulo1=0;
titulo2=0;
time1=0;
dato1=0;
tipo1=0;
time2=0;
dato2=0;
tipo2=0;
time3=0;
dato3=0;
tipo3=0;
message=0;
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.configuracion',message);
dispatcher.bind('graficos.configuracion', function(task) {

titulo1=task[0];
tipo1=task[1];
año1=task[2];
mes1=task[3];
dia1=task[4];
titulo2=task[5];
tipo2=task[6];
año2=task[7];
mes2=task[8];
dia2=task[9];
titulo3=task[10];
tipo3=task[11];
año3=task[12];
mes3=task[13];
dia3=task[14];
tiempo=task[15];
sic=task[16];
tarifa=task[17];

valores1 = "Gráfico de "+titulo1 + " durante el " + tipo1 + " del " + año1+"-"+mes1+"-"+dia1 +" en vista 1"; 
document.getElementById('vistauno').innerHTML=valores1;
valores2 = "Gráfico de "+titulo2 + " durante el " + tipo2 + " del " + año2+"-"+mes2+"-"+dia2 +" en vista 2"; 
document.getElementById('vistados').innerHTML=valores2;
valores3 = "Gráfico de "+titulo3 + " durante el " + tipo3 + " del " + año3+"-"+mes3+"-"+dia3 +" en vista 3"; 
document.getElementById('vistatres').innerHTML=valores3;

//set prev config
document.getElementById('seg').value=tiempo;
document.getElementById('sic').value=sic;
document.getElementById('tarifa').value=tarifa;



});

};


//configuracion vista uno

function guardaruno(){

time1 = document.getElementById('time1').value;
date = time1.split("-");
año1 = date[0];
mes1= date[1];
dia1 = date[2];

message=[año1,mes1,dia1,dato1,tipo1,titulo1]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardaruno',message);
dispatcher.bind('graficos.guardaruno', function(task) {
console.log(task);

});



configuracion();


};


function datouno (data){

if (data ===0){
document.getElementById('dato1').innerHTML='Energia consumida edificio';
return dato1 = 'ee',titulo1='Energia consumida edificio'
}else if(data ===1){
document.getElementById('dato1').innerHTML='Energia generada planta fotovoltáica';
return  dato1 = 'es',titulo1='Energia generada planta fotovoltáica'
}else if(data ===2){
document.getElementById('dato1').innerHTML='Errores';
return dato1 = 'error',titulo1='Errores'
}

};

function tipouno (data){

if (data ===0){

return tipo1 = 'dia'
}else if(data ===1){

return  tipo1 = 'mes'
}else if(data ===2){

return tipo1 = 'año'
}

};

//configuracion vista dos

function guardardos(){

time2 = document.getElementById('time2').value;
date = time2.split("-");
año2 = date[0];
mes2= date[1];
dia2 = date[2];

message=[año2,mes2,dia2,dato2,tipo2,titulo2]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardardos',message);
dispatcher.bind('graficos.guardardos', function(task) {
console.log(task);

});



configuracion();


};


function datodos (data){

if (data ===0){
document.getElementById('dato2').innerHTML='Energia consumida edificio';
return dato2 = 'ee',titulo2='Energia consumida edificio'
}else if(data ===1){
document.getElementById('dato2').innerHTML='Energia generada planta fotovoltáica';
return  dato2 = 'es',titulo2='Energia generada planta fotovoltáica'
}else if(data ===2){
document.getElementById('dato2').innerHTML='Errores';
return dato2 = 'error',titulo2='Errores'
}

};

function tipodos (data){

if (data ===0){

return tipo2 = 'dia'
}else if(data ===1){

return  tipo2 = 'mes'
}else if(data ===2){

return tipo2 = 'año'
}

};

//configuracion vista 3

function guardartres(){

time3 = document.getElementById('time3').value;
date = time3.split("-");
año3 = date[0];
mes3= date[1];
dia3 = date[2];

message=[año3,mes3,dia3,dato3,tipo3,titulo3]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardartres',message);
dispatcher.bind('graficos.guardartres', function(task) {
console.log(task);

});



configuracion();


};


function datotres (data){

if (data ===0){
document.getElementById('dato3').innerHTML='Energia consumida edificio';
return dato3 = 'ee',titulo3='Energia consumida edificio'
}else if(data ===1){
document.getElementById('dato3').innerHTML='Energia generada planta fotovoltáica';
return  dato3 = 'es',titulo3='Energia generada planta fotovoltáica'
}else if(data ===2){
document.getElementById('dato3').innerHTML='Errores';
return dato3 = 'error',titulo3='Errores'
}

};

function tipotres (data){

if (data ===0){

return tipo3 = 'dia'
}else if(data ===1){

return  tipo3 = 'mes'
}else if(data ===2){

return tipo3 = 'año'
}

};

//variables de configuracion

function guardartiempo(){


seg=document.getElementById('seg').value;

if (isNumeric(seg)){

message=[seg]

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardartiempo',message);
dispatcher.bind('graficos.guardartiempo', function(task) {
console.log(task);
});

}else{

alert("Valores numéricos, decimales con coma");
};



configuracion();


};

function guardarsic(){




sic=document.getElementById('sic').value;

if (isNumeric(sic)){

message=sic
console.log(message);

var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardarsic',message);
dispatcher.bind('graficos.guardarsic', function(task) {
console.log(task);
});

}else{

alert("Valores numéricos, decimales con coma");

};



configuracion();


};

function isNumeric(n) { 
	return !isNaN(parseFloat(n)) && isFinite(n); 
};


function guardartarifa(){


tarifa=document.getElementById('tarifa').value;


if (isNumeric(tarifa))
{
message=tarifa
console.log(message);
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.guardartarifa',message);
dispatcher.bind('graficos.guardartarifa', function(task) {
console.log(task);
});



}else{


alert("Valores numéricos, decimales con coma");

};
 


configuracion();


};


//descarga de dato

function descargadatoscsv(){


timedescarga = document.getElementById('timedescarga').value;
date = timedescarga.split("-");
añodes = date[0];
mesdes= date[1];
diades = date[2];
message=[añodes,mesdes,diades,datodes,tipodes]
console.log(message);
var dispatcher = new WebSocketRails(conexion);
dispatcher.trigger('graficos.descargadatos',message);
dispatcher.bind('graficos.descargadatos', function(task) {

db=task;
var length= task[0].length;
console.log(length);
descargadatos1(length,datodes,añodes,mesdes,diades);


});
	};

function datodescarga (data){

if (data ===0){
document.getElementById('datodes').innerHTML='Energia consumida edificio';
return datodes = 'ee'
}else if(data ===1){
document.getElementById('datodes').innerHTML='Energia generada planta fotovoltáica';
return  datodes = 'es'
}else if(data ===2){
document.getElementById('datodes').innerHTML='Errores';
return datodes = 'error'
}

};

function tipodescarga (data){

if (data ===0){

return tipodes = 'dia'
}else if(data ===1){

return  tipodes = 'mes'
}else if(data ===2){

return tipodes = 'año'
}

};

// some data to export
function descargadatos1(length,dato,año,mes,dia){


console.log(db[0]);
console.log(length +""+ dato +""+ año +""+ mes +"" + dia);
var numero = length;
var data =[numero];
var fecha = año+"/"+mes+"/"+dia;
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": db[3][i],"dato": db[0][i], "dato1": db[1][i], "dato2": db[2][i]}
   
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "Fecha" + '","' + " " + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","'+ item.dato + '","' + item.dato1 + '","' + item.dato2 + '"');
});



// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});



link = document.getElementById('descargardatos');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);
console.log(link);


};







// some data to export
function descargadatos(lenght,dato,db,año,mes,dia){


console.log(lenght);
var numero = length;
var data =[numero];
var fecha = año+"/"+mes+"/"+dia;
for (var i = 0; i < numero; i++) {
    
     data[i] = {"fecha": fecha, "dato": db[i]}
 
}



// prepare CSV data
var csvData = new Array();
csvData.push('"' + "Fecha" + '","' + dato + '"');

data.forEach(function(item, index, array) {
  csvData.push('"' + item.fecha + '","' + item.dato + '"');
});


// download stuff
var fileName = "data.csv";
var buffer = csvData.join("\n");
var blob = new Blob([buffer], {
  "type": "text/csv;charset=utf8;"          
});


link = document.getElementById('link');
link.setAttribute("href", window.URL.createObjectURL(blob));
link.setAttribute("download", fileName);


};







function semaforo(){

resultado=1;
luzr = document.getElementById("rojo");
luzr.style.height = '0px';
luza = document.getElementById("amarillo");
luza.style.height = '0px';
luzv = document.getElementById("verde");
luzv.style.height = '0px';

var message;
var dispatcher = new WebSocketRails(conexion);

dispatcher.trigger('graficos.semaforo',message);

dispatcher.bind('graficos.semaforo', function(task) {



console.log(resultado);

if (task==0){

document.getElementById("textos").innerHTML="El consumo disminuyó respecto al mes del año pasado";

setInterval(function(){ 

setTimeout(function(){ luzv.style.height = '43px'; }, 500);
setTimeout(function(){ luzv.style.height = '0px'; }, 1000);

}, 1500);


}else if (task ==1){

document.getElementById("textos").innerHTML="El consumo es igual al mes del año pasado";

setInterval(function(){ 

setTimeout(function(){ luza.style.height = '43px'; }, 500);
setTimeout(function(){ luza.style.height = '0px'; }, 1000);

}, 1500);

}else if(task==2){

document.getElementById("textos").innerHTML="El consumo aumentó respecto al mes del año pasado";

setInterval(function(){ 

setTimeout(function(){ luzr.style.height = '43px'; }, 500);
setTimeout(function(){ luzr.style.height = '0px'; }, 1000);

}, 1500);

};















});     



};
























