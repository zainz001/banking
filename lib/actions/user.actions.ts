'use server';
import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
// const {
//     APPWRITE_DATABASE_ID: DATABASE_ID,
//     APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
//     APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
//   } = process.env;
  
//   export const getUserInfo = async ({ userId }: getUserInfoProps) => {
//     try {
//       const { database } = await createAdminClient();
  
//       const user = await database.listDocuments(
//         DATABASE_ID!,
//         USER_COLLECTION_ID!,
//         [Query.equal('userId', [userId])]
//       )
  
//       return parseStringify(user.documents[0]);
//     } catch (error) {
//       console.log(error)
//     }
//   }
export const Signin = async ({ email, password }: signInProps) => {
    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
  
        
  
      return parseStringify(session);
    } catch (error) {
      console.error('Sign-In Error:', error);
      throw new Error('Login failed');
    }
  };
  

export const SignUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    try {
        const { account } = await createAdminClient();
        
        // Create a new user
        const newUser = await account.create(ID.unique(), email, password, `${firstName},${lastName}`);
        
        // Create a session for the new user
        const session = await account.createEmailPasswordSession(email, password);
        
        console.log('New User:', newUser); // Log new user details
        console.log('Session secret:', session.secret); // Log session secret for debugging

        // Set cookie with session secret
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error('Sign Up error:', error);
        
    }
}


//... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      console.log("Logged-in User Data:", user);
      return parseStringify(user);
    } catch (error) {
      console.error("Error retrieving user:", error); // Log any errors
      return null;
    }
  }
  
  

const isValidJWT = (token: string): boolean => {
    const segments = token.split('.');
    return segments.length === 3; // JWT must have 3 segments
};


export const logoutAccount = async()=>{
try {
    const {account} = await createSessionClient();
    cookies().delete('appwrite-session')
    await account.deleteSession('current')
} catch (error) {
    
}
}