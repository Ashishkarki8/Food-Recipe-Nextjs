export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const queryParams = searchParams.get("query");

  const response = await fetch(
    `https://tasty.p.rapidapi.com/recipes/list?${queryParams}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      },
    }
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
