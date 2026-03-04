export enum HttpResponse {
  // Common Responses
  SUCCESS = "Success",
  SERVER_ERROR = "Internal server error",
  PAGE_NOT_FOUND = "Route not found",
  BAD_REQUEST = "Bad request",
  FORBIDDEN = "Forbidden",
  INVALID_ID = "Invalid ID format",
  UNEXPECTED_KEY_FOUND = "Unexpected key found",

  // Authentication
  UNAUTHORIZED = "Unauthorized access!",
  NO_TOKEN = "Access Denied: No token provided",
  TOKEN_EXPIRED = "Invalid or expired token",
  INVALID_CREDENTIALS = "Invalid credentials",
  MISSING_REQUIRED_FIELDS = "Missing required fields",

  // User
  USER_NOT_FOUND = "User not found",
  EMAIL_ALREADY_EXISTS = "Email already exists",
  INVALID_EMAIL = "Invalid email address",
  PASSWORD_TOO_SHORT = "Password must be at least 6 characters",
  INVALID_USER_DATA = "Invalid user data",

  // Auth Success
  REGISTRATION_SUCCESS = "User registered successfully",
  LOGIN_SUCCESS = "Login successful",
  LOGOUT_SUCCESS = "Logged out successfully",
  AVATAR_UPDATED_SUCCESS = "Avatar updated successfully",

  // Messages
  MESSAGE_SENT_SUCCESS = "Message sent successfully",
  NO_MESSAGES = "No messages found",
  MESSAGE_CONTENT_REQUIRED = "Message content is required",
  INVALID_RECIPIENT_ID = "Invalid recipient ID",
  CONTACTS_FETCHED = "Contacts fetched successfully",
  CHAT_PARTNERS_FETCHED = "Chat partners fetched successfully",
}