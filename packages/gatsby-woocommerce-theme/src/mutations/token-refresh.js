import { gql } from "@apollo/client";

const REFRESHAUTHTOKEN = gql`
  mutation REFRESHAUTHTOKEN($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`;

export default REFRESHAUTHTOKEN;
