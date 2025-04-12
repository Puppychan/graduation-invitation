// Helper function to format names (capitalize first letter of each word)
export const formatName = (name: string) => {
  if (!name) return "friend";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getNameFromPath = () => {
  const pathSegments = window.location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Check if there is a type prefix (e.g., lec_, toho_, capstone_)
  if (!lastSegment || lastSegment === "") {
    return { type: "generic", name: "friend" };
  }

  // Check for different prefixes
  if (lastSegment.startsWith("lec_")) {
    const name = lastSegment.substring(4);
    // Format lecturer name (mr.john -> Mr. John)
    let prefix = "";
    if (name.toLowerCase().startsWith("mr.")) {
      prefix = "Mr. ";
      const formattedName =
        prefix + name.substring(3).charAt(0).toUpperCase() + name.substring(4);
      return { type: "lecturer", name: formattedName };
    } else if (name.toLowerCase().startsWith("ms.")) {
      prefix = "Ms. ";
      const formattedName =
        prefix + name.substring(3).charAt(0).toUpperCase() + name.substring(4);
      return { type: "lecturer", name: formattedName };
    }
    return { type: "lecturer", name: formatName(name) };
  }

  if (lastSegment.startsWith("toho_")) {
    return { type: "toho", name: formatName(lastSegment.substring(5)) };
  }

  if (lastSegment.startsWith("capstone_")) {
    return { type: "capstone", name: formatName(lastSegment.substring(9)) };
  }

  if (lastSegment.startsWith("best_")) {
    return { type: "best", name: formatName(lastSegment.substring(5)) };
  }

  // If no prefix, it's just a friend's name
  return { type: "friend", name: formatName(lastSegment) };
};

export const generateGraduationMessage = () => {
  const { name, type } = getNameFromPath();
  switch (type) {
    case "lecturer":
      return {
        name: `Dear ${name}`,
        message: `Thank you for your guidance and inspiration throughout my academic journey at RMIT. Your passion for teaching and dedication to students has made a tremendous impact on my education. As I celebrate my graduation, I'm grateful for the knowledge and wisdom you've shared.`,
      };

    case "toho":
      return {
        name: `Dear ${name}`,
        message: `Being part of the TOHO club with you has been one of the highlights of my time at RMIT. Your support, friendship, and the experiences we shared in the club have shaped my university journey in meaningful ways. Thank you for being an amazing part of this chapter of my life as I celebrate this graduation milestone.`,
      };

    case "capstone":
      return {
        name: `Hey ${name}`,
        message: `Working with you on our Capstone project was such an amazing ride! 😊 Your awesome ideas, dedication, and the way we clicked as a team made our project not just successful, but super fun too. As I'm graduating, I just wanted to say how much I appreciate you being such a rockstar teammate. Thanks for making this wild academic journey so much better!`,
      };

    case "best":
      return {
        name: `Dear ${name}`,
        message: `As I prepare to graduate, I want to take a moment to express my heartfelt gratitude for your unwavering support and friendship. Your presence in my life has made this journey at RMIT truly special. Thank you for being there through the ups and downs, and for being an incredible friend.`,
      };
    case "friend":
    default:
      return {
        name: `Hey ${name}`,
        message: `Just wanted to say thanks for being part of my RMIT journey! All those study sessions, laughs, and good times really made university life way better. It's been great having you around, and I'm glad we got to share this experience together. Thanks for being an awesome friend through it all!`,
      };
  }
};
