// 7 no step of better-auth page installlation


import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);