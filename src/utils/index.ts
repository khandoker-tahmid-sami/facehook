// export const getDateDifferenceFromNow = (fromDate) => {
//   let differenceInSeconds = Math.floor(
//     (Date.now() - new Date(fromDate).getTime()) / 1000
//   );

//   if (differenceInSeconds <= 0) {
//     return "0 seconds";
//   }

//   const units = [
//     { label: "year", seconds: 365 * 24 * 60 * 60 },
//     { label: "month", seconds: 30 * 24 * 60 * 60 },
//     { label: "day", seconds: 24 * 60 * 60 },
//     { label: "hour", seconds: 60 * 60 },
//     { label: "minute", seconds: 60 },
//     { label: "second", seconds: 1 },
//   ];

//   const parts = [];

//   for (const unit of units) {
//     const value = Math.floor(differenceInSeconds / unit.seconds);

//     if (value > 0) {
//       parts.push(`${value} ${unit.label}${value > 1 ? "s" : ""}`);
//       differenceInSeconds -= value * unit.seconds;
//     }
//   }

//   return parts.join(" ");
// };

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
