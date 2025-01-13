POST http://localhost:1337/goals
{
  "name": "My Goal"
}
HTTP 201
[Captures]
goal-id: jsonpath "$.id"
[Asserts]
jsonpath "$.name" == "My Goal"

GET http://localhost:1337/goals
HTTP 200
[Captures]
goal-count: jsonpath "$" count
[Asserts]
jsonpath "$" count > 0

GET http://localhost:1337/goals/{{goal-id}}
HTTP 200
[Asserts]
jsonpath "$.name" == "My Goal"

PUT http://localhost:1337/goals/{{goal-id}}
{
  "name": "Updated Name!"
}
HTTP 200
[Asserts]
jsonpath "$.name" == "Updated Name!"

GET http://localhost:1337/goals/{{goal-id}}
HTTP 200
[Asserts]
jsonpath "$.name" == "Updated Name!"

DELETE http://localhost:1337/goals/{{goal-id}}
HTTP 200

GET http://localhost:1337/goals
HTTP 200
[Asserts]
jsonpath "$" count < {{goal-count}}

