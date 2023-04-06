import { RequestBody, ResponseBody } from "../../config/domain";
import { AuthenticatedUser, RepositoryUser } from "./entities/User";

export interface UserControllerPort {
  register(
    request: RequestBody<{ form: { name: string; password: string } }>,
    response: ResponseBody<RepositoryUser>
  );
  login(
    request: RequestBody<{ form: { name: string; password: string } }>,
    response: ResponseBody<AuthenticatedUser>
  );
  verify(
    request: RequestBody<{ token: string }>,
    response: ResponseBody<AuthenticatedUser>
  );
}
