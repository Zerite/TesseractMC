// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any {
    return d[0];
}

interface NearleyToken {
    value: any;
    [key: string]: any;
}

interface NearleyLexer {
    reset: (chunk: string, info: any) => void;
    next: () => NearleyToken | undefined;
    save: () => any;
    formatError: (token: never) => string;
    has: (tokenType: string) => boolean;
}

interface NearleyRule {
    name: string;
    symbols: NearleySymbol[];
    postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
    Lexer: NearleyLexer | undefined;
    ParserRules: NearleyRule[];
    ParserStart: string;
}

const grammar: Grammar = {
    Lexer: undefined,
    ParserRules: [
        { name: 'unsigned_int$ebnf$1', symbols: [/[0-9]/] },
        {
            name: 'unsigned_int$ebnf$1',
            symbols: ['unsigned_int$ebnf$1', /[0-9]/],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: 'unsigned_int',
            symbols: ['unsigned_int$ebnf$1'],
            postprocess: function (d) {
                return parseInt(d[0].join(''));
            },
        },
        { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '-' }] },
        { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '+' }] },
        { name: 'int$ebnf$1', symbols: ['int$ebnf$1$subexpression$1'], postprocess: id },
        { name: 'int$ebnf$1', symbols: [], postprocess: () => null },
        { name: 'int$ebnf$2', symbols: [/[0-9]/] },
        { name: 'int$ebnf$2', symbols: ['int$ebnf$2', /[0-9]/], postprocess: (d) => d[0].concat([d[1]]) },
        {
            name: 'int',
            symbols: ['int$ebnf$1', 'int$ebnf$2'],
            postprocess: function (d) {
                if (d[0]) {
                    return parseInt(d[0][0] + d[1].join(''));
                } else {
                    return parseInt(d[1].join(''));
                }
            },
        },
        { name: 'unsigned_decimal$ebnf$1', symbols: [/[0-9]/] },
        {
            name: 'unsigned_decimal$ebnf$1',
            symbols: ['unsigned_decimal$ebnf$1', /[0-9]/],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        { name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
        {
            name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
            symbols: ['unsigned_decimal$ebnf$2$subexpression$1$ebnf$1', /[0-9]/],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: 'unsigned_decimal$ebnf$2$subexpression$1',
            symbols: [{ literal: '.' }, 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1'],
        },
        { name: 'unsigned_decimal$ebnf$2', symbols: ['unsigned_decimal$ebnf$2$subexpression$1'], postprocess: id },
        { name: 'unsigned_decimal$ebnf$2', symbols: [], postprocess: () => null },
        {
            name: 'unsigned_decimal',
            symbols: ['unsigned_decimal$ebnf$1', 'unsigned_decimal$ebnf$2'],
            postprocess: function (d) {
                return parseFloat(d[0].join('') + (d[1] ? '.' + d[1][1].join('') : ''));
            },
        },
        { name: 'decimal$ebnf$1', symbols: [{ literal: '-' }], postprocess: id },
        { name: 'decimal$ebnf$1', symbols: [], postprocess: () => null },
        { name: 'decimal$ebnf$2', symbols: [/[0-9]/] },
        { name: 'decimal$ebnf$2', symbols: ['decimal$ebnf$2', /[0-9]/], postprocess: (d) => d[0].concat([d[1]]) },
        { name: 'decimal$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
        {
            name: 'decimal$ebnf$3$subexpression$1$ebnf$1',
            symbols: ['decimal$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: 'decimal$ebnf$3$subexpression$1',
            symbols: [{ literal: '.' }, 'decimal$ebnf$3$subexpression$1$ebnf$1'],
        },
        { name: 'decimal$ebnf$3', symbols: ['decimal$ebnf$3$subexpression$1'], postprocess: id },
        { name: 'decimal$ebnf$3', symbols: [], postprocess: () => null },
        {
            name: 'decimal',
            symbols: ['decimal$ebnf$1', 'decimal$ebnf$2', 'decimal$ebnf$3'],
            postprocess: function (d) {
                return parseFloat((d[0] || '') + d[1].join('') + (d[2] ? '.' + d[2][1].join('') : ''));
            },
        },
        {
            name: 'percentage',
            symbols: ['decimal', { literal: '%' }],
            postprocess: function (d) {
                return d[0] / 100;
            },
        },
        { name: 'jsonfloat$ebnf$1', symbols: [{ literal: '-' }], postprocess: id },
        { name: 'jsonfloat$ebnf$1', symbols: [], postprocess: () => null },
        { name: 'jsonfloat$ebnf$2', symbols: [/[0-9]/] },
        { name: 'jsonfloat$ebnf$2', symbols: ['jsonfloat$ebnf$2', /[0-9]/], postprocess: (d) => d[0].concat([d[1]]) },
        { name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
        {
            name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1',
            symbols: ['jsonfloat$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: 'jsonfloat$ebnf$3$subexpression$1',
            symbols: [{ literal: '.' }, 'jsonfloat$ebnf$3$subexpression$1$ebnf$1'],
        },
        { name: 'jsonfloat$ebnf$3', symbols: ['jsonfloat$ebnf$3$subexpression$1'], postprocess: id },
        { name: 'jsonfloat$ebnf$3', symbols: [], postprocess: () => null },
        { name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1', symbols: [/[+-]/], postprocess: id },
        { name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1', symbols: [], postprocess: () => null },
        { name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2', symbols: [/[0-9]/] },
        {
            name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2',
            symbols: ['jsonfloat$ebnf$4$subexpression$1$ebnf$2', /[0-9]/],
            postprocess: (d) => d[0].concat([d[1]]),
        },
        {
            name: 'jsonfloat$ebnf$4$subexpression$1',
            symbols: [/[eE]/, 'jsonfloat$ebnf$4$subexpression$1$ebnf$1', 'jsonfloat$ebnf$4$subexpression$1$ebnf$2'],
        },
        { name: 'jsonfloat$ebnf$4', symbols: ['jsonfloat$ebnf$4$subexpression$1'], postprocess: id },
        { name: 'jsonfloat$ebnf$4', symbols: [], postprocess: () => null },
        {
            name: 'jsonfloat',
            symbols: ['jsonfloat$ebnf$1', 'jsonfloat$ebnf$2', 'jsonfloat$ebnf$3', 'jsonfloat$ebnf$4'],
            postprocess: function (d) {
                return parseFloat(
                    (d[0] || '') +
                        d[1].join('') +
                        (d[2] ? '.' + d[2][1].join('') : '') +
                        (d[3] ? 'e' + (d[3][1] || '+') + d[3][2].join('') : ''),
                );
            },
        },
        { name: '_$ebnf$1', symbols: [] },
        { name: '_$ebnf$1', symbols: ['_$ebnf$1', 'wschar'], postprocess: (d) => d[0].concat([d[1]]) },
        {
            name: '_',
            symbols: ['_$ebnf$1'],
            postprocess: function (d) {
                return null;
            },
        },
        { name: '__$ebnf$1', symbols: ['wschar'] },
        { name: '__$ebnf$1', symbols: ['__$ebnf$1', 'wschar'], postprocess: (d) => d[0].concat([d[1]]) },
        {
            name: '__',
            symbols: ['__$ebnf$1'],
            postprocess: function (d) {
                return null;
            },
        },
        { name: 'wschar', symbols: [/[ \t\n\v\f]/], postprocess: id },
        {
            name: 'Main$ebnf$1$subexpression$1$string$1',
            symbols: [{ literal: 'e' }, { literal: 'n' }, { literal: 'd' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Main$ebnf$1$subexpression$1', symbols: ['Main$ebnf$1$subexpression$1$string$1'] },
        {
            name: 'Main$ebnf$1$subexpression$1$string$2',
            symbols: [{ literal: 'e' }, { literal: 'n' }, { literal: 'd' }, { literal: ' ' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Main$ebnf$1$subexpression$1', symbols: ['Main$ebnf$1$subexpression$1$string$2'] },
        { name: 'Main$ebnf$1', symbols: ['Main$ebnf$1$subexpression$1'], postprocess: id },
        { name: 'Main$ebnf$1', symbols: [], postprocess: () => null },
        { name: 'Main', symbols: ['Expression', '_', 'Main$ebnf$1'], postprocess: (input) => input[0] },
        {
            name: 'Expression',
            symbols: ['Task'],
            postprocess: (input) => ({ type: 'execute', data: { task: input[0] } }),
        },
        {
            name: 'Expression$string$1',
            symbols: [{ literal: 'r' }, { literal: 'u' }, { literal: 'n' }],
            postprocess: (d) => d.join(''),
        },
        {
            name: 'Expression',
            symbols: ['Expression$string$1', '_', { literal: '{' }, '_', 'ExpressionList'],
            postprocess: (input) => ({ type: 'executeAll', data: { tasks: input[4] } }),
        },
        {
            name: 'Expression$string$2',
            symbols: [
                { literal: 'r' },
                { literal: 'e' },
                { literal: 'p' },
                { literal: 'e' },
                { literal: 'a' },
                { literal: 't' },
            ],
            postprocess: (d) => d.join(''),
        },
        {
            name: 'Expression$subexpression$1$string$1',
            symbols: [{ literal: 'e' }, { literal: 'n' }, { literal: 'd' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Expression$subexpression$1', symbols: ['__', 'Expression$subexpression$1$string$1'] },
        { name: 'Expression$subexpression$1', symbols: ['_', { literal: '}' }] },
        {
            name: 'Expression',
            symbols: ['Expression$string$2', '_', { literal: '{' }, '_', 'Expression', 'Expression$subexpression$1'],
            postprocess: (input) => ({ type: 'repeat', data: { task: input[4] } }),
        },
        {
            name: 'Expression$string$3',
            symbols: [
                { literal: 'r' },
                { literal: 'e' },
                { literal: 'p' },
                { literal: 'e' },
                { literal: 'a' },
                { literal: 't' },
            ],
            postprocess: (d) => d.join(''),
        },
        {
            name: 'Expression$string$4',
            symbols: [{ literal: 'u' }, { literal: 'n' }, { literal: 't' }, { literal: 'i' }, { literal: 'l' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Expression$subexpression$2', symbols: ['__'] },
        { name: 'Expression$subexpression$2', symbols: ['_', { literal: '{' }, '_'] },
        {
            name: 'Expression$subexpression$3$string$1',
            symbols: [{ literal: 'e' }, { literal: 'n' }, { literal: 'd' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Expression$subexpression$3', symbols: ['__', 'Expression$subexpression$3$string$1'] },
        { name: 'Expression$subexpression$3', symbols: ['_', { literal: '}' }] },
        {
            name: 'Expression',
            symbols: [
                'Expression$string$3',
                '__',
                'Expression$string$4',
                '__',
                'Condition',
                'Expression$subexpression$2',
                'Expression',
                'Expression$subexpression$3',
            ],
            postprocess: (input) => ({ type: 'repeat', data: { task: input[6], condition: input[4] } }),
        },
        {
            name: 'Expression$string$5',
            symbols: [
                { literal: 'r' },
                { literal: 'e' },
                { literal: 'p' },
                { literal: 'e' },
                { literal: 'a' },
                { literal: 't' },
            ],
            postprocess: (d) => d.join(''),
        },
        {
            name: 'Expression$string$6',
            symbols: [{ literal: 't' }, { literal: 'i' }, { literal: 'm' }, { literal: 'e' }, { literal: 's' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Expression$subexpression$4', symbols: ['__'] },
        { name: 'Expression$subexpression$4', symbols: ['_', { literal: '{' }, '_'] },
        {
            name: 'Expression$subexpression$5$string$1',
            symbols: [{ literal: 'e' }, { literal: 'n' }, { literal: 'd' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Expression$subexpression$5', symbols: ['__', 'Expression$subexpression$5$string$1'] },
        { name: 'Expression$subexpression$5', symbols: ['_', { literal: '}' }] },
        {
            name: 'Expression',
            symbols: [
                'Expression$string$5',
                '__',
                'unsigned_int',
                '__',
                'Expression$string$6',
                'Expression$subexpression$4',
                'Expression',
                'Expression$subexpression$5',
            ],
            postprocess: (input) => ({ type: 'repeat', data: { task: input[6], count: input[2] } }),
        },
        {
            name: 'ExpressionList$subexpression$1$string$1',
            symbols: [{ literal: 'a' }, { literal: 'n' }, { literal: 'd' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'ExpressionList$subexpression$1', symbols: ['ExpressionList$subexpression$1$string$1'] },
        {
            name: 'ExpressionList$subexpression$1$string$2',
            symbols: [{ literal: 't' }, { literal: 'h' }, { literal: 'e' }, { literal: 'n' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'ExpressionList$subexpression$1', symbols: ['ExpressionList$subexpression$1$string$2'] },
        {
            name: 'ExpressionList',
            symbols: ['Expression', '__', 'ExpressionList$subexpression$1', '__', 'ExpressionList'],
            postprocess: (input) => [input[0], ...input[4]],
        },
        {
            name: 'ExpressionList$subexpression$2$string$1',
            symbols: [{ literal: 'e' }, { literal: 'n' }, { literal: 'd' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'ExpressionList$subexpression$2', symbols: ['__', 'ExpressionList$subexpression$2$string$1'] },
        { name: 'ExpressionList$subexpression$2', symbols: ['_', { literal: '}' }] },
        {
            name: 'ExpressionList',
            symbols: ['Expression', 'ExpressionList$subexpression$2'],
            postprocess: (input) => [input[0]],
        },
        {
            name: 'Task$subexpression$1',
            symbols: [/[sS]/, /[aA]/, /[yY]/],
            postprocess: function (d) {
                return d.join('');
            },
        },
        {
            name: 'Task',
            symbols: ['Task$subexpression$1', '__', 'String'],
            postprocess: (input) => ({ task: 'say', data: { text: input[2] } }),
        },
        {
            name: 'Task$subexpression$2',
            symbols: [/[mM]/, /[oO]/, /[vV]/, /[eE]/, { literal: ' ' }, /[tT]/, /[oO]/],
            postprocess: function (d) {
                return d.join('');
            },
        },
        {
            name: 'Task',
            symbols: ['Task$subexpression$2', '__', 'Position'],
            postprocess: (input) => ({ task: 'moveTo', data: { position: input[2] } }),
        },
        {
            name: 'Task$subexpression$3',
            symbols: [/[aA]/, /[tT]/, /[tT]/, /[aA]/, /[cC]/, /[kK]/],
            postprocess: function (d) {
                return d.join('');
            },
        },
        {
            name: 'Task',
            symbols: ['Task$subexpression$3', '__', 'Entity'],
            postprocess: (input) => ({ task: 'attack', data: { entity: input[2] } }),
        },
        {
            name: 'Task$subexpression$4',
            symbols: [/[rR]/, /[uU]/, /[nN]/, { literal: ' ' }, /[sS]/, /[cC]/, /[rR]/, /[iI]/, /[pP]/, /[tT]/],
            postprocess: function (d) {
                return d.join('');
            },
        },
        {
            name: 'Task',
            symbols: ['Task$subexpression$4', '__', 'String'],
            postprocess: (input) => ({ task: 'runScript', data: { path: input[2] } }),
        },
        {
            name: 'Task$subexpression$5',
            symbols: [/[sS]/, /[tT]/, /[oO]/, /[pP]/],
            postprocess: function (d) {
                return d.join('');
            },
        },
        { name: 'Task', symbols: ['Task$subexpression$5'], postprocess: (input) => ({ task: 'stop' }) },
        { name: 'String$ebnf$1', symbols: [] },
        { name: 'String$ebnf$1', symbols: ['String$ebnf$1', /[^\\"]/], postprocess: (d) => d[0].concat([d[1]]) },
        {
            name: 'String',
            symbols: [{ literal: '"' }, 'String$ebnf$1', { literal: '"' }],
            postprocess: (d) => d[1].join(''),
        },
        { name: 'Word$ebnf$1', symbols: [] },
        { name: 'Word$ebnf$1', symbols: ['Word$ebnf$1', /[^ ]/], postprocess: (d) => d[0].concat([d[1]]) },
        { name: 'Word', symbols: ['Word$ebnf$1'], postprocess: (d) => d[0].join('') },
        { name: 'Position', symbols: ['BasicPosition'], postprocess: (input) => ({ basic: input[0] }) },
        {
            name: 'Position$string$1',
            symbols: [
                { literal: 'r' },
                { literal: 'e' },
                { literal: 'l' },
                { literal: 'a' },
                { literal: 't' },
                { literal: 'i' },
                { literal: 'v' },
                { literal: 'e' },
            ],
            postprocess: (d) => d.join(''),
        },
        {
            name: 'Position',
            symbols: ['Position$string$1', '__', 'Position'],
            postprocess: (input) => ({ relative: input[2] }),
        },
        { name: 'BasicPosition', symbols: ['Entity'], postprocess: (input) => ({ entity: input[0] }) },
        { name: 'BasicPosition', symbols: ['Coordinates'], postprocess: (input) => ({ coordinates: input[0] }) },
        {
            name: 'Coordinates',
            symbols: ['decimal', '__', 'decimal'],
            postprocess: (input) => ({ x: input[0], z: input[2] }),
        },
        {
            name: 'Coordinates',
            symbols: ['decimal', '__', 'decimal', '__', 'decimal'],
            postprocess: (input) => ({ x: input[0], y: input[2], z: input[4] }),
        },
        { name: 'Entity$string$1', symbols: [{ literal: 'm' }, { literal: 'e' }], postprocess: (d) => d.join('') },
        { name: 'Entity', symbols: ['Entity$string$1'], postprocess: (input) => ({ special: 'me' }) },
        {
            name: 'Entity$string$2',
            symbols: [
                { literal: 'p' },
                { literal: 'l' },
                { literal: 'a' },
                { literal: 'y' },
                { literal: 'e' },
                { literal: 'r' },
            ],
            postprocess: (d) => d.join(''),
        },
        { name: 'Entity$ebnf$1', symbols: ['Word'], postprocess: id },
        { name: 'Entity$ebnf$1', symbols: [], postprocess: () => null },
        {
            name: 'Entity',
            symbols: ['Entity$string$2', '_', 'Entity$ebnf$1'],
            postprocess: (input) => ({ player: input[2] || '%ME%' }),
        },
        {
            name: 'Entity$string$3',
            symbols: [{ literal: 'm' }, { literal: 'o' }, { literal: 'b' }],
            postprocess: (d) => d.join(''),
        },
        { name: 'Entity', symbols: ['Entity$string$3', '__', 'String'], postprocess: (input) => ({ mob: input[2] }) },
        { name: 'Condition$string$1', symbols: [{ literal: 'a' }, { literal: 't' }], postprocess: (d) => d.join('') },
        {
            name: 'Condition',
            symbols: ['Condition$string$1', '__', 'Position'],
            postprocess: (input) => ({ type: 'at', data: { position: input[2] } }),
        },
    ],
    ParserStart: 'Main',
};

export default grammar;
