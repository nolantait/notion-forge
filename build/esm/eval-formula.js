var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { getTextContent, getDateValue } from 'notion-utils';
import { format, getDate, getDay, getHours, getMinutes, getMonth, getYear, add, sub, intervalToDuration } from 'date-fns';
/**
 * Evaluates a Notion formula expression to a result value.
 *
 * All built-in functions and operators are supported.
 *
 * NOTE: this needs a lot more testing, especially around covering all the different
 * function types and coercing different property values correctly.
 *
 * It does work for many of our test cases, however.
 *
 * @param formula - Formula to evaluate.
 * @param context - Collection context containing property schema and values.
 */
export function evalFormula(formula, context) {
    var _a;
    var endDate = context.endDate, ctx = __rest(context
    // TODO: coerce return type using `formula.return_type`
    , ["endDate"]);
    // TODO: coerce return type using `formula.return_type`
    switch (formula === null || formula === void 0 ? void 0 : formula.type) {
        case 'symbol':
            // TODO: this isn't documented anywhere but seen in the wild
            return formula.name === 'true';
        case 'constant': {
            var value = formula.value;
            switch (formula.result_type) {
                case 'text':
                    return value;
                case 'number':
                    return parseFloat(value);
                default:
                    return value;
            }
        }
        case 'property': {
            var value = ctx.properties[formula.id];
            var text = getTextContent(value);
            switch (formula.result_type) {
                case 'text':
                    return text;
                case 'number':
                    return parseFloat(text);
                case 'boolean':
                    // TODO: handle chceckbox properties
                    if (typeof text === 'string') {
                        return text === 'true';
                    }
                    else {
                        return !!text;
                    }
                case 'date': {
                    // console.log('date', text, value)
                    var v = getDateValue(value);
                    if (v) {
                        if (endDate && v.end_date) {
                            return new Date(v.end_date);
                        }
                        else {
                            return new Date(v.start_date);
                        }
                    }
                    else {
                        return new Date(text);
                    }
                }
                default:
                    return text;
            }
        }
        case 'operator':
        // All operators are exposed as functions, so we handle them the same
        // eslint-disable-next-line no-fallthrough
        case 'function':
            return evalFunctionFormula(formula, ctx);
        default:
            console.log(formula);
            throw new Error("invalid or unsupported formula \"" + ((_a = formula) === null || _a === void 0 ? void 0 : _a.type));
    }
}
/**
 * Evaluates a Notion formula function or operator expression.
 *
 * Note that all operators are also exposed as functions, so we handle them the same.
 *
 * @private
 */
