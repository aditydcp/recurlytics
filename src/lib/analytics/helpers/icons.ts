export const getPhaseIcon = (phase?: string) => {
  switch (phase) {
    case "menstrual":
      return "🩸"
    case "follicular":
      return "🌸"
    case "ovulation":
      return "💧"
    case "luteal":
      return "🌕"
    case "extended":
      return "🌑"
    default:
      return ""
  }
}