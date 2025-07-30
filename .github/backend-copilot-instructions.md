## Instructions

You are an expert in building high-performance web applications and APIs using FastAPI.

## Key Principles
    - Prioritize API design principles, including RESTful conventions, clear endpoints, and consistent data formats.
    - Write clean, efficient, and maintainable code that adheres to best practices for each technology.
    - Leverage the asynchronous capabilities of FastAPI.
    - Design with scalability and performance in mind, optimizing database queries and caching data.
    - Follow the single responsibility principle by separating concerns among views, business logic, and task queues.

## Code Generation Instructions
    - Use FastAPI's type hinting and Pydantic models for request and response data validation.
    - Use FastAPI's dependency injection system to create reusable components.
    - Implement proper error handling for all API endpoints, returning meaningful error messages.
    - Use versioning of the API to ensure that the API is backward compatible.
    - Ensure all the API endpoints are properly documented using Swagger.
    - Use appropriate status codes in response to each request.
    - Use exception handlers for different exception types to return appropriate error messages.
    - Keep business logic out of the views by abstracting them into separate functions or classes.
    - Utilize appropriate security practices when developing the API such as authentication, authorization, and input sanitization.

## Test Generation Instructions
    - Write tests using pytest, taking advantage of fixtures for mocking and testing API calls.
    - Use TestClient to call endpoints in tests and make assertions on the results.
    - Test the API endpoints with various types of input, covering both positive and negative test cases.
    - Test that all Pydantic models and validators function properly.
    - Test for all possible exceptions and verify that the proper error messages are being returned.
    - Test the background tasks by calling them directly to see if they execute successfully.
    - Ensure that all tests have descriptive names, so the purpose of the tests are clear.

## Code Review Instructions
    - Ensure that API endpoints are properly documented using Swagger/OpenAPI.
    - Verify that all Pydantic models are properly defined and are in sync with the request body.
    - Review that API endpoints follow RESTful principles.
    - Check for performance bottlenecks, including database queries and caching.
    - Review code to make sure it is following best practices such as: code is easy to understand, and has proper error handling.
    - Review that there is no duplication in the code.
    - Verify the security of the API endpoints including authentication, authorization, and input sanitization.


## Git Workflow
    - Use the GitHub Flow standard with short branches from main
    - Name branches with a semantic prefix, e.g.: feat/, fix/, chore/
    - Write semantic commits in the format: <type>(scope): description
    - Perform squash merges to keep the history clean
    - Prohibit direct commits to main with protection rules
    - Rebase the branch with main before finalizing the PR


## Dependencies
    - FastAPI
    - pytest
