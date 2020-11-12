import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Axios from "axios";

const serversToCheck = [
  {
    name: "Dev-VM",
    url: "http://20.37.51.8:4000/healthcheck",
  },
  {
    name: "Random-VM",
    url: "http://21.37.51.8:4000/healthcheck",
  },
];

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Call each service and map the response
  const body = await Promise.all(
    serversToCheck.map((server) =>
      Axios.get(server.url, { timeout: 1000 })
        .then((res) => ({
          ...server,
          status: res.data.status,
        }))
        .catch((error) => ({
          ...server,
          status: "Error",
          error,
        }))
    )
  );

  context.res = {
    body,
  };
};

export default httpTrigger;
