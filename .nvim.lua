require('conform').formatters.prettier = {
  command = 'bunx',
  arg = { "--bun", "prettier", "$RELATIVE_FILEPATH" }
}
