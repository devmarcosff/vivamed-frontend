import { parseCookies } from "nookies"

export default function getCookie() {
    if (typeof window !== 'undefined') {
        const userRole = parseCookies()
        const authRole = userRole.authRole
        return authRole
    }
}