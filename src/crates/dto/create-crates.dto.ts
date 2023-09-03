export class CreateCratesDto {
  items: Array<{
    id: string;
    name: string;
    description: string | null;
    image: string;
    type: string;
    contains: Array<{ id: string; name: string; rarity: string; image: string }>;
    contains_rare: Array<{ id: string; name: string; rarity: string; image: string }>;
  }>;
}
