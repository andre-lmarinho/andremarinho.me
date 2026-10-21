# Issue tracker: GitHub

Issues and specs live in GitHub Issues in `andre-lmarinho/me`.
Use the `gh` CLI from this repository.

- Create: `gh issue create --title "..." --body-file <file>`
- Read: `gh issue view <number> --json number,title,body,labels,comments`
- List: `gh issue list --state open --json number,title,labels`
- Label: `gh issue edit <number> --add-label "..."`
- Close: `gh issue close <number>`

When a skill says to publish to the issue tracker, create an issue.
When it says to fetch a ticket, read the corresponding issue.

**PRs as a request surface: no.**
