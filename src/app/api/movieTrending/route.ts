export async function POST(request: Request) {
  try {
    await request.json();

    const trending_key = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=4df29563fef1ac0f15e35abe376b0042&language=en-US`
    );
    const trending_data = await trending_key.json();

    return Response.json(
      {
        message: "Eureka!",
        data: trending_data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "error" }, { status: 500 });
  }
}
