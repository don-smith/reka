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

  This performs linting verification and runs all unit and integration tests during a `git commit`. For a commit to be permitted, there must not be any linting errors or failing tests. This check can be bypassed by using `git commit --no-verify` instead.

