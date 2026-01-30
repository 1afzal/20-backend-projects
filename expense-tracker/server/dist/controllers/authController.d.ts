import type { Request, Response } from "express";
declare function signup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function signin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export { signin, signup };
//# sourceMappingURL=authController.d.ts.map