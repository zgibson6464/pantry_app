const errorMessages = {
  NOT_FOUND: (modelName, id) => `${modelName} with ID ${id} not found.`,
  FAILED_TO_FETCH: (modelName) => `Failed to fetch ${modelName}.`,
  INVALID_INPUT: (field) => `Invalid input for field: ${field}.`,
  FAILED_TO_ADD: (modelName) => `Failed to add ${modelName}.`,
  FAILED_TO_DELETE: (modelName) => `Failed to delete ${modelName}.`,
  FAILED_TO_UPDATE: (modelName) => `Failed to update ${modelName}.`,
  USER_ALREADY_EXISTS: (username) =>
    `User with username ${username} already exists.`,
  ITEM_ALREADY_EXISTS: (title) => `${title} already exists`,
  USER_NOT_FOUND: (email) => `User with email ${email} not found.`,
  INVALID_CREDENTIALS: () => `Invalid credentials provided.`,
  USER_REGISTRATION_FAILED: () => `User registration failed.`,
  LOGIN_FAILED: () => `User login failed.`,
};

module.exports = errorMessages;
