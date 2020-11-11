<h1 align="center">
  <br>
  <a href="#"><img src="https://www.dropbox.com/s/f7qmdoka1ltso8g/logo.png?raw=1" alt="CalendApp" width="120"></a>
  <br>
  API Endpoints
</h1>

<h4 align="center">A minimal Calendly clone built with Flask and React.</h4>


<p align="center">
  <a href="#appointment">Appointment</a> |
  <a href="#availability">Availability</a> |
  <a href="#meeting">Meeting</a> |
  <a href="#user">User</a> |
  <a href="#oauth2">OAuth2</a>
</p>


<p align="center"><b>NOTE: All times must be sent in UTC format, everything returned is ALSO in UTC format.</b></p>

## Appointment
### `@authenticated GET` &rarr; /appointments

Response Body:

#### Status `200`
```json
{
    "appointments": [
        {
            "created_at": "Thu, 05 Nov 2020 23:03:13 GMT",
            "email": "omar@quazi.co",
            "id": 1,
            "name": "Omar Quazi",
            "time": "Thu, 05 Nov 2020 23:59:52 GMT",
            "timezone": "America/Toronto",
            "updated_at": "Thu, 05 Nov 2020 23:03:13 GMT"
        },
        {
            "created_at": "Thu, 05 Nov 2020 23:04:56 GMT",
            "email": "omar@quazi.co",
            "id": 2,
            "name": "Omar Quazi",
            "time": "Thu, 05 Nov 2020 23:59:52 GMT",
            "timezone": "America/Toronto",
            "updated_at": "Thu, 05 Nov 2020 23:04:56 GMT"
        }
    ]
}
```

#### Status `401`
```json
{
    "message": "Unauthorized user",
    "status": "error"
}
```

### `@authenticated POST` &rarr; /appointment

Request Body:
```json
{
    "meeting_id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "time": 1604620792, // Must be in the future
    "timezone": "America/Toronto"
}
```

Response Body:

#### Status `200`
```json
{
    "message": "Appointment created successfully!",
    "status": "success"
}
```

#### Status `400` - *meeting_id* must be valid and a real meeting id
```json
{
    "status": "error",
    "message": "Invalid meeting id format or this meeting does not exist"
}
```

#### Status `400` - The _name_ must be between 1 and 50 characters
```json
{
    "status": "error",
    "message": "Name length must be between 1 and 50 characters"
}
```

#### Status `400` - *email* needs to be valid format
```json
{
    "status": "error",
    "message": "Invalid email format, please try again."
}
```

#### Status `400` - *time* must not be empty
```json
{
    "status": "error",
    "message": "Time cannot be empty"
}
```

#### Status `400` - *time* cannot be in the past!

PLEASE NOTE: This is **UTC**

```json
{
    "status": "error",
    "message": "Time cannot be in the past, please try again!"
}
```


#### Status `400` - *time* couldn't be converted from UTC timestamp

Note: Make sure you divide the time by 1000 before sending to server

```json
{
    "status": "error",
    "message": "Invalid time provided."
}
```


#### Status `400` - *timezone* must valid
```json
{
    "status": "error",
    "message": "Please enter a valid timezone"
}
```

## Availability

### `@authenticated GET` &rarr; /availabilities

Response Body:

#### Status `200`
```json
{
    "availabilities": [
        {
            "created_at": "Sat, 07 Nov 2020 01:01:15 GMT",
            "day": 7,
            "end_time": 1040,
            "id": 1,
            "start_time": 540,
            "updated_at": "Sat, 07 Nov 2020 01:01:15 GMT"
        }
    ]
}
```

#### Status `401`
```json
{
    "message": "Unauthorized user",
    "status": "error"
}
```

### `@authenticated POST` &rarr; /availability
_day_ needs to be a number from 1 to 7
<details>
<summary>Show Days:</summary>
<br>
1 = Monday
<br >
2 = Tuesday
<br >
3 = Wednesday
<br >
4 = Thursday
<br >
5 = Friday
<br >
6 = Saturday
<br >
7 = Sunday
</details>


Request Body:
```json
{
    "day": 7, 
    "start_time": 540,
    "end_time": 1040
}
```

Response Body:

#### Status `200`
```json
{
    "message": "Availability added successfully!",
    "status": "success"
}
```

#### Status `400` - _day_ must be between 1 and 7 inclusive
```json
{
    "status": "error",
    "message": "Invalid date format, must be between 1 and 7"
}
```

#### Status `400` - *start_time* needs to be of type `int`
```json
{
    "status": "error",
    "message": "Invalid start time format must be int"
}
```

