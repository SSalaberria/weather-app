//@ts-ignore
import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  // Here's what's available on context.geo

  // context: {
  //   geo: {
  //     city?: string;
  //     country?: {
  //       code?: string;
  //       name?: string;
  //     },
  //     subdivision?: {
  //       code?: string;
  //       name?: string;
  //     },
  //   }
  // }
  //@ts-ignore

  return Response.json({
    geo: {
      ...context.geo,
      city: decodeURIComponent(escape(context.geo.city)),
    },
    header: request.headers.get("x-nf-geo"),
  });
};
