import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    await supabase.auth.getUser();

    return response;
  } catch (e) {
    const url = new URL(request.url);
    const isLoginPage = url.pathname === "/login";

    if (!isLoginPage) {
      const loginPageURL = new URL("/login", request.url);
      return NextResponse.redirect(loginPageURL);
    }

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
