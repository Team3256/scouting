// import { NextApiRequest, NextApiResponse } from 'next';
// // import { getSession } from '@clerk/nextjs'; // Import getSession
// import { createClient } from '../lib/utils/supabase/client'; // Import your Supabase client
// import { auth, currentUser } from "@clerk/nextjs";
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   const { userId } = auth();
//   const user = await currentUser();
//   const supabase = createClient(); // Create your Supabase client
//   if (!userId || !user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const supabaseUser = {
//     id: user.id,
//   };

//   try {
//     await supabase.auth.signUp({ email: user.id, password: 'password' });
//     res.status(200).json({ message: 'Supabase user created/updated successfully' });
//   } catch (error) {
//     console.error('Error creating Supabase user:', error);
//     res.status(500).json({ message: 'Internal error' });
//   }
// }
// /*
// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//   // Routes that can be accessed while signed out
//   publicRoutes: ["/dashboard"],
//   // Routes that can always be accessed, and have
//   // no authentication information
//   ignoredRoutes: ["/dashboard"],
// });

// export const config = {
//   // Protects all routes, including api/trpc.
//   // See https://clerk.com/docs/references/nextjs/auth-middleware
//   // for more information about configuring your Middleware
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };


// */
