import { gql } from "@apollo/client";

/**
 * Register customer mutation query.
 */
const REGISTER_CUSTOMER = gql`
    mutation RegisterCustomer( $input: RegisterCustomerInput! ) {
        registerCustomer( input:$input ) {
            customer {
                id
                username
                email
                firstName
	            lastName
                jwtAuthToken
            }
        }
    }
`;

export default REGISTER_CUSTOMER;
export const UPDATE_USER = gql`
    mutation UPDATE_USER( $input: UpdateUserInput! ) {
        updateUser( input:$input ) {
            user {
                id                
                firstName
	            lastName               
            }
        }
    }
`;
