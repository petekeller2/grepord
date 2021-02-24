module.exports = {
  // NOTE: check if author is present as might be returned as null.
  commit: ({ message, url, author, name }) => `- [${message}](${url}) - ${author ? `@${author}` : name}`,
  issue: '- {{labels}} {{name}} [{{text}}]({{url}})',
  label: '[**{{label}}**]',
  noLabel: 'closed',
  group: '\n#### {{heading}}\n',
  changelogTitle: '# Changelog\n\n',
  template: {
    release: function (placeholders,body) {
      var dateParts = placeholders.date.split("/");
      var formatedDate = new Date(dateParts[2], dateParts[1] - 1, +dateParts[0])
        .toLocaleDateString('fr-CA'); // YYYY-MM-DD
      return `## <RELEASE_VERSION> - ${formatedDate}\n${placeholders.body}`
    },
    releaseSeparator: '\n- - - -\n\n'
  }
};