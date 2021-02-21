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
      var formatedDate = new Date(placeholders.date).toLocaleDateString('fr-CA');
      return `## ${placeholders.release} ${formatedDate}\n${placeholders.body}`
    },
    releaseSeparator: '\n- - - -\n\n'
  }
};