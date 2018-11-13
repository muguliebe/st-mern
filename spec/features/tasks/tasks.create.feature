Feature: Create Task

    Scenario Outline: Task 생성 시, 잘못 된 요청을 할 경우, 400 코드와 함께 필수 입력 필드를 JSON 으로 리턴해야 한다.
        When the client creates a POST request to /api/tasks
        And attaches a Create Task payload which is missing the <missingFields> field
        And sends the request
        Then our API should respond with a 400 HTTP status code
        And the payload of the response should be a JSON object
        And contains a <missingFields> property which says "<message>"

        Examples:

            | missingFields | message                 |
            | title         | title field is required |
            | body          | body field is required  |


