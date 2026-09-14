import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name, {timestamp: true})
    use(req: Request, res: Response, next: (error?: any) => void) {
        this.logger.log(`Path: [${req.path}] • Method: [${req.method}]`)
        next()
    }
}