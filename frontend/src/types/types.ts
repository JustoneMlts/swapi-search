export interface ICharacter {
  name: string
  height: string
  mass: string
  birthYear: string
  gender: string
  films: IFilms []
  eyeColor: string
  hairColor: string
  skinColor: string
  homeworld: string
  species: ISpecies []
  starships: IStarships []
  vehicles: IVehicles []
  url: string
  created: string
  edited: string
}

export interface IFilms {
  title: string
  episodeId: number
  openingCrawl: string
  director: string
  producer: string
  releaseDate: Date
  species: ISpecies []
  straships: IStarships []
  vehicles: IVehicles []
  characters: ICharacter []
  planets: IPlanet []
  url: string
  created: string
  edited: string
}

export interface IPlanet {
  name: string
  diameter: string
  rotationPeriod: string
  orbitalPeriod: string
  gravity: string
  population: string
  climate: string
  terrain: string
  surfaceWater: string
  residents: ICharacter []
  films: IFilms []
  url: string
  created: string
  edited: string
}

export interface ISpecies {
  name: string
  classification: string
  designation: string
  averageHeight: string
  averageLifeSpan: string
  eyeColors: string
  hairColors: string
  skinColors: string
  language: string
  homeworld: string
  people: ICharacter []
  films: IFilms []
  url: string
  created: string
  edited: string
}

export interface IStarships {
  name: string
  model: string
  starshipClass: string
  manufacturer: string
  costInCredits: string
  length: string
  crew: string
  passengers: string
  maxAtmospheringSpeed: string
  hyperdriveRating: string
  MGLT: string
  cargoCapacity: string
  consumables: string
  films: IFilms []
  pilots: ICharacter []
  url: string
  created: string
  edited: string
}

export interface IVehicles {
  name: string
  model: string
  vehicleClass: string
  manufacturer: string
  costInCredits: string
  length: string
  crew: string
  passengers: string
  maxAtmospheringSpeed: string
  cargoCapacity: string
  consumables: string
  films: IFilms []
  pilots: ICharacter []
  url: string
  created: string
  edited: string
}

export type SearchResult = ICharacter | IPlanet | ISpecies | IStarships | IFilms | IVehicles

export type SearchCategory = "all" | "character" | "planet" | "species" | "starships" | "films" | "vehicles"

