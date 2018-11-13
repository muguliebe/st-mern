Feature: 서버기본
    서버 기본 테스트

    Scenario: /api 호출 시, JSON 으로 message 키에 alive 를 담아 리턴해야 한다.
        When the client creates a GET request to /api
        And sends the request
        Then our API should respond with a 200 HTTP status code
        And the payload of the response should be a JSON object
        And contains a message property which says 'alive'

