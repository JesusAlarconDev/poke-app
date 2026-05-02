export const generationName = (generation) => {
    switch(generation){
      case "generation-i": 
        return "1st gen";
      case "generation-ii":
        return "2nd gen";
      case "generation-iii":
        return "3rd gen";
      case "generation-iv":
        return "4th gen";
      case "generation-v":
        return "5th gen";
      case "generation-vi":
        return "6th gen";
      case "generation-vii":
        return "7th gen";
      case "generation-viii":
        return "8th gen";
      case "generation-ix":
        return "9th gen";
      case "default":
        return null;
    }
  }