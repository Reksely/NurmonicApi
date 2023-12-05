interface ErrorResponse {
  error: {
    message: string;
    type: string;
    param: null;
    code: null;
  };
}

export const checkAuth = async (bearer: string, request: any): Promise<true | ErrorResponse> => {
  if (!bearer || bearer !== 'Bearer nur_NurmonicLikesMeowingOn2024') {
    return {
      error: {
        message:
          'You didn\'t provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e., Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you\'re accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://api.nurmonic.xyz/.',
        type: 'invalid_request_error',
        param: null,
        code: null,
      },
    };
  }

  // If the authorization is valid, you can perform additional checks or actions here.
  // For example, you can make API calls or perform any required operations.

  //return true; // Authorization is valid
};