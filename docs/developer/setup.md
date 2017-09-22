# Setup Reka development environment

Currently, this repo targets Node.js version 6.11.3, the latest LTS (long-term support) version.

1. Clone this repository

  ```sh
  git clone https://github.com/don-smith/reka.git
  cd reka
  ```

2. Install dependencies

  ```sh
  npm install
  npm run e2e-init
  ```

3. Apply the database migrations

  ```sh
  npm run knex migrate:latest
  ```

4. Add test data to the development database


  ```sh
  npm run knex seed:run
  ```

5. Start the development server

  ```sh
  npm run dev
  ```

6. In a new terminal window in the same folder, ensure all the tests pass


  ```sh
  npm test
  npm run e2e
  ```

7. (Optional) Install a pre-commit hook.

  ```sh
  npm run add-pre-commit-hook
  ```

  This causes all unit and integration tests to run during a `git commit`. They will all need to pass before the commit is successful.

