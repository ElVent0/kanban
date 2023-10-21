export const getColor = (id: string): string => {
  if (id === "planned") {
    return "blue";
  } else if (id === "open") {
    return "yellow";
  } else if (id === "in-progress") {
    return "orange";
  } else if (id === "done") {
    return "green";
  } else {
    return "";
  }
};
