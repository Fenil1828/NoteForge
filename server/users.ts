"use server"
import { auth } from "@/lib/auth";

export const signInUser = async (email: string, password: string) => {
   try {
     const response = await auth.api.signInEmail({
        body: {
            email,
            password
        },
    });

    // Check if user exists and email is verified
    if (response?.user && !response.user.emailVerified) {
        return {
            success: false,
            message: "Please verify your email address before logging in. Check your inbox for the verification link.",
            errorType: "EMAIL_NOT_VERIFIED"
        };
    }

    return {
        success: true,
        message: "Signed in successfully",
        user: response?.user
    }

   } catch(error) {
    const e = error as Error
    console.error(error)
    
    // Check if error message indicates unverified email
    if (e.message?.toLowerCase().includes("email") && e.message?.toLowerCase().includes("verify")) {
        return {
            success: false,
            message: "Please verify your email address before logging in. Check your inbox for the verification link.",
            errorType: "EMAIL_NOT_VERIFIED"
        };
    }
    
    return {
        success: false,
        message: e.message || "Failed to sign in"
    }
   }
};

export const signUpUser = async (email: string, password: string, name: string) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            }
        })

        return {
            success: true,
            message: "Account created successfully! Please check your email to verify your account.",
            user: response?.user
        }

    } catch(error) {
        const e = error as Error;
        console.error(error)
        
        return {
            success: false,
            message: e.message || "Failed to sign up"
        }
    }
}

// Additional helper function to resend verification email
export const resendVerificationEmail = async (email: string) => {
    try {
        // Check if your auth system has a resend verification method
        await auth.api.sendVerificationEmail({
            body: { email }
        });
        
        return {
            success: true,
            message: "Verification email sent successfully! Please check your inbox."
        };
    } catch(error) {
        const e = error as Error;
        console.error(error)
        
        return {
            success: false,
            message: e.message || "Failed to send verification email"
        };
    }
}

// // Helper function to get user verification status
// export const getUserVerificationStatus = async (email: string) => {
//     try {
//         // This depends on your auth system's API
//         const user = await auth.api.getUser({
//             body: { email }
//         });
        
//         return {
//             success: true,
//             emailVerified: user?.emailVerified || false
//         };
//     } catch(error) {
//         const e = error as Error;
//         console.error(error)
        
//         return {
//             success: false,
//             message: e.message || "Failed to get user status"
//         };
//     }
// }
