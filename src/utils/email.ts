// ?? Don't know how this even works.
export function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
