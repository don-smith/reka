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
  ```

3. (Optional) Apply the database migrations - this is run during `postinstall`

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
  # npm run e2e:debug if you want to see console.logs
  ```


## NOTE: A pre-commit hook in place

By default, the linter (static code analysis) and all tests must pass before a `git commit` is permitted. If you absolutely need to, this quality gate can be bypassed by using `git commit --no-verify`.

