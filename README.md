[![deploy](https://github.com/iamthenoah/update-json-file/actions/workflows/build.yml/badge.svg)](https://github.com/iamthenoah/update-json-file/actions/workflows/build.yml)
[![publish](https://github.com/iamthenoah/gh-action-update-json/actions/workflows/publish.yml/badge.svg)](https://github.com/iamthenoah/gh-action-update-json/actions/workflows/publish.yml)

# Update JSON File Workflow

This GitHub Actions workflow updates a specified key in a JSON file and commits the changes to a specified branch.

## Description

The workflow takes a JSON file path, a key to update, and the new value. It can optionally commit the changes to a specified branch with a customizable commit message.

## Usage

To use this workflow, add it to your GitHub Actions configuration.

### Inputs

| **Input** | **Description**                                                                 | **Required** | **Default**                     |
|-----------|---------------------------------------------------------------------------------|--------------|---------------------------------|
| `file`    | Relative path of the JSON file to update from the root of the repo.             | Yes          | —                               |
| `key`     | The key in the JSON file to update (e.g. `my.nested.key`).                      | Yes          | —                               |
| `value`   | The new value to assign to the specified key.                                   | Yes          | —                               |
| `commit`  | Whether to commit the changes.                                                  | No           | `'true'`                        |
| `branch`  | Branch to commit the changes to. Defaults to the current branch if unspecified. | No           | _current branch_                |
| `message` | Commit message. Supports placeholders: `%f` = file, `%k` = key, `%v` = value.   | No           | `'Updated %f with \`%k:%v\`.'`  |
| `name`    | Commit author name.                                                             | No           | `'Github Workflow'`             |
| `email`   | Commit author email.                                                            | No           | `'noreply@github-workflow.com'` |

### Example

Here’s an example of how to configure the workflow in your GitHub Actions file to update :

```yaml
name: Update package.json version

on:
  push:
    tags:
      - 'v*'

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
        uses: iamthenoah/gh-action-update-json@v4
        with:
          # The 'file' input specifies the relative path of the JSON file to update from the root.
          # Default: None, Required: true
          file: './package.json'

          # The 'key' input is the key in the JSON file to update (e.g., 'my.nested.key').
          # Default: None, Required: true
          key: 'version'

          # The 'value' input specifies the value to set for the key.
          # Default: None, Required: true
          value: ${{ github.ref_name }}

          # The 'branch' input specifies the branch to commit changes to.
          # Default: '', Required: false
          branch: 'master'

          # The 'message' input is the custom commit message format.
          # Default: 'Updated %f with `%k:%v`.', Required: false
          message: 'Updated %f version to `%v`'

          # The 'name' input specifies the name shown as the commit sender.
          # Default: 'Github Workflow', Required: false
          name: 'My Workflow'

          # The 'email' input sets the email of the committer.
          # Default: 'noreply@github-workflow.com', Required: false
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
