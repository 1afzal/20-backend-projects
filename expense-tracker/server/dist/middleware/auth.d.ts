import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "../types/auth.js";
interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}
declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=auth.d.ts.map