// "use client";   

// import { authClient } from "@/lib/auth-client";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";

// export default function Logout() {

//     const router = useRouter();

//     const handleLogout = async () => {
//         await authClient.signOut();
//         router.push("/"); // Redirect to home page after logout
//     }
//     return(
//         <div>
//             <Button onClick={handleLogout} variant={"outline"}>
//                 Logout
//             </Button>
//         </div>
//     )
// }

"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Enhanced logout with toast message
    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await authClient.signOut();
            
            // Redirect to login with logout message
            const loginUrl = new URL('/', window.location.origin);
            loginUrl.searchParams.set('message', 'logged-out');
            window.location.href = loginUrl.toString();
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback to home page if login redirect fails
            router.push("/");
        }
        setIsLoading(false);
    }

    return(
        <div>
            <Button onClick={handleLogout} disabled={isLoading} variant={"outline"}>
                {
                    isLoading ? "Logging out..." : "Logout"
                }
            </Button>
        </div>
    )
}
