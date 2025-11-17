export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get ALL parameters from the URL
    const from = searchParams.get("from") || "0";
    const size = searchParams.get("size") || "12";
    const query = searchParams.get("q");
    const tags = searchParams.getAll("tags"); // Can have multiple tags

    console.log("🔍 Received params:", { from, size, query, tags });

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Search query is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build the Tasty API URL with proper parameters
    const apiParams = new URLSearchParams({
      from,
      size,
      q: query,
    });

    // Add tags if present
    tags.forEach(tag => apiParams.append('tags', tag));

    const apiUrl = `https://tasty.p.rapidapi.com/recipes/list?${apiParams.toString()}`;
    
    console.log("📡 Calling Tasty API:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      },
    });

    console.log("📥 API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      return new Response(
        JSON.stringify({ 
          error: "Failed to fetch from Tasty API",
          status: response.status,
          details: errorText
        }),
        { 
          status: response.status, 
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    const data = await response.json();
    console.log("✅ Recipes found:", data.count || 0);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("💥 Server Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}