export const getType = (result: Record<string, any>): string => {
  if ("height" in result && "mass" in result && "birth_year" in result) return "Character";
  if ("episode_id" in result && "opening_crawl" in result) return "Films";
  if ("diameter" in result && "climate" in result && "terrain" in result) return "Planets";
  if ("classification" in result && "designation" in result) return "Species";
  if ("starship_class" in result && "hyperdrive_rating" in result) return "Starships";
  if ("vehicle_class" in result && "max_atmosphering_speed" in result) return "Vehicles";

  return "Unknown";
};

export const getNameByType = (result: Record<string, any>): string => {
  if (getType(result) === "Films") {
    return result.title
  }
  else {
    return result.name
  }
}