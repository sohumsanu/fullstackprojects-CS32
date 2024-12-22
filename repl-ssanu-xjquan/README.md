# REPL-ssanu-xjquan

## Project Details

REPL is a full-stack web application that let's you view and search CSV files. REPL was built using [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Install

To install REPL, you must clone from [GitHub](https://github.com/cs0320-f23/repl-ssanu-xjquan). Run the following commands in your terminal:
```shell
git clone https://github.com/cs0320-f23/repl-ssanu-xjquan.git
cd repl-ssanu-xjquan
npm install
```

## Running REPL
To run REPL on a local server, please cd into the Frontend folder and run the following commands.

```shell
cd Frontend
npm run start
```

To run the backend server, run the server Java file.

```shell
cd Backend
```
## Using REPL

### Load

To load a CSV file, run the `load` command in the Mock command prompt:

```shell
load <file_path>
```

where `<file_path>` is the absolute filepath to the CSV on your computer.

### View

To view a CSV file, run the `view` command in the Mock command prompt:

```shell
view
```

If a CSV file is not loaded beforehand, Mock will error and say "no file is loaded."

### Search

To search a CSV file, run the `search` command in the Mock command prompt:

```shell
search <column> <value>
```

where `<column>` is either the column name or index, and `value` is the search value.

REPL searches the column index using zero-based indexing. This means that Mock searches the first column by the 0th index, and so on.

If a search value contains a space, the search value must be wrapped in double quotes. In other words, if the search term is `Joe Jonas` then you must search by `"Joe Jonas"`.

### Mode

By default, Mock only displays the output of each command. To toggle between the different display modes, run `mode verbose` for a verbose output and run `mode brief` to switch back to brief.


## Errors & Bugs

As we know of, there are currently no known errors in the functionality of the program. There are errors in some of the testing functionality — as in the Jest tests are not running due to version control issues.

## Design Decisions

At a high level, we made a few interesting design decisions. For User Story 2, users have to initialize a commanddict object, then use the addCommand function with a string and its respective function. Then, this object is passed into the high level <REPL /> component which have all the functions the user desires.

## Contributors

By **xjquan** and **ssanu**