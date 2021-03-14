@preprocessor typescript

@builtin "number.ne"
@builtin "whitespace.ne"

Expression -> 
    Task _ "finish":? {% input => ({ type: 'execute', data: { task: input[0] } }) %} |
    "do" __ ExpressionList {% input => ({ type: 'executeAll', data: { tasks: input[2] }}) %}

ExpressionList ->
    Expression __ "then" __ ExpressionList {% input => [input[0], ...input[4]] %} |
    Expression __ "finish" {% input => [input[0]] %}

Task ->
    # EX: say "Hello, world!"
    "say"i __ String {% input => ({ task: "say", data: { text: input[2] } }) %} |
    "move to"i __ Position {% input => ({ task: "moveTo", data: { position: input[2] } }) %} |
    "stop" {% input => ({ task: "stop" }) %}

String -> "\"" [^\\"]:* "\"" {% d => d[1].join("") %}
Word -> [^ ]:* {% d => d[0].join("") %}

Position -> BasicPosition {% input => ({ basic: input[0] }) %}

BasicPosition -> 
    Entity {% input => ({ entity: input[0] }) %} |
    Coordinates {% input => ({ coordinates: input[0] }) %}

Coordinates -> 
    decimal __ decimal {% input => ({ x: input[0], z: input[2] }) %} |
    decimal __ decimal __ decimal {% input => ({ x: input[0], y: input[2], z: input[4] }) %}

Entity ->
    "me" {% input => ({ special: "me" }) %} |
    "player" __ Word {% input => ({ player: input[2] }) %}