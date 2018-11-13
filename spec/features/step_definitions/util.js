function getValidPayload (type, context = {}) {
  const lowercaseType = type.toLowerCase();
  switch (lowercaseType) {
    case 'get salt':
      return {
        email: context.email || 'e@ma.il'
      };
    case 'create user':
    case 'login':
      return {
        email: context.email || 'e@ma.il',
        digest: context.digest || '$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy'
      };
    case 'create task':
      return {
        title: 'title',
        body: 'body'
      }
    case 'replace user profile':
      return {
        summary: context.summary || 'foo'
      };
    case 'update user profile':
      return {
        name: context.name || {
          middle: 'd4nyll'
        }
      };
  }
}

function convertStringToArray (string) {
  return string
    .split(',')
    .map(s=>s.trim())
    .filter(s=>s!=="");
}

module.exports = {getValidPayload, convertStringToArray}