function evalFunctionFormula(formula, ctx) {
    var _a, _b;
    var _c;
    var args = formula === null || formula === void 0 ? void 0 : formula.args;
    switch (formula.name) {
        // logic
        // ------------------------------------------------------------------------
        case 'and':
            return evalFormula(args[0], ctx) && evalFormula(args[1], ctx);
        case 'empty':
            return !evalFormula(args[0], ctx);
        case 'equal':
            // eslint-disable-next-line eqeqeq
            return evalFormula(args[0], ctx) == evalFormula(args[1], ctx);
        case 'if':
            return evalFormula(args[0], ctx)
                ? evalFormula(args[1], ctx)
                : evalFormula(args[2], ctx);
        case 'larger':
            return evalFormula(args[0], ctx) > evalFormula(args[1], ctx);
        case 'largerEq':
            return evalFormula(args[0], ctx) >= evalFormula(args[1], ctx);
        case 'not':
            return !evalFormula(args[0], ctx);
        case 'or':
            return evalFormula(args[0], ctx) || evalFormula(args[1], ctx);
        case 'smaller':
            return evalFormula(args[0], ctx) < evalFormula(args[1], ctx);
        case 'smallerEq':
            return evalFormula(args[0], ctx) <= evalFormula(args[1], ctx);
        case 'unequal':
            // eslint-disable-next-line eqeqeq
            return evalFormula(args[0], ctx) != evalFormula(args[1], ctx);
        // numeric
        // ------------------------------------------------------------------------
        case 'abs':
            return Math.abs(evalFormula(args[0], ctx));
        case 'add': {
            var v0 = evalFormula(args[0], ctx);
            var v1 = evalFormula(args[1], ctx);
            if (typeof v0 === 'number') {
                return v0 + +v1;
            }
            else if (typeof v0 === 'string') {
                return v0 + ("" + v1);
            }
            else {
                // TODO
                return v0;
            }
        }
        case 'cbrt':
            return Math.cbrt(evalFormula(args[0], ctx));
        case 'ceil':
            return Math.ceil(evalFormula(args[0], ctx));
        case 'divide':
            return (evalFormula(args[0], ctx) /
                evalFormula(args[1], ctx));
        case 'exp':
            return Math.exp(evalFormula(args[0], ctx));
        case 'floor':
            return Math.floor(evalFormula(args[0], ctx));
        case 'ln':
            return Math.log(evalFormula(args[0], ctx));
        case 'log10':
            return Math.log10(evalFormula(args[0], ctx));
        case 'log2':
            return Math.log2(evalFormula(args[0], ctx));
        case 'max': {
            var values = args.map(function (arg) { return evalFormula(arg, ctx); });
            return values.reduce(function (acc, value) { return Math.max(acc, value); }, Number.NEGATIVE_INFINITY);
        }
        case 'min': {
            var values = args.map(function (arg) { return evalFormula(arg, ctx); });
            return values.reduce(function (acc, value) { return Math.min(acc, value); }, Number.POSITIVE_INFINITY);
        }
        case 'mod':
            return (evalFormula(args[0], ctx) %
                evalFormula(args[1], ctx));
        case 'multiply':
            return (evalFormula(args[0], ctx) *
                evalFormula(args[1], ctx));
        case 'pow':
            return Math.pow(evalFormula(args[0], ctx), evalFormula(args[1], ctx));
        case 'round':
            return Math.round(evalFormula(args[0], ctx));
        case 'sign':
            return Math.sign(evalFormula(args[0], ctx));
        case 'sqrt':
            return Math.sqrt(evalFormula(args[0], ctx));
        case 'subtract':
            return (evalFormula(args[0], ctx) -
                evalFormula(args[1], ctx));
        case 'toNumber':
            return parseFloat(evalFormula(args[0], ctx));
        case 'unaryMinus':
            return evalFormula(args[0], ctx) * -1;
        case 'unaryPlus':
            return parseFloat(evalFormula(args[0], ctx));
        // text
        // ------------------------------------------------------------------------
        case 'concat': {
            var values = args.map(function (arg) { return evalFormula(arg, ctx); });
            return values.join('');
        }
        case 'contains':
            return evalFormula(args[0], ctx).includes(evalFormula(args[1], ctx));
        case 'format': {
            var value = evalFormula(args[0], ctx);
            switch (typeof value) {
                case 'string':
                    return value;
                case 'object':
                    if (value instanceof Date) {
                        return format(value, 'MMM d, YYY');
                    }
                    else {
                        // shouldn't ever get here
                        return "" + value;
                    }
                case 'number':
                default:
                    return "" + value;
            }
        }
        case 'join': {
            var delimiterArg = args[0], restArgs = args.slice(1);
            var delimiter = evalFormula(delimiterArg, ctx);
            var values = restArgs.map(function (arg) { return evalFormula(arg, ctx); });
            return values.join(delimiter);
        }
        case 'length':
            return evalFormula(args[0], ctx).length;
        case 'replace': {
            var value = evalFormula(args[0], ctx);
            var regex = evalFormula(args[1], ctx);
            var replacement = evalFormula(args[2], ctx);
            return value.replace(new RegExp(regex), replacement);
        }
        case 'replaceAll': {
            var value = evalFormula(args[0], ctx);
            var regex = evalFormula(args[1], ctx);
            var replacement = evalFormula(args[2], ctx);
            return value.replace(new RegExp(regex, 'g'), replacement);
        }
        case 'slice': {
            var value = evalFormula(args[0], ctx);
            var beginIndex = evalFormula(args[1], ctx);
            var endIndex = args[2]
                ? evalFormula(args[2], ctx)
                : value.length;
            return value.slice(beginIndex, endIndex);
        }
        case 'test': {
            var value = evalFormula(args[0], ctx);
            var regex = evalFormula(args[1], ctx);
            return new RegExp(regex).test(value);
        }
        // date & time
        // ------------------------------------------------------------------------
        case 'date':
            return getDate(evalFormula(args[0], ctx));
        case 'dateAdd': {
            var date = evalFormula(args[0], ctx);
            var number = evalFormula(args[1], ctx);
            var unit = evalFormula(args[1], ctx);
            return add(date, (_a = {}, _a[unit] = number, _a));
        }
        case 'dateBetween': {
            var date1 = evalFormula(args[0], ctx);
            var date2 = evalFormula(args[1], ctx);
            var unit = evalFormula(args[1], ctx);
            return intervalToDuration({
                start: date2,
                end: date1
            })[unit];
        }
        case 'dateSubtract': {
            var date = evalFormula(args[0], ctx);
            var number = evalFormula(args[1], ctx);
            var unit = evalFormula(args[1], ctx);
            return sub(date, (_b = {}, _b[unit] = number, _b));
        }
        case 'day':
            return getDay(evalFormula(args[0], ctx));
        case 'end':
            return evalFormula(args[0], __assign(__assign({}, ctx), { endDate: true }));
        case 'formatDate': {
            var date = evalFormula(args[0], ctx);
            var formatValue = evalFormula(args[1], ctx).replace('dddd', 'eeee');
            return format(date, formatValue);
        }
        case 'fromTimestamp':
            return new Date(evalFormula(args[0], ctx));
        case 'hour':
            return getHours(evalFormula(args[0], ctx));
        case 'minute':
            return getMinutes(evalFormula(args[0], ctx));
        case 'month':
            return getMonth(evalFormula(args[0], ctx));
        case 'now':
            return new Date();
        case 'start':
            return evalFormula(args[0], __assign(__assign({}, ctx), { endDate: false }));
        case 'timestamp':
            return evalFormula(args[0], ctx).getTime();
        case 'year':
            return getYear(evalFormula(args[0], ctx));
        default:
            console.log(formula);
            throw new Error("invalid or unsupported function formula \"" + ((_c = formula) === null || _c === void 0 ? void 0 : _c.type));
    }
}
//# sourceMappingURL=eval-formula.js.map