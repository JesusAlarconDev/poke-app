// Función para obtener la descripción en inglés del Pokémon
// Prioriza las versiones más recientes en inglés
export const getEnglishFlavorText = (flavorTextEntries) => {
  if (!flavorTextEntries || flavorTextEntries.length === 0) {
    return 'No description available.';
  }

  // Versiones preferidas en orden de prioridad (más recientes primero)
  const preferredVersions = [
    'scarlet', 'violet', 'brilliant-diamond', 'shining-pearl',
    'sword', 'shield', 'lets-go-pikachu', 'lets-go-eevee',
    'ultra-sun', 'ultra-moon', 'sun', 'moon',
    'omega-ruby', 'alpha-sapphire', 'x', 'y',
    'black-2', 'white-2', 'black', 'white',
    'heartgold', 'soulsilver', 'platinum', 'diamond', 'pearl',
    'emerald', 'firered', 'leafgreen', 'ruby', 'sapphire',
    'crystal', 'gold', 'silver', 'yellow', 'blue', 'red'
  ];

  // Buscar en orden de preferencia
  for (const version of preferredVersions) {
    const entry = flavorTextEntries.find(
      entry => entry.language.name === 'en' && entry.version.name === version
    );
    if (entry) {
      return cleanFlavorText(entry.flavor_text);
    }
  }

  // Si no encuentra versiones preferidas, busca cualquier entrada en inglés
  const englishEntry = flavorTextEntries.find(entry => entry.language.name === 'en');
  if (englishEntry) {
    return cleanFlavorText(englishEntry.flavor_text);
  }

  // Si no hay inglés, devuelve la primera entrada disponible
  return cleanFlavorText(flavorTextEntries[0].flavor_text);
};

// Función para limpiar el texto de caracteres especiales
const cleanFlavorText = (text) => {
  return text
    .replace(/\f/g, ' ') // Reemplaza form feed con espacio
    .replace(/\n/g, ' ') // Reemplaza saltos de línea con espacios
    .replace(/\s+/g, ' ') // Reemplaza múltiples espacios con uno solo
    .trim(); // Elimina espacios al inicio y final
};

// Función para obtener descripción por generación específica
export const getFlavorTextByGeneration = (flavorTextEntries, generation) => {
  if (!flavorTextEntries || flavorTextEntries.length === 0) {
    return 'No description available.';
  }

  // Mapeo de generaciones a versiones principales
  const generationVersions = {
    'generation-i': ['red', 'blue', 'yellow'],
    'generation-ii': ['gold', 'silver', 'crystal'],
    'generation-iii': ['ruby', 'sapphire', 'emerald', 'firered', 'leafgreen'],
    'generation-iv': ['diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver'],
    'generation-v': ['black', 'white', 'black-2', 'white-2'],
    'generation-vi': ['x', 'y', 'omega-ruby', 'alpha-sapphire'],
    'generation-vii': ['sun', 'moon', 'ultra-sun', 'ultra-moon'],
    'generation-viii': ['sword', 'shield', 'brilliant-diamond', 'shining-pearl'],
    'generation-ix': ['scarlet', 'violet']
  };

  const versions = generationVersions[generation] || [];
  
  // Buscar en las versiones de la generación especificada
  for (const version of versions) {
    const entry = flavorTextEntries.find(
      entry => entry.language.name === 'en' && entry.version.name === version
    );
    if (entry) {
      return cleanFlavorText(entry.flavor_text);
    }
  }

  // Fallback a cualquier texto en inglés
  return getEnglishFlavorText(flavorTextEntries);
};

// Función para obtener el género (categoría) del Pokémon en inglés
export const getEnglishGenus = (genera) => {
  if (!genera || genera.length === 0) {
    return 'Unknown Species';
  }

  // Buscar entrada en inglés
  const englishGenus = genera.find(genus => genus.language.name === 'en');
  
  if (englishGenus) {
    return englishGenus.genus;
  }

  // Si no hay inglés, devuelve la primera entrada disponible
  return genera[0].genus;
};
