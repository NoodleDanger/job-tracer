# JobTracer

## Iteration

| Team: DANGER NOODLE |
| ------------------- |
| Brent Speight       |
| Gary Iacobucci      |
| Michael Melville    |
| Ted Craig           |

## Database

### Config module

If you do not already have one, create a `/config` folder in the project's root folder.
Within the `/config` folder, add a file named `deafult.json`.
Inside `deafult.json` add the following code:

```
{"PG_URI": "<remote_database_uri_here>"}
```

### Scratch team's database model:

![image](https://user-images.githubusercontent.com/75869500/125496797-b383ccbd-588c-428f-a448-e0cfa440a5fd.png)

## Linting

### Linting when using Jest for unit testing

If using Jest to perform unit testing, you may find yourself drowning in linter errors. In order to avoid this, within `.eslintrc.json` config file, be sure to add a property to ignore the test folders:

```
 "ignorePatterns": ["**/test", "**/__tests__"],
```

## Testing

### Linting issue when using Jest

If using Jest to perform unit testing, you may find yourself drowning in linter errors.
In order to avoid this, follow the lint config settings described in the Linting/Linting when using Jest for unit testing of this document.

### React component testing using Jest with Enzyme.

| Component Tested   | Tests File                      |
| ------------------ | ------------------------------- |
| JobApplicationList | `__tests__/react-unit-tests.js` |
