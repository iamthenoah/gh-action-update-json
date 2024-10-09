# Update JSON File Workflow

This GitHub Actions workflow updates a specified key in a JSON file and commits the changes to a specified branch.

## Description

The workflow takes a JSON file path, a key to update, and the new value. It can optionally commit the changes to a specified branch with a customizable commit message.

## Usage

To use this workflow, add it to your GitHub Actions configuration.

### Inputs

| **Input** | **Description**                                                         | **Required** | **Default**                     |
| --------- | ----------------------------------------------------------------------- | ------------ | ------------------------------- |
| `file`    | Relative path of the JSON file to update from the root of the repo.     | Yes          | -                               |
| `key`     | The key in the JSON file (e.g., `my.nested.key`).                       | Yes          | -                               |
| `value`   | The value to set for the specified key.                                 | Yes          | -                               |
| `branch`  | Branch to commit the changes to (leave empty for no commit).            | No           | `''` (no commit)                |
| `message` | Custom commit message, where `%f` = file, `%k` = key, and `%v` = value. | No           | `'Updated %f with \`%k:%v\`.'`  |
| `name`    | Name that will appear as the committer for the commit.                  | No           | `'Github Workflow'`             |
| `email`   | Email that will appear in the commit as the committer's email.          | No           | `'noreply@github-workflow.com'` |

### Example

Here’s an example of how to configure the workflow in your GitHub Actions file to update :

```yaml
name: Update package.json version

on: push

jobs:
  update-package-version:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Update Package Json version
        uses: iamthenoah/update-json-file@v1
        with:
          file: './package.json'
          key: 'version'
          value: ${{ github.ref_name }}
          branch: 'master'
          message: 'Updated %f version to `%v`'
          name: 'My Workflow'
          email: 'workflow@example.com'
```

## Permissions

This workflow requires elevated permissions in order to commit changes to a repositry. To fix this, add the following in the root of the workflow or job:

```yaml
permissions:
  contents: write
```

In addition, perform a checkout by passing the github context token:

```yaml
uses: actions/checkout@v4
with:
  token: ${{ secrets.GITHUB_TOKEN }}
```

## License

This project is licensed under the MIT License.
