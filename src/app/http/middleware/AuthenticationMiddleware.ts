import jwt from "jsonwebtoken";

export default async (req: any, res: any, next: any) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded: any = jwt.decode(token);

        if (decoded && decoded.exp && Date.now() < decoded.exp * 1000) {
            const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_REALM_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
            req.user = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
            req.token = token;
            console.log(req.user);
            next();
        } else {
            res.status(401).json({ message: "Token expired" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
