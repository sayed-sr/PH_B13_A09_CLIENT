Please allow at least 5 seconds for the page to load after navigating or clicking any button, as data may still be processing or fetching from the server.

Login to adopt , add-pet,  access listind and requestes

HappyPet (Frontend Application)

Purpose=>

The HappyPet frontend is a modern Next.js-based UI for a Pet Adoption Platform.
It allows users to browse pets, view details, submit adoption requests, and manage listings with a clean and responsive user interface.

The frontend connects to a secure Express + MongoDB backend using REST APIs with JWT authentication.

 Live URL=>https://client-one-nu-59.vercel.app

Features=>
 1. Browse all available pets with search and category filtering
2. Dynamic featured pets section (fetches from backend API)
 3. Detailed pet view page with adoption functionality
4. Secure authentication system (login/register with JWT support)
5. Usr dashboard (My Listings, My Requests)


NPM Packages Used=>
next – React framework for production
react – UI library
react-dom – DOM rendering for React
react-icons – Icon library for UI
react-hot-toast – Toast notifications
@heroui/react – UI components library
@heroui/styles – Styling system
better-auth – Authentication system
@better-auth/mongo-adapter – MongoDB auth adapter
mongodb – Database interaction 


 Authentication Flow=>
Users register/login using email/password or Google login
JWT token is stored in HTTP-only cookies
Protected routes verify session on server side
Unauthorized users are redirected to login page

Pet Details Page=>
Full pet information
Adoption form (modal/side panel)
Submit adoption request (private route)


My Listings (Dashboard)=>
Shows user’s uploaded pets
Stats:
Total listings
Available pets
Adopted pets
Edit / Delete / View actions


 My Requests=>
Shows adoption requests
Cancel request option
Status tracking (Pending / Approved / Rejected)
Backend Integration



Frontend communicates with backend via REST API:

GET /pets
GET /featured
POST /pets
GET /my-pets/:email
POST /adoption
PATCH /adoption/:id



