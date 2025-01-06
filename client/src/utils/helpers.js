import { jwtDecode } from "jwt-decode";

export function formatCurrency(value) {
  return new Intl.NumberFormat("PL-pl", {
    style: "currency",
    currency: "PLN",
  }).format(value);
}

export function formatDate(date) {
  const formattedDate = new Date(date);

  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(formattedDate);
}

export function jwtExpDays(res) {
  const decodedToken = jwtDecode(res.data.token);
  const expiresAt = decodedToken.exp * 1000;
  const expiresInDays = (expiresAt - Date.now()) / (1000 * 60 * 60 * 24);
  return expiresInDays;
}
