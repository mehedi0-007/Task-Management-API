# Task Management API

A NestJS-based task management API built with PostgreSQL and Prisma. The project uses JWT authentication, global guards, request validation, Swagger documentation, and a modular architecture for auth, boards, columns, tasks, and users.

## Features

- JWT authentication with public and protected routes
- Modular NestJS structure with clean separation of controllers, services, DTOs, and modules
- Prisma ORM with PostgreSQL
- Validation with `class-validator` and `class-transformer`
- Swagger API documentation
- Soft delete support and ordered task/column workflows
- Global response handling and exception filtering
- Console logging information system
- Used CORS to prevent request from unauthorized urls
- Used Rate Limiting for all routes and custom rate limiting for auth routes
- Used track activity log under the user routes
- All the coding sections are hand written exept the project and prisma initialization

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root and add the required variables:

```env
DATABASE_URL="PostgreSQL Database URL you want to use in this project since it built using Prisma for the PostgreSQL"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRE= "Expiry time you prefer"
JWT_REFRESH_EXPIRE= "Expiry time you prefer"
CORS_ORIGIN="Urls you want to request from","Example.com","Example.com"
PORT=3000
```

### 3. Run database migration steps

If this is the first time running the project, apply the Prisma migration and generate the client:

```bash
npx prisma migrate dev --name init
```

If you only need to regenerate the Prisma client after schema updates:

```bash
npx prisma generate
```

### 4. Start the application

```bash
npm run start:dev
```

## LIve API Link

```
https://task-management-api-bct4.onrender.com/
```

## API Documentation

Swagger UI is available at:

```text
https://task-management-api-bct4.onrender.com/docs
```

## Project Structure

```text
src/
  common/
  module/
    app/
    auth/
    boards/
    columns/
    tasks/
    users/
  prisma/
prisma/
  schema.prisma
  migrations/
```

## Key Technical Decisions I Made

1. I used the JWT authentication system with global auth guard and I use @Public() custom decorator for the public routes instead of applying the guard everywhere.
2. I used @Currentuser() custom decorator in order to get user info after validating the authentication system instead of keeping the controller and service layer a messy one.
3. I chose a modular NestJS architecture with separate auth, boards, columns, tasks, and users modules to keep domain logic isolated and easier to scale and also kept every controller, services, dto, modules in seperate folders trying to maintaining a clean architecture.
4. I also used the PostgreSQL database along with Prisma ORM to build the whole project.
5. I used the class validator, class transformer to validate and transform the upcoming request to keep the backend system persistent.
6. I tried to implement the Swagger in best way though I wasn't familiar with it but it taught me a lot of things about proper documenting a porject.
7. I tried to maintain the proper architecture as per given instruction and built the project from scratch.

## Challenges I Faced And My Approach To Solve Them

1. The first challenge I faced was to move the task part between the columns and also reorder them accordingly but after thinking for some time and getting help with some resources I came with a approach. At first I searched the task with taskId, then if it need to move to another column I need two things to get done at first. First I need to make a space into that exact position for the destination column and also need to reorder the tasks in the source column. Then I need to reorder the tasks in the destination column.
   Then update the moving tasks source columnId and positions accroding to the info came from the request. This is how I solved it.

2. I also faced challenge when making an central exeption filter so every exeption gets from here. At first I wasn't familiar with the prisma errors handling in here. After following some docs and resources it came in my hand.

3. Implementing the search & filter also an another challege. I applied the destructuring and checking properties by ternery operation to make the codes clean and understandable.

4. Another challenge I faced was to implement the swagger in the project as I was not quite familiar with it but with some documentation and online resources I came to understand it to get the project done and implemented accordingly.

5. I also wasn't familiar with how I can use the JWT auth with the swagger but it seemed fun after learning that and I used it accordingly.

## Future Improvements

If I could get some more time I would have implemented some more features though I haven't think of it that much rather than the requirements such as adding an admin pannel for overall report for the whole system, validating eamils and phone numbers by one time codes, keeping a counter of "In progress" tasks, triggering and using events to notify about due dates or emergency tagged tasks etc.
