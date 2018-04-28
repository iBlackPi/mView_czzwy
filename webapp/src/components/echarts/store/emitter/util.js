/**
 * echarts组件的工具类,主要为了extend方法，移植自jquery
 * since 2018/4/27
 * author cfw2157
 */

class Tool{
    constructor() {
        this.getProto = Object.getPrototypeOf;
        this.class2type = {};
        this.hasOwn = this.class2type.hasOwnProperty;
        this.fnToString = this.hasOwn.toString;
        this.ObjectFunctionString = this.fnToString.call( Object );
    }

    type( obj ) {
        if ( obj == null ) {
            return obj + "";
        }
        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
        this.class2type[ toString.call( obj ) ] || "object" : typeof obj;
    }

    isFunction() {
        return this.type( obj ) === "function";
    }

    isPlainObject(obj) {
        var proto, Ctor;
        // Detect obvious negatives
        // Use toString instead of jQuery.type to catch host objects
        if ( !obj || toString.call( obj ) !== "[object Object]" ) {
            return false;
        }
        proto = this.getProto( obj );
        // Objects with no prototype (e.g., `Object.create( null )`) are plain
        if ( !proto ) {
            return true;
        }
        // Objects with prototype are plain iff they were constructed by a global Object function
        Ctor = this.hasOwn.call( proto, "constructor" ) && proto.constructor;
        return typeof Ctor === "function" && this.fnToString.call( Ctor ) === this.ObjectFunctionString;
    };

    extend() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !this.isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];
                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && (this.isPlainObject( copy ) ||
                        ( copyIsArray = Array.isArray( copy ) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray( src ) ? src : [];

                        } else {
                            clone = src && this.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = this.extend( deep, clone, copy );

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
}

export {Tool};