# kanban

Kanban is web-app to manage your tasks by category.

Catagories include :
* Backlog
* Todo
* In Progress
* Completed

Links:
* Client : https://kanban2-1586465632577.web.app
* Server : https://kanbansakti.herokuapp.com

This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Authentication with JSONWebToken
* SPA Formatting with Vue.js
* Resuable Components
* Heroku Deployment
* Firebase Hosting
* User Authentication
* Uer Authorization
* Google Login
* Error Handling



&nbsp;

## RESTful endpoints

### GET /task
> Get task item by id

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "tasks": [
        {
            "id": 15,
            "title": "Dumbbell lateral raise. 3 sets of 12 reps",
            "category": "Todo",
            "UserId": 2,
            "createdAt": "2020-04-10T10:22:43.631Z",
            "updatedAt": "2020-04-10T10:22:43.631Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        },
        {
            "id": 14,
            "title": "Incline press. 3 sets of 12 reps",
            "category": "Todo",
            "UserId": 2,
            "createdAt": "2020-04-10T10:22:10.633Z",
            "updatedAt": "2020-04-10T10:22:10.633Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        },
        {
            "id": 13,
            "title": "Deadlift. 3 sets of 12 reps",
            "category": "Todo",
            "UserId": 2,
            "createdAt": "2020-04-10T10:22:01.627Z",
            "updatedAt": "2020-04-10T10:22:01.627Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        },
        {
            "id": 12,
            "title": "Wide grip pull-down. 3 sets of 12 reps",
            "category": "Todo",
            "UserId": 2,
            "createdAt": "2020-04-10T10:21:47.272Z",
            "updatedAt": "2020-04-10T10:21:47.272Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        },
        {
            "id": 11,
            "title": "Write Documentation",
            "category": "In Progress",
            "UserId": 2,
            "createdAt": "2020-04-10T10:12:34.909Z",
            "updatedAt": "2020-04-10T10:41:14.381Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        },
        {
            "id": 6,
            "title": "google auth",
            "category": "Completed",
            "UserId": 1,
            "createdAt": "2020-04-10T08:58:56.765Z",
            "updatedAt": "2020-04-10T08:58:56.765Z",
            "User": {
                "id": 1,
                "email": "user@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$rxzVsVXioHlzygu8z.F7s.iMa7Tbq211PHZcT6fEq5tx.t6Nrwv6S",
                "createdAt": "2020-04-10T00:20:53.530Z",
                "updatedAt": "2020-04-10T00:20:53.530Z"
            }
        },
        {
            "id": 2,
            "title": "Deploy Heroku",
            "category": "Completed",
            "UserId": 2,
            "createdAt": "2020-04-10T00:49:45.299Z",
            "updatedAt": "2020-04-10T10:26:47.170Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        },
        {
            "id": 1,
            "title": "Delpoy Firebase",
            "category": "In Progress",
            "UserId": 2,
            "createdAt": "2020-04-10T00:49:33.777Z",
            "updatedAt": "2020-04-10T08:56:53.542Z",
            "User": {
                "id": 2,
                "email": "karuniajulio33@gmail.com",
                "organization": "Hacktiv8",
                "password": "$2a$10$FW8ZtqvWKD.ct8KcRibNKejdI7IxDdwE81xbbLWvc1G3m4uWNPOii",
                "createdAt": "2020-04-10T00:34:52.093Z",
                "updatedAt": "2020-04-10T00:34:52.093Z"
            }
        }
    ]
}
```


_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```


_Response (500 - Internal Server Error)_
```
{
    "message": "<returned error message>"
}
```



---
### POST /task
> Add task item to database

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
    "accessToken": "<access_token>"
}
```
_Request Body_
```
{
    "title": "Example Title",
    "category": "Backlog"
}
```
_Response (200 - OK)_
```
{
    "task": {
        "id": 16,
        "title": "Example Title",
        "category": "Backlog",
        "UserId": 1,
        "updatedAt": "2020-04-10T11:12:43.131Z",
        "createdAt": "2020-04-10T11:12:43.131Z"
    }
}
```


_Response (401)_
> Validation Error (Fields are empty)
```
{
    "message": [
        "Title cannot be empty",
        "Category cannot be empty"
    ]
}
```

_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<returned error message>"
}
```

---

### PUT /task/:id
> Edit Task item in database by id

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
    "accessToken": "<access_token>"
}
```
_Request Body_
```
{
    "title": "Example Title Edited",
    "category": "Completed",
}
```
_Response (200 - OK)_
```
{
    "task": {
        "id": 16,
        "title": "Example Title Edited",
        "category": "Completed",
        "UserId": 1,
        "createdAt": "2020-04-10T11:12:43.131Z",
        "updatedAt": "2020-04-10T11:15:29.994Z"
    }
}
```

_Response (400)_
>User is not Authorized
```
{
    "message": "Access Forbidden"
}
```

_Response (401)_
> Validation Error (Fields are empty)
```
{
    "message": [
        "Title cannot be empty",
        "Category cannot be empty"
    ]
}
```

_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```


_Response (404 - Not Found)_
```
{
    "message": "Task not found"
}
```


_Response (500 - Internal Server Error)_
```
{
    "message": "<returned error message>"
}
```



---

### DELETE /todos/:id
> Delete task item from database by id

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
    "accessToken": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
{
    "message": "Task Successfully Deleted"
}
```

_Response (400)_
>User is not Authorized
```
{
  "message": "Access Forbidden"
}
```

_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Task not found"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---

### Post /register
> Register Account to Databse

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
}
```

_Request Body_
```
{
    "email": "example@gmail.com",
    "password": "password",
}
```

_Response (201 - Created)_
```
{
    "user": {
        "id": 6,
        "email": "example@gmail.com",
        "password": "$2a$10$eU/JHO.Lte2xzmFmPl7wke58i9X1XROd100KMjPfCbfqGrbxUXK36",
        "updatedAt": "2020-04-10T11:20:18.580Z",
        "createdAt": "2020-04-10T11:20:18.580Z",
        "organization": "Hacktiv8"
    }
}
```


_Response (401)_
> Empty Email Field

```
{
    "message": [
        "Email cannot be empty"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---

### Post /login
> Login User to Website

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
}
```

_Request Body_
```
{
   "email": "example@gmail.com",
   "password": "password",
}
```

_Response (201 - OK)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MTc4Mjh9.jpJm3buLat8Lhx3tUTcrTkyoefXn4yxAPLGL5YIYPVY"
}
```

_Response (400)_
```
{
    "message": "Incorrect Email Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---
### Post /loginGoogle
> Login User to Website with Google Account

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
}
```

_Request Body_
```
{
   "token": "<id_token>",
}
```

_Response (200)_
```
{
  "accessToken": "<access_token>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---

