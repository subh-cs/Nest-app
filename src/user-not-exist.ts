import { HttpException, HttpStatus } from "@nestjs/common";

export class UserDontExists extends HttpException {
  constructor() {
    super("User Not exists!", HttpStatus.BAD_REQUEST);
  }
}