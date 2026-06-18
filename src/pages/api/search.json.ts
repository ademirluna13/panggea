import { sanityClient } from "sanity:client";

export async function GET() {
  try {
    const searchData = await sanityClient.fetch(`*[ _type in ["post", "patchNote", "tierEntry", "radarEvent", "gear"] && defined(title) && defined(slug.current) ]{
      title,
      "category": select(
        _type == "post" => "NOTAS",
        _type == "patchNote" => "UPDATES",
        _type == "tierEntry" => "GUIAS",
        _type == "radarEvent" => "RADAR",
        _type == "gear" => "HARDWARE",
        "ARCHIVO"
      ),
      "href": "/" + select(
        _type == "post" => "blog",
        _type == "patchNote" => "updates", 
        _type == "tierEntry" => "tier",
        _type == "radarEvent" => "radar", 
        _type == "gear" => "vault",
        "#"
      ) + "/" + slug.current
    }`);

    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300" // Almacena en caché del navegador por 5 minutos
      }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}