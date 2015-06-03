var consoleApp = angular.module("ConsoleApp", ['ui.bootstrap']);

/*
This directive allows us to pass a function in on an enter key to do what we want.
*/
consoleApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

/*
Filter to reverse array
*/
consoleApp.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});

consoleApp.controller("ConsoleController", ['$scope',

    function($scope) {

        $scope.commands = [];
        $scope.specialCommands = {};
        $scope.result = null;
        $scope.results = [];


        console.info("Initial Setup");

        $scope.specialCommands['info'] = "ngConsole - Javascipt console built using AngularJS. Type 'help' to show help.";
        $scope.specialCommands['help'] = "Type in the prompt to get suggestions. Click on any command in history to copy it to prompt.";

        //Commands for typeahead - keeping it simple instead of loading from config/json file
        $scope.commands = ['eval()', 'uneval() ', 'isFinite()', 'isNaN()', 'parseFloat()', 'parseInt()', 'decodeURI()', 'decodeURIComponent()', 'encodeURI()', 'encodeURIComponent()', 'escape() ', 'unescape() ', 'Object', 'Function', 'Boolean', 'Symbol ', 'Error', 'EvalError', 'InternalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError', 'Math.E', 'Math.LN10', 'Math.LN2', 'Math.LOG10E', 'Math.LOG2E', 'Math.PI', 'Math.SQRT1_2', 'Math.SQRT2', 'Math.abs()', 'Math.acos()', 'Math.acosh()', 'Math.asin()', 'Math.asinh()', 'Math.atan()', 'Math.atan2()', 'Math.atanh()', 'Math.cbrt()', 'Math.ceil()', 'Math.clz32()', 'Math.cos()', 'Math.cosh()', 'Math.exp()', 'Math.expm1()', 'Math.floor()', 'Math.fround()', 'Math.hypot()', 'Math.imul()', 'Math.log()', 'Math.log10()', 'Math.log1p()', 'Math.log2()', 'Math.max()', 'Math.min()', 'Math.pow()', 'Math.random()', 'Math.round()', 'Math.sign()', 'Math.sin()', 'Math.sinh()', 'Math.sqrt()', 'Math.tan()', 'Math.tanh()', 'Math.trunc()', 'Number.EPSILON', 'Number.MAX_SAFE_INTEGER', 'Number.MAX_VALUE', 'Number.MIN_SAFE_INTEGER', 'Number.MIN_VALUE', 'Number.NEGATIVE_INFINITY', 'Number.NaN', 'Number.POSITIVE_INFINITY', 'Number.prototype', 'Number.isFinite()', 'Number.isInteger()', 'Number.isNaN()', 'Number.isSafeInteger()', 'Number.parseFloat()', 'Number.parseInt()', 'Number.prototype.toExponential()', 'Number.prototype.toFixed()', 'Number.prototype.toLocaleString()', 'Number.prototype.toPrecision()', 'Number.prototype.toSource()', 'Number.prototype.toString()', 'Number.prototype.valueOf()', 'Date.prototype', 'Date.UTC()', 'Date.now()', 'Date.parse()', 'Date.prototype.getDate()', 'Date.prototype.getDay()', 'Date.prototype.getFullYear()', 'Date.prototype.getHours()', 'Date.prototype.getMilliseconds()', 'Date.prototype.getMinutes()', 'Date.prototype.getMonth()', 'Date.prototype.getSeconds()', 'Date.prototype.getTime()', 'Date.prototype.getTimezoneOffset()', 'Date.prototype.getUTCDate()', 'Date.prototype.getUTCDay()', 'Date.prototype.getUTCFullYear()', 'Date.prototype.getUTCHours()', 'Date.prototype.getUTCMilliseconds()', 'Date.prototype.getUTCMinutes()', 'Date.prototype.getUTCMonth()', 'Date.prototype.getUTCSeconds()', 'Date.prototype.getYear()', 'Date.prototype.setDate()', 'Date.prototype.setFullYear()', 'Date.prototype.setHours()', 'Date.prototype.setMilliseconds()', 'Date.prototype.setMinutes()', 'Date.prototype.setMonth()', 'Date.prototype.setSeconds()', 'Date.prototype.setTime()', 'Date.prototype.setUTCDate()', 'Date.prototype.setUTCFullYear()', 'Date.prototype.setUTCHours()', 'Date.prototype.setUTCMilliseconds()', 'Date.prototype.setUTCMinutes()', 'Date.prototype.setUTCMonth()', 'Date.prototype.setUTCSeconds()', 'Date.prototype.setYear()', 'Date.prototype.toDateString()', 'Date.prototype.toGMTString()', 'Date.prototype.toISOString()', 'Date.prototype.toJSON()', 'Date.prototype.toLocaleDateString()', 'Date.prototype.toLocaleFormat()', 'Date.prototype.toLocaleString()', 'Date.prototype.toLocaleTimeString()', 'Date.prototype.toSource()', 'Date.prototype.toString()', 'Date.prototype.toTimeString()', 'Date.prototype.toUTCString()', 'Date.prototype.valueOf()', 'String.length', 'String.prototype', 'String.fromCharCode()', 'String.fromCodePoint()', 'String.prototype.anchor()', 'String.prototype.big()', 'String.prototype.blink()', 'String.prototype.bold()', 'String.prototype.charAt()', 'String.prototype.charCodeAt()', 'String.prototype.codePointAt()', 'String.prototype.concat()', 'String.prototype.endsWith()', 'String.prototype.fixed()', 'String.prototype.fontcolor()', 'String.prototype.fontsize()', 'String.prototype.includes()', 'String.prototype.indexOf()', 'String.prototype.italics()', 'String.prototype.lastIndexOf()', 'String.prototype.link()', 'String.prototype.localeCompare()', 'String.prototype.match()', 'String.prototype.normalize()', 'String.prototype.quote()', 'String.prototype.repeat()', 'String.prototype.replace()', 'String.prototype.search()', 'String.prototype.slice()', 'String.prototype.small()', 'String.prototype.split()', 'String.prototype.startsWith()', 'String.prototype.strike()', 'String.prototype.sub()', 'String.prototype.substr()', 'String.prototype.substring()', 'String.prototype.sup()', 'String.prototype.toLocaleLowerCase()', 'String.prototype.toLocaleUpperCase()', 'String.prototype.toLowerCase()', 'String.prototype.toSource()', 'String.prototype.toString()', 'String.prototype.toUpperCase()', 'String.prototype.trim()', 'String.prototype.trimLeft()', 'String.prototype.trimRight()', 'String.prototype.valueOf()', 'String.prototype[@@iterator]()', 'String.raw()', 'Array.prototype', 'Array.prototype.length', 'Array.from()', 'Array.isArray()', 'Array.observe()', 'Array.of()', 'Array.prototype.concat()', 'Array.prototype.copyWithin()', 'Array.prototype.entries()', 'Array.prototype.every()', 'Array.prototype.fill()', 'Array.prototype.filter()', 'Array.prototype.find()', 'Array.prototype.findIndex()', 'Array.prototype.forEach()', 'Array.prototype.includes()', 'Array.prototype.indexOf()', 'Array.prototype.join()', 'Array.prototype.keys()', 'Array.prototype.lastIndexOf()', 'Array.prototype.map()', 'Array.prototype.pop()', 'Array.prototype.push()', 'Array.prototype.reduce()', 'Array.prototype.reduceRight()', 'Array.prototype.reverse()', 'Array.prototype.shift()', 'Array.prototype.slice()', 'Array.prototype.some()', 'Array.prototype.sort()', 'Array.prototype.splice()', 'Array.prototype.toLocaleString()', 'Array.prototype.toSource()', 'Array.prototype.toString()', 'Array.prototype.unshift()', 'Array.prototype.values()', 'Array.prototype[@@iterator]()', 'Boolean.prototype', 'Boolean.prototype.toSource()', 'Boolean.prototype.toString()', 'Boolean.prototype.valueOf()', 'Error.prototype', 'Error.prototype.columnNumber', 'Error.prototype.fileName', 'Error.prototype.lineNumber', 'Error.prototype.message', 'Error.prototype.name', 'Error.prototype.stack', 'Error.prototype.toSource()', 'Error.prototype.toString()', 'Function.arguments', 'Function.arity', 'Function.caller', 'Function.displayName', 'Function.length', 'Function.name', 'Function.prototype', 'Function.prototype.apply()', 'Function.prototype.bind()', 'Function.prototype.call()', 'Function.prototype.isGenerator()', 'Function.prototype.toSource()', 'Function.prototype.toString()', 'JSON.parse()', 'JSON.stringify()', 'RegExp.$1-$9', 'RegExp.input ($_)', 'RegExp.lastIndex', 'RegExp.lastMatch ($&)', 'RegExp.lastParen ($+)', 'RegExp.leftContext ($`)', 'RegExp.prototype', 'RegExp.prototype.flags', 'RegExp.prototype.global', 'RegExp.prototype.ignoreCase', 'RegExp.prototype.multiline', 'RegExp.prototype.source', 'RegExp.prototype.sticky', 'RegExp.prototype.unicode', 'RegExp.prototype.compile()', 'RegExp.prototype.exec()', 'RegExp.prototype.test()', 'RegExp.prototype.toSource()', 'RegExp.prototype.toString()', 'block', 'break', 'class', 'const', 'continue', 'debugger', 'do...while', 'empty', 'export', 'for', 'for each...in', 'for...in', 'for...of', 'function', 'function*', 'if...else', 'import', 'label', 'let', 'return', 'switch', 'throw', 'try...catch', 'var', 'while', 'with'];

        //Commands to display on load
        angular.forEach($scope.specialCommands, function(value, key) {
            $scope.results.push({
                'command': key,
                'result': value,
                'success': true
            });
        });

        //Function to evaluate the input command
        $scope.evaluateCommand = function() {
            console.log("Evaluating Command " + $scope.command);
            $scope.commandPassed = false;
            try {
                var result;
                //Check if the input command is a special app specific command
                if ($scope.specialCommands.hasOwnProperty($scope.command)) {
                    result = $scope.specialCommands[$scope.command];
                } else {
                    result = eval($scope.command);
                }
                $scope.result = new String(result);
                $scope.commandPassed = true;
                console.log($scope.result);

            } catch (err) {
                console.log("Error:" + err);
            }

            $scope.results.push({
                'command': $scope.command,
                'result': $scope.result,
                'success': $scope.commandPassed
            });

        };

        $scope.setCommand = function(command) {

            $scope.command = command;
            console.log("Setting Command " + $scope.command);
            document.getElementById('command').focus();

        };

    }
]);