# Radiant Monitor

## Prepare for run
Make `settings.json` file at the root of the repository and then fill it with the database connection information.

```json
{
  "mysql": {
    "host": "localhost",
    "user": "radiant",
    "password": "radiant",
    "database": "radiant"
  }
}
```

## How to run
1. Install [meteor](https://www.meteor.com/)
2. Install [npm](https://www.npmjs.com/) and [node](https://nodejs.org/)
3. $ meteor npm install
4. $ meteor run --settings settings.json
5. Check http://localhost:3000/