#### Status `400` - *end_time* needs to be of type `int`
```json
{
    "status": "error",
    "message": "Invalid end time format must be int"
}
```

#### Status `400` - *start_time* must be less than *end_time* (before)
```json
{
    "status": "error",
    "message": "Start time must be before end time"
}
```

#### Status `400` - *start_time* and *end_time* must be between 1 and 1440 minutes!
```json
{
    "status": "error",
    "message": "Both times must be between 1 and 1440 minutes."
}
```


## Meeting

### `@authenticated GET` &rarr; /meetings

Response Body:

#### Status `200`
```json
{
    "meetings": [
        {
            "created_at": "Thu, 05 Nov 2020 18:00:12 GMT",
            "description": "One-on-one",
            "duration": 60,
            "id": 1,
            "name": "60 Minute Meeting",
            "updated_at": "Thu, 05 Nov 2020 18:00:12 GMT"
        },
        {
            "created_at": "Thu, 05 Nov 2020 18:03:51 GMT",
            "description": "testing adding a meeting via API",
            "duration": 120,
            "id": 2,
            "name": "Test Meeting",
            "updated_at": "Thu, 05 Nov 2020 18:03:51 GMT"
        }
    ]
}
```

#### Status `401`
```json
{
    "message": "Unauthorized user",
    "status": "error"
}
```

### `@authenticated POST` &rarr; /meeting

Note: This endpoint is great too if you woud like to set up a default 60 minute meeting. If an empty **POST** request is sent by an **authenticated** user, it will _automatically_ create a meeting for the user.

Request Body:
```json
{  
    "name": "Test meeting 2",
    "description": "Test meeting 2 - Description",
    "duration": 60
}
```

Response Body:

#### Status `200`
```json
{
    "message": "Successfully added meeting for user",
    "status": "success"
}
```

#### Status `400` - _name_ must be between 1 and 255 characters
```json
{
    "status": "error",
    "message": "Name length must be between 1 and 255 characters"
}
```

#### Status `400` - _duration_ needs to be of type `int`
```json
{
    "status": "error",
    "message": "Invalid duration data type, must be an int"
}
```

#### Status `400` - _duration_ must be be less than 1440 mins
```json
{
    "status": "error",
    "message": "Duration cannot be greater than one day."
}
```



## User

### `GET` &rarr; /user/&lt;username&gt;

Response Body:

#### Status `200`
```json
{
    "email": "omar@quazi.co",
    "id": 1,
    "timezone": "America/Toronto",
    "username": "omar"
}
```

#### Status `404`
This request is perfect, this helps us find out if the username entered is unique or not
```json
{
    "message": "User does not exist.",
    "status": "error"
}
```

### `@authenticated GET` &rarr; /user

Response Body:

#### Status `200`
```json
{
    "created_at": "Thu, 05 Nov 2020 17:26:48 GMT",
    "email": "omar@quazi.co",
    "id": 3,
    "stripe_customer_id": "REPLACE THIS LATER",
    "timezone": "America/Toronto",
    "updated_at": "Thu, 05 Nov 2020 17:43:08 GMT",
    "username": "omar"
}
```

#### Status `401`
```json
{
    "message": "Unauthorized user",
    "status": "error"
}
```

### `@authenticated PATCH` &rarr; /user 

Request Body:
```json
{
    "first_name": "Omar", // String
    "last_name": "Quazi", // String
    "timezone": "America/New_York", // Valid Timezone
    "username": "username" // Must be unique
}
```

#### Status `200`
```json
{
    "message": "Updated the following fields: first name, last name, timezone, username",
    "status": "success"
}
```

#### Status `400` - _timezone_ is invalid
```json
{
    "message": "Please enter a valid timezone",
    "status": "error"
}
```

#### Status `400` - _username_ is same
```json
{
    "message": "That is already your username",
    "status": "error"
}
```

#### Status `400` - _username_ is already taken
```json
{
    "message": "Username is already taken, try something else!",
    "status": "error"
}
```

### `@authenticated DELETE` &rarr; /user

Response Body:

#### Status `200`
```json
{
    "status": "success",
    "message": "Successfully deleted user account."
}
```
## OAuth2
### Setup
* `cd server`
* `touch .env` or create `.env` file in current directory
* copy and paste the values for the following environment variables from the pinned messages in the Slack `#team-vampires` channel:
  * `APP_SECRET_KEY`
  * `GOOGLE_CLIENT_ID`
  * `GOOGLE_CLIENT_SECRET` 
* `pipenv install`
