import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Validate the decoded token has required properties
        if (!decoded || typeof decoded !== "object" || !("userId" in decoded) || !("email" in decoded)) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.js.map