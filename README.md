### README.md

```markdown
# Profile Management API

This API provides endpoints for managing user profiles, roles, and tags. Built using **NestJS**, it follows RESTful principles and uses JSON as the data exchange format.

---

## Base URL
```

https://your-api-domain.com/api/v1

````

---

## Endpoints

### 1. Profile Management

#### **1.1 Get All Profiles**
- **Endpoint**: `/profile`
- **Method**: `GET`
- **Description**: Fetch all user profiles.
- **Response**:
  ```json
  [
    {
      "id": "1",
      "user_id": "123",
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "role": "Developer",
      "tags": ["JavaScript", "NestJS"]
    }
  ]
````

#### **1.2 Get Profile by ID**

- **Endpoint**: `/profile/:id`
- **Method**: `GET`
- **Description**: Fetch a user profile by its ID.
- **Response**:
  ```json
  {
    "id": "1",
    "user_id": "123",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "role": "Developer",
    "tags": ["JavaScript", "NestJS"]
  }
  ```

#### **1.3 Create a New Profile**

- **Endpoint**: `/profile`
- **Method**: `POST`
- **Description**: Create a new user profile.
- **Request Body**:
  ```json
  {
    "user_id": "123",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "role": "Developer",
    "tags": ["JavaScript", "NestJS"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Profile created successfully",
    "profile": {
      "id": "1",
      "user_id": "123",
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "role": "Developer",
      "tags": ["JavaScript", "NestJS"]
    }
  }
  ```

#### **1.4 Update Profile**

- **Endpoint**: `/profile/:id`
- **Method**: `PUT`
- **Description**: Update an existing user profile.
- **Request Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Smith",
    "role": "DevOps Engineer",
    "tags": ["Docker", "Kubernetes"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Profile updated successfully",
    "profile": {
      "id": "1",
      "user_id": "123",
      "first_name": "John",
      "last_name": "Smith",
      "username": "johndoe",
      "role": "DevOps Engineer",
      "tags": ["Docker", "Kubernetes"]
    }
  }
  ```

#### **1.5 Delete Profile**

- **Endpoint**: `/profile/:id`
- **Method**: `DELETE`
- **Description**: Delete a user profile.
- **Response**:
  ```json
  {
    "message": "Profile deleted successfully"
  }
  ```

---

### 2. Role Management

#### **2.1 Get Available Roles**

- **Endpoint**: `/role`
- **Method**: `GET`
- **Description**: Fetch a list of available roles.
- **Response**:
  ```json
  ["Developer", "DevOps Engineer", "Designer", "Product Manager"]
  ```

---

### 3. Tag Management

#### **3.1 Get Available Tags**

- **Endpoint**: `/tag`
- **Method**: `GET`
- **Description**: Fetch a list of available tags.
- **Response**:
  ```json
  ["JavaScript", "NestJS", "Docker", "Kubernetes"]
  ```

---

## Error Responses

For all endpoints, the API returns the following error format for unsuccessful requests:

```json
{
  "statusCode": 400,
  "message": "Invalid request",
  "error": "Bad Request"
}
```

---

## Authorization

Some endpoints may require a Bearer Token for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-token-here>
```

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/IlhamLamp/cmty-profile-service.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in `.env` file.
4. Start the server: dev:
   ```bash
   npm run start:dev
   ```

```

```
